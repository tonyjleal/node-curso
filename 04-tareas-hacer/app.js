const { inquireMenu } = require('./helpers/inquirer');

require('colors');

console.clear();

const main = async() => {

    let opt = '';

    do {
       opt = await inquireMenu();
       console.log({opt});
    } while( opt !== '0' );
}


main();