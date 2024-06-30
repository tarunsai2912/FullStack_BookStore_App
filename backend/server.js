const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const bookRoutes = require('./routes/book')

const app = express()
const port  = 5000

// Middlewares
app.use(bodyParser.json())
app.use(cors())

// Connect to Server - Mongodb
mongoose.connect('mongodb+srv://tarunsairayapureddi:EnSLFjtUCS0xSVuC@fullstack-app.jcurnpv.mongodb.net/?retryWrites=true&w=majority&appName=FullStack-App')

mongoose.connection.on('connected', () => {
    console.log("Mongoose Connection is Successful - BookList App");
})

app.use('/books', bookRoutes)

app.listen(port, () => {
    console.log(`Your server is running on ${port} port number`);
})
