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
                .check((argv, options) => {
                    if( isNaN(argv.b) ) {
                        throw 'La base tiene que ser un número';
                    }

                    return true;
                })
                .argv;

module.exports = argv;