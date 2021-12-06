const { readInput } = require('./helpers/inquirer')
require('colors');

const main = async() => {

    const texto = await readInput('Inserte texto: ');
    console.log(texto);
}

main();