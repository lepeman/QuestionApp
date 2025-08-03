// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Base de datos
const db = new sqlite3.Database('./database.db');

db.run(`
  CREATE TABLE IF NOT EXISTS preguntas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    pregunta TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

app.use(express.static('public'));
app.use(express.json());

// Ruta para guardar preguntas
app.post('/preguntas', (req, res) => {
  const { nombre, pregunta } = req.body;
  if (!nombre || !pregunta) return res.status(400).send('Faltan datos');

  db.run(`INSERT INTO preguntas (nombre, pregunta) VALUES (?, ?)`, [nombre, pregunta], function(err) {
    if (err) return res.status(500).send('Error al guardar');
    res.status(200).send('Guardado');
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
