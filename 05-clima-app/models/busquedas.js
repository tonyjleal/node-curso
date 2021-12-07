const axios = require('axios');


class Busquedas {

    historial = ['Madrid', 'Roma', 'París'];

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es' 
        }
    }

    constructor () {
        // TODO readBD if exist
    }

    async ciudad ( lugar = '' ) {

        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            });


            const resp = await instance.get();
            console.log(resp.data);
            return []; 

        } catch ( error ){
            return [];
        }
    }

}

module.exports = Busquedas;