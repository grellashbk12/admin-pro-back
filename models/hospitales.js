const { Schema, model } = require('mongoose')


const hospitalSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
     usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuarios'
    }
},{ collection: 'hospitales' });

hospitalSchema.method('toJSON', function () {
    const { __v, ...Object } = this.toObject();

    return Object;
})

module.exports = model('Hospital', hospitalSchema)