const fs = require('fs');
const axios = require('axios');


class Busquedas {

    historial = [];
    dbPath = './db/database.json';

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es' 
        }
    }

    get paramsOpenWeather() {
        return {
            'units': 'metric',
            'lang': 'es', 
            'appid': process.env.OPENWEATHER_KEY,
        }
    }

    constructor () {
        this.leerDB();
    }

    get historialCapitalizado() {
        return this.historial?.map((item) => {
           let palabras = item.split(' ');
           palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1))
        
           return palabras.join(' ');
        });
    }

    async ciudad ( lugar = '' ) {

        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            });


            const resp = await instance.get();
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0], 
                lat: lugar.center[1]
            }));
             

        } catch ( error ){
            return [];
        }
    }

    async clima ( lat, lon ) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsOpenWeather, lat, lon }
            });

            const resp = await instance.get();
            const {weather, main} = resp.data;
            return ({
                description: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            });
        } catch ( error ) {
            console.log( error );
        }
    }

    agregarHistorial( lugar = '' ) {
        
        if(this.historial.includes(lugar.toLocaleLowerCase())) {
            return;
        }

        this.historial.unshift( lugar.toLocaleLowerCase() );
        
        this.guardarDB();
    }

    guardarDB(){
        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }

    leerDB() {
       if(!fs.existsSync( this.dbPath )) return;

       const info = fs.readFileSync( this.dbPath, { encoding: 'utf-8' } ); 
       const { historial } = JSON.parse( info );
       this.historial = historial;
    }

    borrarDB(){
        if(!fs.existsSync( this.dbPath )) return;
        fs.unlinkSync(this.dbPath);
        this.historial = [];
        console.log('Eliminado correctamente');
    }

}

module.exports = Busquedas;