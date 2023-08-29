const mongoose = require('mongoose');


const dbConnection = async () =>{
    try {
        await mongoose.connect('mongodb+srv://mean_user:mniKYPZu8NUnD46K@cluster.vsafa4l.mongodb.net/dbhospital', {
     
    });
    console.log('DB online')

    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de Iniciar la base de datos')
    }
}

module.exports = {
    dbConnection
}