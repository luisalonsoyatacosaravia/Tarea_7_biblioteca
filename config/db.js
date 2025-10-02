//Acceso a datos

//Acceder al archivo .env
require('dotenv').config()

//Administrar la BD (promesa = proceso ene curso...)
const mysql =require('mysql2/promise')

//Pool de conexiones = acceso
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  passsword: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
})

//Aprovechar el recurso de otra parte de la App
module.exports = pool