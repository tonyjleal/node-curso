const Tarea = require("./tarea");

/*
* _listado:
* {'uuid-123123-12312312-2: {id:12, descripcion:asd, completadoEn:9922}}
*/


class Tareas {

    _listado = {};

    constructor() {
        this._listado = {};
    }

    get listadoArray() {
        
        const listado = [];

        Object.keys(this._listado).forEach(key => {
            listado.push(this._listado[key]);
        });

        return listado;
    }

    loadTareasFromArray( tareas = [] ) {
       tareas.forEach( (tarea) => {
           this._listado[tarea.id] = tarea;
       })
    }

    crearTarea( descripcion = '' ) {

        const tarea = new Tarea(descripcion);
        this._listado[tarea.id] = tarea;
    
    }

    listadoCompleto() {

        console.log();
        this.listadoArray.forEach((tarea, i) => {
            let idx = `${i+1}.`.green;
            const {descripcion, completadoEn} = tarea; 
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red; 

            console.log(`\t${idx}  ${descripcion} :: ${estado}`);
        });
    }
}


module.exports = Tareas;
