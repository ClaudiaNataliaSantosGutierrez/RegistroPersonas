const mongoose = require('mongoose');

let RegistroSchema = new mongoose.Schema({
    idRegistro: Number,
    tipoDocumentoRegistro: String,
    numeroDocumentoRegistro: Number,
    nombresRegistro: String,
    apellidosRegistro: String,
    direccionRegistro: String,
    emailRegistro: String,
    telefonoFijoRegistro: Number,
    telefonoCelularRegistro: Number,
    enlaceSitioWebRegistro: String,
    descripcionPerfilRegistro: String
});

module.exports = mongoose.model('registro', RegistroSchema, 'Registros');