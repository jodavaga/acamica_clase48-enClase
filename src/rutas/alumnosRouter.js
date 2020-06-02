const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Alumnos = mongoose.model('Alumnos', {
    nombre: {
        type: String,
        required: true,
    },
    apellido: String,
    edad: Number
});

// Endpoints alumnos
router.get('/', async (req, res) => {
    const name = req.query.name;
    try {
        // get alumn by Name
        if (name) {
            const alumno = await Alumnos.find({nombre: name});
            return res.json(alumno);
        }
        // get all collection
        const alumnos = await Alumnos.find({});
        res.json(alumnos);
    } catch (e) {
        res.status(500).send('Hubo un error')
    }
});

// Endpoints by RegExp
router.get('/byreg', async (req, res) => {
    const last = req.query.lastname;
    try {
        // get alumn by Reg Exp
        const alumno = await Alumnos.find({apellido: new RegExp(last, 'i')});
        return res.json(alumno);
    } catch (e) {
        res.status(500).send('Hubo un error')
    }
});


router.post('/', async (req, res) => {
    const usuario = req.body;
    try {
        const newUser = await Alumnos(usuario);
        newUser.save();

        res.json(newUser);
    }catch (e) {
        res.status(409).send(`Hubo un error`, e);
    }

});

// Update
router.put('/', async (req, res) => {
    const name = req.query.name;

    const {nombre, apellido, edad} = req.body;

    try {
        const alumn = await Alumnos.findOne({nombre: name});

        if (!alumn) return res.status(404).send('No encontrado');

        alumn.nombre = nombre;
        alumn.apellido = apellido;
        alumn.edad = edad;

        alumn.save();

        res.json({status: 'Updated', alumn});

    }catch (e) {
        res.send('Hubo un error')
    }
});

// delete
router.delete('/', async (req, res) => {
    const name = req.query.name;

    try {
        const alumn = await Alumnos.deleteOne({nombre: name});

        res.json({status: 'deleted', alumn});

    }catch (e) {
        res.send('Hubo un error')
    }
})

module.exports = router;