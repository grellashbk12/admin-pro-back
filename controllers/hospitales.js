const { response } = require("express")

const  Hospital  = require("../models/hospitales");



const getHospital = async(req, res =  response) => {

    const hospitales = await Hospital.find().populate('usuario', 'nombre')

    res.json({
        ok: true,
        hospitales
    });

}

const addHospital = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }
}

const updateHospital = (req, res = response) => {


    res.json({
        ok: true,
        msg: 'updateHospistales'
    })

}

const deleteHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'deleteHospistales'
    })

}

module.exports = {
    getHospital, addHospital, updateHospital, deleteHospital
}