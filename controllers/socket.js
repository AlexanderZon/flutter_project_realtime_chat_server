const Usuario = require("../models/usuario");
const Mensaje = require("../models/mensaje");

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

const grabarMensaje = async (payload) => {

    /**
     * payload = {
     *  de: '',
     *  para: '',
     *  texto: ''
     * }
     */
    try {
        const mensaje = new Mensaje(payload);
        await mensaje.save();

        return true;
    } catch (error) {
        console.log('Error: ', error)
        return false;
    }
}


module.exports = {
  usuarioConectado,
  usuarioDesconectado,
  grabarMensaje,

};