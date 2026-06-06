const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
// 1. Auth Login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
    if (rows.length > 0) {
      res.json({ success: true, user: rows[0] });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. Get Grades per Class
app.get('/api/grades/class/:className', async (req, res) => {
  const { className } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT s.nim, s.name, g.subject, g.score, g.semester 
      FROM students s 
      JOIN grades g ON s.id = g.student_id 
      WHERE s.class_name = ?
    `, [className]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2b. Get Available Classes
app.get('/api/classes', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT DISTINCT class_name FROM students ORDER BY class_name');
    res.json(rows.map(r => r.class_name));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2c. Add New Student
app.post('/api/students', async (req, res) => {
  const { nim, name, className } = req.body;
  try {
    await db.query('INSERT INTO students (nim, name, class_name) VALUES (?, ?, ?)', [nim, name, className]);
    res.json({ success: true, message: 'Student added successfully' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'NIM sudah terdaftar' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// 3. Input Grades
app.post('/api/grades', async (req, res) => {
  const { nim, subject, score, semester } = req.body;
  try {
    const [students] = await db.query('SELECT id FROM students WHERE nim = ?', [nim]);
    if (students.length === 0) return res.status(404).json({ error: 'Student not found' });
    
    await db.query('INSERT INTO grades (student_id, subject, score, semester) VALUES (?, ?, ?, ?)', 
      [students[0].id, subject, score, semester]);
    res.json({ success: true, message: 'Grade added' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Get Top Stats
app.get('/api/stats/top', async (req, res) => {
  try {
    const [topStudent] = await db.query(`
      SELECT s.name, s.class_name, AVG(g.score) as average 
      FROM students s JOIN grades g ON s.id = g.student_id 
      GROUP BY s.id ORDER BY average DESC LIMIT 1
    `);
    const [topClass] = await db.query(`
      SELECT s.class_name, AVG(g.score) as average 
      FROM students s JOIN grades g ON s.id = g.student_id 
      GROUP BY s.class_name ORDER BY average DESC LIMIT 1
    `);
    res.json({ topStudent: topStudent[0], topClass: topClass[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Individual Student Progress
app.get('/api/stats/student/:nim', async (req, res) => {
  const { nim } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT g.semester, AVG(g.score) as average_score 
      FROM grades g JOIN students s ON s.id = g.student_id 
      WHERE s.nim = ? 
      GROUP BY g.semester ORDER BY g.semester ASC
    `, [nim]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on port ${PORT}`);
});
