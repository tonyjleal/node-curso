const argv = require('./config/yargs')
const { crearArchivo } = require('./helpers/multiplicar')


console.clear();

// const [ , , arg3 = 'base=5'] = process.argv;
// const [ , base] = arg3.split('=');
// console.log(process.argv);

console.log(argv);


crearArchivo( argv.b, argv.l )
    .then( nombreArchivo => console.log(nombreArchivo, 'creado'))
    .catch(err => console.log(err));