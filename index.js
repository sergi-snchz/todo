const cors = require('cors');
const express = require('express');
const path = require('path');

const db = require('./db');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  // Serve static content
  app.use(express.static(path.join(__dirname, 'client/build')));
}

const api = '/api/v1/todos/';

// Get all todos
app.get(api, async (req, res) => {
  try {
    const results = await db.query('SELECT * from todo ORDER BY id');
    res.status(200).json({
      status: 'success',
      todos: results.rows
    });
  } catch (err) {
    console.error(err.message);
  }
});

// Get selected todo
app.get(`${api}:id/`, async (req, res) => {
  try {
    const results = await db.query('SELECT * from todo WHERE id = $1', [req.params.id]);
    res.status(200).json({
      status: 'success',
      todo: results.rows
    });
  } catch (err) {
    console.error(err.message);
  }
});

// Post a todo
app.post(api, async (req, res) => {
  try {
    const results = await db.query('INSERT INTO todo (description) VALUES ($1) RETURNING *', [req.body.description]);
    res.status(201).json({
      status: 'success',
      todo: results.rows
    });
  } catch (err) {
    console.error(err.message);
  }
});

// Edit a todo
app.put(`${api}:id/`, async (req, res) => {
  try {
    const results = await db.query('UPDATE todo SET description = $1 WHERE id = $2 RETURNING *', [req.body.description, req.params.id]);
    res.status(200).json({
      status: 'success',
      todo: results.rows
    });
  } catch (err) {
    console.error(err.message);
  }
});

// Delete a todo
app.delete(`${api}:id/`, async (req, res) => {
  try {
    const results = await db.query('DELETE FROM todo WHERE id = $1 RETURNING *', [req.params.id]);
    res.status(200).json({
      status: 'success',
      todo: results.rows
    });
  } catch (err) {
    console.error(err.message);
  }
});

// Delete all todos
app.delete(api, async (req, res) => {
  try {
    const results = await db.query('DELETE FROM todo RETURNING *');
    res.status(200).json({
      status: 'success',
      todo: results.rows
    });
  } catch (err) {
    console.error(err.message);
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
