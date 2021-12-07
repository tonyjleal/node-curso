const { readInput, pause, inquireMenu } = require('./helpers/inquirer');
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
                const lugar = await readInput('Ciudad: ');
                console.log(lugar);
                 //Buscar lugares   

                 //Seleccionar lugar

                 //Clima

                 // Mostrar resultados
                 console.log('\nInformación de la ciudad\n'.green);
                 console.log('Ciudad: ', );
                 console.log('Lat: ', );
                 console.log('Lng: ', );
                 console.log('Temperatura: ', );
                 console.log('Mínima: ', );
                 console.log('Máxima: ', );
                break;

        }


        if(opt!== 0) await pause();
    } while (opt !== 0)

}

main();