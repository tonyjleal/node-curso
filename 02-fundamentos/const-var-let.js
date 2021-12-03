// var crea variables de manera global
// let y const crean las variables de scope

// Las constantes son más ligeras y el programa correrá más eficientemente.

const nombre = 'Wolverine';


if (true) {
    const nombre = 'Magneto';
}


console.log(nombre);