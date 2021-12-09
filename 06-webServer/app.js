const express = require('express')
const app = express()
const port = 8081; 


app.get('/', (req, res) => {
  res.send('Home');
});

app.get('/hola-mundo', (req, res) => {
  res.send('Hello World');
});

app.get('*', (req, res) => {
  res.send('404 | Page not found');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});