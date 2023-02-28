import { db } from "../database/db.js";
import dayjs from "dayjs";

export async function registerRental(req, res) {
    const rentalInfo = res.locals.rental

    try {
        const pricePerDay = await db.query(`SELECT "pricePerDay" FROM games WHERE "id" = $1`, [rentalInfo.gameId])
        const stockTotal = await db.query(`SELECT "stockTotal" FROM games WHERE "id" = $1`, [rentalInfo.gameId])
        const totalRents = await db.query(`SELECT * FROM rentals WHERE "gameId" = $1`, [rentalInfo.gameId])

        if (stockTotal.rowCount > totalRents.rowCount) {
            if (pricePerDay.rows.length > 0) {
                const rental = {
                    customerId: String(rentalInfo.customerId),
                    gameId: String(rentalInfo.gameId),
                    rentDate: dayjs().format('YYYY-MM-DD'),
                    daysRented: String(rentalInfo.daysRented),
                    returnDate: null,          // data que o cliente devolveu o jogo (null enquanto não devolvido)
                    originalPrice: pricePerDay.rows[0].pricePerDay * rentalInfo.daysRented,    // preço total do aluguel em centavos (dias alugados vezes o preço por dia do jogo)
                    delayFee: null
                }

                await db.query(`INSERT INTO rentals (
                    "customerId",
                    "gameId",
                    "rentDate",
                    "daysRented",
                    "returnDate",          
                    "originalPrice",    
                    "delayFee") 
                    VALUES 
                    ($1, $2, $3, $4, $5, $6, $7);`,
                    [rental.customerId,
                    rental.gameId,
                    rental.rentDate,
                    rental.daysRented,
                    rental.returnDate,
                    rental.originalPrice,
                    rental.delayFee])
                res.status(201).send("Aluguel registrado com sucesso")

            } else {
                res.status(400).send("Este aluguel não tem um jogo equivalente")
            }
        } else {
            res.status(400).send("Este jogo não está disponível no momento")
        }

    } catch (error) {
        console.error(error)
        res.status(500).send("Houve um problema no servidor")
    }
}

export async function returnRental(req, res) {
    const id = req.params.id
    const returnDate = dayjs()

    try {

        const rental = await db.query(`SELECT * FROM rentals WHERE id = $1;`, [id])

        if (rental.rowCount > 0) {
            console.log(rental.rows[0].returnDate)
            if (rental.rows[0].returnDate !== null) {

                res.status(400).send("Aluguel já finalizado")

            } else {
                const game = await db.query(`SELECT * FROM games WHERE id = $1;`, [rental.rows[0].gameId])
                let delayFee = game.rows[0].pricePerDay * ((returnDate.diff(rental.rows[0].rentDate, "day")) - rental.rows[0].daysRented)
                if (delayFee < 0){
                    delayFee = 0
                }

                await db.query(`UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3;`, [returnDate, delayFee, id])
                res.status(200).send("Dados registrados com sucesso")
            }
        }

        else {
            res.status(404).send("Id fornecido não possui aluguel correspondente")
        }

    } catch (error) {
        console.error(error)
        res.status(500).send("Houve um problema no servidor")
    }
}

export async function listRentals(req, res) {
    try {

        const rentals = await db.query(`SELECT * FROM rentals;`)
        const games = await db.query(`SELECT * FROM games;`)
        const customers = await db.query(`SELECT * FROM customers;`)

        const rentalsList = []
        for (const elem of rentals.rows) {
            let game = await db.query(`SELECT * FROM games WHERE id = $1;`, [Number(elem.gameId)])
            let customer = await db.query(`SELECT * FROM customers WHERE id = $1;`, [Number(elem.customerId)])
            elem.customer = {
                id: customer.rows[0].id,
                name: customer.rows[0].name
            }
            elem.game = {
                id: game.rows[0].id,
                name: game.rows[0].name
            }
            rentalsList.push(elem)
        }
        
        for(const i of rentalsList){
            console.log(i.game.pricePerDay)
        }
        
        //console.log(rentalsList[0])
        
        res.status(200).send(rentalsList)

    }
    catch (error) {

        console.error(error)
        res.status(500).send("Houve um problema no servidor")

    }
}

export async function deleteRental(req, res) {
    const id = req.params.id

    try {
        const rental = await db.query(`SELECT * FROM rentals WHERE id = $1;`, [Number(id)])

        if (rental.rowCount === 1) {

            if (rental.rows[0].returnDate === null) {
                res.status(400).send("Aluguel não foi finalizado")
            } else {
                await db.query(`DELETE FROM rentals WHERE id = $1;`, [Number(id)])
                res.status(200).send("Apagado com sucesso")
            }

        } else {
            res.status(404).send("Aluguel não existe")
        }

    }
    catch (error) {

        console.error(error)
        res.status(500).send("Houve um problema no servidor")

    }
}