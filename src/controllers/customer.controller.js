import { db } from "../database/db.js";

export async function registerCustomer(req, res) {
    const customer = res.locals.customer

    try {

        const checkCpf = await db.query(`SELECT cpf FROM customers WHERE cpf = $1;`, [customer.cpf])

        if (checkCpf.rows.length !== 0) {
            res.status(409).send("Já existe um usuário registrado com este cpf")
        } else {
            await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`,
                [customer.name, customer.phone, customer.cpf, customer.birthday])
            res.status(201).send("Usuário registrado com sucesso")
        }

    } catch (error) {
        console.error(error)
        res.status(500).send("Houve um problema no servidor")
    }
}

export async function listCustomers(req, res) {
    try {

        const customers = await db.query(`SELECT * FROM customers;`)
        res.status(200).send(customers.rows)

    }
    catch (error) {

        console.error(error)
        res.status(500).send("Houve um problema no servidor")

    }
}

export async function getCustomer(req, res) {
    const id = req.params.id

    try {

        const customer = await db.query(`SELECT * FROM customers WHERE id = $1;`, [id])

        if (customer.rows.length === 0) {
            res.status(404).send("Usuário não existe")
        } else {
            res.status(200).send(customer.rows[0])
        }

    } catch (error) {
        console.error(error)
        res.status(500).send("Houve um problema no servidor")
    }

}

export async function updateCustomer(req, res) {
    const customerNewData = res.locals.customer
    const id = req.params.id

    try {

        const checkCpf = await db.query(`SELECT * FROM customers WHERE cpf = $1;`, [customerNewData.cpf])
        const checkId = await db.query(`SELECT * FROM customers WHERE id = $1;`, [id])

        if (checkCpf.rows.length > 0) {
            let flag = 0
            for (const elem of checkCpf.rows) {
                console.log(elem)
                if (elem.id !== Number(id)) {
                    res.status(409).send("Já outro usuário registrado com este cpf")
                    flag++
                }
            }
            if (flag === 0) {
                await db.query(`UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5;`, [customerNewData.name, customerNewData.phone, customerNewData.cpf, customerNewData.birthday, id])
                res.status(200).send("Usuário atualizado com sucesso")
            }

        } else if (checkId.rows.length < 1) {
            res.status(409).send("Não existe um usuário registrado com este id")
        } else {
            await db.query(`UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5;`, [customerNewData.name, customerNewData.phone, customerNewData.cpf, customerNewData.birthday, id])
            res.status(200).send("Usuário atualizado com sucesso")
        }


    } catch (error) {
        console.error(error)
        res.status(500).send("Houve um problema no servidor")
    }
}
