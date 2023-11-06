const mysql = require('mysql')
const dotenv = require('dotenv');

dotenv.config({path: `${__dirname}/../.env`})

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
})

async function getConnection() {
    return new Promise((resolve, reject) => pool.getConnection((err, connection) => {
        if(err) {
            console.error(err)
            reject(err)
        }
    
        console.log('connected');
        resolve(connection);
    }));
    
}


async function query(queryString, values = []) {
    const connection = await getConnection();
    return new Promise((resolve, reject) => {
        connection.query(queryString, values, (error, results) => {
            connection.release();
            if(error) {
                console.error(`Query error`, error);
                throw error;
            }

            resolve(results);
        })
    })
}

async function insert(queryString, values) {
    const result = await query(queryString, values);
    return result.insertId;
}

async function selectRow(queryString, values) {
    const result = await query(queryString, values);
    return result[0];
}

module.exports = {
    query,
    insert,
    selectRow
}