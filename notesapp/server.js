const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'notesapp'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// Create Note
// Create Note with current timestamp
app.post('/notes', (req, res) => {
    const { title } = req.body;
    const createTime = new Date(); // Capture the current date and time

    const sql = 'INSERT INTO notes (title, createTime) VALUES (?, ?)';
    db.query(sql, [title, createTime], (err, result) => {
        if (err) throw err;
        res.send('Note added with date and time...');
    });
});


// Get Notes
app.get('/notes', (req, res) => {
    const sql = 'SELECT * FROM notes';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Delete Note
app.delete('/notes/:id', (req, res) => {
    const sql = 'DELETE FROM notes WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send('Note deleted...');
    });
});
app.listen(5000, () => console.log('Server running on port 5000'));
