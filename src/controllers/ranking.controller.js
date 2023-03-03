import { db } from "../database/db.js";

export async function rankUsers(req, res) {

    try {

        const users = await db.query(`SELECT * FROM users ;`)

        const usersList = users.rows
        usersList.sort((a, b) => a.visitCount - b.visitCount)
        


        let temp = 0
        const list10 = []
        let linksCounter = 0
        let sumVisits = 0

        while (temp < 10 && temp < usersList.length) {
            linksCounter = await linksCount(usersList[temp].id);
            sumVisits = await countVisits(usersList[temp].id)
            list10.push(
                {
                    "id": usersList[temp].id,
                    "name": usersList[temp].name,
                    "linksCount": linksCounter,
                    "visitCount": sumVisits           
                })
            temp++
        }

        return res.status(200).send(list10);

    } catch (error) {
        return res.send(error).status(500)
    }
}


async function linksCount(id) {
    const links = await db.query(`SELECT * FROM urls WHERE "userId" = $1 ;`, [id])
    return links.rowCount
}

async function countVisits(id) {
    let sum = 0
    const sql = await db.query(`SELECT "visitCount" FROM urls WHERE "userId" = $1 ;`, [id])
    
    const lst = sql.rows
    for (let i = 0; i< lst.length; i++){
        sum = sum + lst[i].visitCount
    }
    console.log(sum)
    return sum
}