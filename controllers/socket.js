const Usuario = require("../models/usuario");

const usuarioConectado = async (uid = '') => {
    const usuario = await Usuario.findById(uid);
    usuario.online = true;
    usuario.save();
}
const usuarioDesconectado = async (uid = '') => {
    const usuario = await Usuario.findById(uid);
    usuario.online = false;
    usuario.save();
}


module.exports = {
    usuarioConectado,
    usuarioDesconectado
}