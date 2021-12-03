const nombre = 'Deadpool';
const real = 'Wade Winston';

const normal = nombre + ' ' + real + ' ' +  39;
const template = `${ nombre } ${ real } ${ 10 + 29 }`;

console.log(normal);
console.log(template);
console.log(normal === template);


const html = `
    <h1>Hola</h1>
    <p>Mundo</p>
`;
console.log(html);