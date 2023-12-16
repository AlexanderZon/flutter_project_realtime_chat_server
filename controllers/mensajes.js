const { response } = require('express');
const Mensaje = require('../models/mensaje')

const obtenerChat = async (req, res = response) => {
  
  const miID = req.uid;
  const mensajeDe = req.params.de;

    const last30 = await Mensaje.find({
      $or: [{ de: miID, para: mensajeDe }, { de: mensajeDe, para: miID }]
    })
    .sort({ createdAt: 'desc'})
    .limit(25)
        
    res.json({
      ok: true,
      mensajes: last30,
    });
}

module.exports = {
  obtenerChat,
};