const express = require('express')
const app = express()
require('dotenv').config();

const PORT = process.env.PORT;


app.get('/', (req, res) => {
  res.send('Hello World')
}).listen(PORT, () => {
    console.log(`Servidor corriendo el puerto`, PORT);
})