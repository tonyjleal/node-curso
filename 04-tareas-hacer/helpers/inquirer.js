const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${ '1.'.green } Crear tarea`
            },
            {
                value: '2',
                name: `${ '2.'.green } Listar tareas`
            },
            {
                value: '3',
                name: `${ '3.'.green } Listar tareas compleatadas`
            },
            {
                value: '4',
                name: `${ '4.'.green } Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${ '5.'.green } Completar tarea(s)`
            },
            {
                value: '6',
                name: `${ '6.'.green } Borrar tarea`
            },
            {
                value: '0',
                name: `${ '0.'.green } Salir`
            }
        ]
    }
];

const  questionPause = [
    {
        type: 'input',
        name: 'pause',
        message: `Presione ${ 'ENTER'.green } para continuar`,
    }
];

const inquireMenu = async() => {
    console.clear();
    console.log('============================'.green);
    console.log('    Seleccione una opción'.white)
    console.log('============================\n'.green);

    const {option} = await inquirer.prompt(questions);

    return option;

}

const pause = async() => {
    console.log('\n');
    await inquirer.prompt(questionPause);
}

const readInput = async( message ) => {
    const question = [
        { 
            type: 'input',
            name: 'description',
            message,
            validate( value ){
                if( value.length === 0 ) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { description } = await inquirer.prompt(question);
    return description;
}

module.exports = {
    inquireMenu,
    pause,
    readInput
}