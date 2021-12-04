const { number } = require('yargs');

const argv = require('yargs')
                .option('b', {
                    alias: 'base',
                    describe: 'Es la base de la tabla de multiplicar',
                    demandOption: true,
                    type: 'number',
                })
                .option('l', {
                    alias: 'listar',
                    default: false,
                    describe: 'Muestra la tabla en consola',
                    type: 'boolean',
                })
                .option('h', {
                    alias: 'hasta',
                    default: 10,
                    describe: 'Número de iteraciones a multiplicar',
                    type: 'number',
                })
                .check((argv, options) => {
                    if( isNaN(argv.b) ) {
                        throw 'La base tiene que ser un número';
                    }

                    return true;
                })
                .argv;

module.exports = argv;