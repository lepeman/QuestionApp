require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Configurar conexión con PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes('render') ? { rejectUnauthorized: false } : false
});

// Crear tabla si no existe
const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS preguntas (
        id SERIAL PRIMARY KEY,
        pregunta TEXT NOT NULL,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Tabla 'preguntas' verificada.");
  } catch (err) {
    console.error('Error al crear/verificar la tabla:', err);
  }
};

createTable();

app.use(express.static('public'));
app.use(express.json());

// Ruta para recibir preguntas
app.post('/preguntas', async (req, res) => {
  const { pregunta } = req.body;

  if (!pregunta || pregunta.trim() === '') {
    return res.status(400).send('La pregunta no puede estar vacía.');
  }

  try {
    await pool.query(`INSERT INTO preguntas (pregunta) VALUES ($1)`, [pregunta.trim()]);
    res.status(200).send('Pregunta guardada');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al guardar en la base de datos');
  }
});

// Ruta para revisar preguntas
app.get('/api/preguntas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM preguntas ORDER BY fecha DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al consultar la base de datos');
    }
});

app.get('/preguntas', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'preguntas.html'));
});

app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});
