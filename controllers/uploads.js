const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

const { actualizarImagen } = require('../helpers/ActualizarImagen')



const fileUpload = (req, res = response) =>{

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un médico, usuario u hospital (tipo)'
        })
    }
    //validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        })
    }
    //procesar una imagen
    const files = req.files.imagen;
    const nombreCortado = files.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];
    //validar extension
    const extensionesValidas = [ 'png', 'jpg', 'jpeg','gift'];
    if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida'
        });
    }
    //generar el nombre del archivo
    const nombreArchivo = `${ uuidv4()}.${extensionArchivo}`;

    //path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    //mover la imagen
    files.mv( path, (err) =>{
        if (err) {
             console,log(err)
        return res.status(500).json({
            ok: false,
            msg: 'Error al mover la imagen'
        });
        }

        //actualizar base de datos
        actualizarImagen(tipo, id, nombreArchivo);  
        res.json({
            ok: true,
            msg: 'archivo subido',
            nombreArchivo
            
        })   
     })

}

const retornaImagen = (req, res=response) =>{
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${ tipo }/${ foto }`);

    //imagen por defecto
    if (fs.existsSync( pathImg) ) {
        res.sendFile(pathImg)
    }else{
        const pathImg = path.join(__dirname,`../uploads/no-img.jpg`);
        res.sendFile(pathImg)
    }
} 

module.exports = {
    fileUpload,
    retornaImagen
}