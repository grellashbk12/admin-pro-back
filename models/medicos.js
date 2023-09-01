const { Schema, model } = require('mongoose')


const medicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
}, { collection: 'medicos' });

medicoSchema.method('toJSON', function () {
    const { __v, ...Object } = this.toObject();

    return Object;
})

module.exports = model('Medico', medicoSchema)