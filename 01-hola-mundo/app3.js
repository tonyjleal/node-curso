console.log('Inicio de programa'); // 1

setTimeout(() => {
    console.log('Primer Timeout'); // 5
}, 3000);

setTimeout(() => {
    console.log('Segundo Timeout'); // 3
}, 0);


setTimeout(() => {
    console.log('Tercer Timeout'); // 4
}, 0);


console.log('Fin de programa'); // 2

// Estas son ejecuciones síncronas

// Ciclo de vida de un proceso:
// 1. Pila de procesos (Call Stack) -> Primera ejecución lanza main()
// 2. Node Apis
// 3. Cola de callbacks

