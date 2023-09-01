const { response } = require('express');
const  bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt')

const Usuario = require('../models/usuario.model');

const getUsuarios = async(req, res) => {

        const desde = Number(req.query.desde) || 0 ;

    // const usuario = await Usuario.find({}, 'nombre email role google').skip( desde ).limit( 5 );

    // const total = await Usuario.count();
    
   const [usuario, total]= await Promise.all([
        Usuario.find({}, 'nombre email role google img').skip(desde).limit(5),
        Usuario.countDocuments(),
    ])
    res.json({
        ok: true,
        usuario,
        total
    })
}

const addUsuarios = async(req, res = response) => {

    const { email, password} = req.body;

 
    try {
        const existeEmail = await Usuario.findOne( {email });

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }
        const usuario = new Usuario(req.body);


        //Encriptar contraseño 
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        //Guardar el usuario
        await usuario.save();

        //generar el TOKEN
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

const updateUsuario = async(req, res = response)=>{

    const uid = req.params.id;

    try {

        const usuarioDbB = await Usuario.findById( uid );

        if (!usuarioDbB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })            
        }

        
         //Actualizaciones
        const {password, google, email, ...campos} = req.body;

        if (usuarioDbB.email !== email) {
          
            const existeEmail = await Usuario.findOne({ email });
            if( existeEmail ){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese Email'
                })
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new : true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
        
    }
}

const deleteUsuario = async(req, res = response)=>{
    const uid = req.params.id;

    try {

         const usuarioDbB = await Usuario.findById( uid );

        if (!usuarioDbB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })            
        }

        await Usuario.findByIdAndDelete( uid );

        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado'
        })
       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }

}
module.exports =  {
    getUsuarios, addUsuarios,updateUsuario, deleteUsuario
}