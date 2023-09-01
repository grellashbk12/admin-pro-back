const fs = require('fs')

const Usuario = require('../models/usuario.model');
const Medico = require('../models/medicos');
const Hospital = require('../models/hospitales');


const borrarImagen = ( path ) =>{
    if (fs.existsSync(path)) {
        //borrar la imagen anterior
        fs.unlinkSync(path)
    }
}


const actualizarImagen = async(tipo, id, nombreArchivo) =>{

    let pathViejo = '';
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id)
            if (!medico) {
                console.log('Medico no es existe')
                return false;
            }

            pathViejo = `./uploads/medicos/${ medico.img }`
            borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;
            break;
        case 'hospitales':
            const hospital = await Hospital.findById(id)
            if (!hospital) {
                console.log('Hospital no es existe')
                return false;
            }

            pathViejo = `./uploads/hospital/${hospital.img}`
            borrarImagen(pathViejo);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

            break;
         case 'usuarios':
            const usuario = await Usuario.findById(id)
            if (!usuario) {
                console.log('Medico no es existe')
                return false;
            }

            pathViejo = `./uploads/uduarios/${usuario.img}`
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

            break;
    }
    
}


module.exports = {
    actualizarImagen
}