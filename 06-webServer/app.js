const express = require('express');
const app = express();
const port = 8081; 

// Renderizar vistas sencillas
app.set('view engine', 'hbs');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home', {
    nombre: 'Antonio Leal',
    titulo: 'Curso de Node'
  });
});

app.get('/generic', (req, res) => {
  res.sendFile(__dirname + '/public/generic.html' );
});

app.get('/elements', (req, res) => {
  res.sendFile(__dirname + '/public/generic.html' );
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/404.html' );
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});