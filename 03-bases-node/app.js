const argv = require('./config/yargs')
const { crearArchivo } = require('./helpers/multiplicar')

require('colors')


console.clear();

// const [ , , arg3 = 'base=5'] = process.argv;
// const [ , base] = arg3.split('=');
// console.log(process.argv);

// console.log(argv);


crearArchivo( argv.b, argv.l, argv.h )
    .then( nombreArchivo => console.log(nombreArchivo.rainbow, 'creado'))
    .catch(err => console.log(err));