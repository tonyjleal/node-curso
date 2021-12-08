require('dotenv').config();
const { readInput, pause, inquireMenu, listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');
require('colors');

const main = async() => {

    let opt;
    const busquedas = new Busquedas();
    
    do {
        opt = await inquireMenu();

        switch (opt) {
            case 1:
                // Mostrar mensaje
                const termino = await readInput('Ciudad: ');
                //Buscar lugares   
                const lugares = await busquedas.ciudad(termino);
                //Seleccionar lugar
                const id = await listarLugares(lugares);
                 //Clima
                const lugarSeleccionado = lugares.find( l => l.id === id);
                const clima = await busquedas.clima(lugarSeleccionado.lat, lugarSeleccionado.lng);
                 // Mostrar resultados
                 console.clear();
                 console.log('\nInformación de la ciudad\n'.green);
                 console.log('Ciudad: ', lugarSeleccionado.nombre);
                 console.log('Lat: ', lugarSeleccionado.lat);
                 console.log('Lng: ', lugarSeleccionado.lng);
                 console.log('Descripción: ', clima.description.green);
                 console.log('Temperatura: ', clima.temp);
                 console.log('Mínima: ', clima.min);
                 console.log('Máxima: ', clima.max);
                break;

        }


        if(opt!== 0) await pause();
    } while (opt !== 0)

}

main();