const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: `${ '1.'.green } Buscar ciudad`
            },
            {
                value: 2,
                name: `${ '2.'.green } Historial`
            },
            {
                value: 3,
                name: `${ '3.'.green } Borrar Historial`
            },
            {
                value: 0,
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

const listarLugares = async( lugares = []) => {
    
    const choices = lugares.map( (lugar, i) => {
        
        const idx = `${ i+1 }.`.green;
        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`,
        }
    });

    choices.unshift({
        value: '0',
        name: `0. `.green + 'Cancelar'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar: ',
            choices
        }
    ]
    
    const {id} = await inquirer.prompt(questions);
    
    return id;
}

const confirmar = async( message ) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const {ok} = await inquirer.prompt(question);
    return ok;
}

module.exports = {
    inquireMenu,
    pause,
    readInput,
    listarLugares,
    confirmar, 
}