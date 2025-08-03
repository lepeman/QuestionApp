const express = require('express');
const pool = require('./db');
const app = express();

app.get('/preguntas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM preguntas ORDER BY fecha DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al consultar la base de datos');
    }
});