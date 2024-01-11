


const express = require('express')
const parser = require('body-parser')
const connect = require("./database/db")
const cors = require('cors');
const router = require('./routes/routes.js');
const factRouter = require('./routes/factRoute.js');


const port = 999
const app = express()
app.use(express.json())
app.use(cors());
connect()
app.use(router)
app.use(factRouter)

app.listen(port, () => {
    console.log(`your backend server is running on ${port}`)
})



