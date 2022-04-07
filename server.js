const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")
const PORT = process.env.PORT || 4040
const app = express()
app.use(bodyParser.json())
require("dotenv").config()

//Listen to a given port api
app.listen(PORT, () => {
    console.log(`#Backend running on port ${PORT}`)
})
app.use(cors())
//Mysql connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cblink'
})

connection.connect((err) => {
    if (err) console.log(err);
    else console.log("Connected successfully");
})

//Get data from db
app.get('/api/data', async (req, res) => {
    connection.query('SELECT * FROM monthly_sales', (err, rows) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ message: "Bad request" })
        }
        else {
            console.log("Data fetched succesfully");
            return res.status(200).json({ message: rows })
        }
    })
})
//Add data in table