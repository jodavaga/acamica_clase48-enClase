const express = require('express');
const mongoose = require('mongoose');
const app = express();

const alumnRouter = require('./src/rutas/alumnosRouter');
const profeRouter = require('./src/rutas/profesoresRouter');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Conectado satisfactoriamente!');
});

// Rutas para alumns
app.use('/alumns', alumnRouter);

// Endpoints para PROFES
app.use('/profesores', profeRouter);


mongoose.connect('mongodb://localhost:27017/alumns', {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((e) => {
        console.log("No se pudo conectar a la DB")
    })


app.listen('4000', () => console.log('Listening...'));