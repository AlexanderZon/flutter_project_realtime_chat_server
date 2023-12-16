const { io } = require('../index');
const { comprobarJWT } = require("../helpers/jwt");
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', client => {
  const token = client.handshake.headers.token;
  const [valido, uid] = comprobarJWT(token);

  if (!valido) {
    return client.disconnect();
  }
  console.log("Cliente conectado");
  usuarioConectado(uid);

  // Ingresar al usuario a una sala en particular
  // Sala global, client.id, mongo uuid
  client.join(uid);
//   client.to(uid).emit(""); 

  client.on("mensaje-personal", async (payload) => {
    // TODO: grabar mensaje
    await grabarMensaje(payload);
    io.to(payload.para).emit("mensaje-personal", payload);
  });

  client.on("disconnect", () => {
    usuarioDesconectado(uid);
    console.log("Cliente desconectado");
  });
});
