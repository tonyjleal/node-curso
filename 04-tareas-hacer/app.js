const { inquireMenu, pause, readInput, listDelete } = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveFile');
const Tareas = require('./models/tareas');

require('colors');


const main = async() => {

    let opt = '';
    const tareas = new Tareas()

    const tareasDB = readDB();
    
    if ( tareasDB ) {
        tareas.loadTareasFromArray(tareasDB);
    }


    do {

        opt = await inquireMenu();

        switch ( opt ) {
            case '1':
                const descripcion = await readInput('Descripción: ');
                tareas.crearTarea(descripcion);
            break;
            case '2':
                tareas.listadoCompleto();
            break;
            case '3':
                tareas.listarPendientesCompletadas();
            break;
            case '4':
                tareas.listarPendientesCompletadas(false);
            break;
            case '6':
                const id = await listDelete(tareas.listadoArray);
                console.log({id});
                //tareas.listDelete()
            break;
        }

        saveDB(tareas.listadoArray);

        await pause();

    } while( opt !== '0' );
}


main();