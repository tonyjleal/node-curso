const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: ['1. Crear tarea', 'opt2', 'opt3']
    }
];

const inquireMenu = async() => {
    console.clear();
    console.log('============================'.green);
    console.log('    Seleccione una opción'.green)
    console.log('============================\n'.green);

    const option = await inquirer.prompt(questions);

    return option;

}

module.exports = {
    inquireMenu
}