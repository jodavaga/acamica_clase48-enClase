const express = require('express');

const router = express.Router();

// Endpoints alumnos
router.get('/', (req, res) => {
    res.send('Obteniendo PROFESORES');
});

router.post('/', (req, res) => {

});

router.put('/:id', (req, res) => {
    const id = req.query.id;
});

module.exports = router;