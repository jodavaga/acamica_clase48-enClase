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
    try {
        const alumnos = await Alumnos.find({});
        res.json(alumnos);
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

module.exports = router;