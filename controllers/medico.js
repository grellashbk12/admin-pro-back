const { response } = require("express");

const Medico = require("../models/medicos");



const getMedico = async(req, res = response) => {
     
    const medicos = await Medico.find().populate('hospital' , 'nombre img').populate('usuario', 'nombre img');
    res.json({
        ok: true,
        medicos
    })

}

const addMedico = async(req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    })
    try {
        const medicoDB = await medico.save();

        res.json({
        ok: true,
        medico: medicoDB
    })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
   

}

const updateMedico = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'updateMedico'
    })

}

const deleteMedico = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'deleteMedico'
    })

}

module.exports = {
    getMedico, addMedico, updateMedico, deleteMedico
}