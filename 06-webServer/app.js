const express = require('express');
const hbs = require('hbs');
require('dotenv').config();

const app = express();
const port = process.env.PORT; 

// Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname.concat('/views/partials'));

// Servir contenido estático
app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.render('home', {
//     nombre: 'Antonio Leal',
//     titulo: 'Curso de Node'
//   });
// });

// app.get('/generic', (req, res) => {
//   res.render('generic', {
//     nombre: 'Antonio Leal',
//     titulo: 'Curso de Node'
//   });
// });

// app.get('/elements', (req, res) => {
//   res.render('elements', {
//     nombre: 'Antonio Leal',
//     titulo: 'Curso de Node'
//   });
// });

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html' );
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});