const http = require('http');

http.createServer( ( req, res ) => { 

    // res.writeHead( 200, { 'Content-Type': 'application/json' } );
    res.setHeader('Content-Disposition', 'attachment; filename=lista.csv');
    res.writeHead( 200, { 'Content-Type': 'application/csv' } );

    const persona = {
        id: 1,
        name: 'Antonio',
    }

    // res.write( JSON.stringify(persona) );
    res.write( 'id, name\n' );
    res.write( '1, Antonio\n' );
    res.end();
    
})
.listen( 8081 );

console.log('Escuchando el puerto', 8081);