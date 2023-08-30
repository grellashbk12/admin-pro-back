require('dotenv').config();

const express = require('express')
const cors = require('cors');
const { dbConnection } = require ('./database/config')

//crear el servidor de express
const app = express();
//password: mniKYPZu8NUnD46K
//user: mean_user

//configurar cors
app.use(cors());

//Lectura y parseo corse
app.use(express.json())

//base de datos
dbConnection();

//Rutas
app.use('/api/usuarios', require('./routes/usuarios.route'));
app.use('/api/login', require('./routes/auth'));

app.listen( process.env.PORT, ()=>{
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})