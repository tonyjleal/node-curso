const fs = require('fs');

const crearArchivo = async( base = 5, listar = false ) => {
    try {



        let data = '';

        for (let i = 1; i <= 10 ; i++) {
            data += `${ base } x ${ i } = ${ base * i }\n`;
        }
        
        if ( listar ) {
            console.log('==================');
            console.log(`   Tabla del`, base );
            console.log('==================');
            console.log(data); 
        }

        fs.writeFileSync( `tabla-${base}.txt`, data);

        return `tabla-${base}.txt`;
    } catch ( err ) {
        throw err;
    }
}

module.exports = {
    crearArchivo
}


