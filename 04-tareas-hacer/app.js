const { inquireMenu, pause, readInput } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

require('colors');


const main = async() => {

    let opt = '';
    const tareas = new Tareas()

    do {

        opt = await inquireMenu();

        switch (opt) {
            case '1':
                const descripcion = await readInput('Descripción: ');
                console.log(descripcion);
                tareas.crearTarea(descripcion);
            break;
            case '2':
                  console.log(tareas.listadoArray);
            break;
        }


        await pause();

    } while( opt !== '0' );
}


main();