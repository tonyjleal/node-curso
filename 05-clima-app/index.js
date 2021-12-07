const { readInput, pause, inquireMenu } = require('./helpers/inquirer')
require('colors');

const main = async() => {

    let opt;

    
    do {
        opt = await inquireMenu();
        console.log({opt});

        if(opt!== 0) await pause();
    } while (opt !== 0)

}

main();