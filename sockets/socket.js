const { io } = require('../index');
const { comprobarJWT } = require("../helpers/jwt");
const { usuarioConectado, usuarioDesconectado } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', client => {

    const token = client.handshake.headers.token;
    const [valido, uid] = comprobarJWT(token);
    
    if (!valido) {
      return client.disconnect();
    }
    console.log("Cliente conectado");
    usuarioConectado(uid);

    client.on('disconnect', () => {
        usuarioDesconectado(uid);
        console.log('Cliente desconectado');
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    });


});
