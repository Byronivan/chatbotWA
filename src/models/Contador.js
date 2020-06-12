const { Schema, model } = require('mongoose');

const contadorSchema = new Schema({
    caso: String,
    fecha: Date
})


module.exports = model('Contador', contadorSchema);