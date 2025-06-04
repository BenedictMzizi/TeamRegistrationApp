require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;

const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'password';

let registrations = [];

app.post('/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1d' });
    return res.json({ token, user: { email } });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

const requireAuth = expressJwt({ secret: JWT_SECRET, algorithms: ['HS256'] });

app.get('/registrations', requireAuth, (req, res) => {
  res.json(registrations);
});

app.post('/register', (req, res) => {
  const newEntry = { id: Date.now(), name: req.body.name, status: 'pending' };
  registrations.push(newEntry);
  res.status(201).json(newEntry);
});

app.patch('/registrations/:id', requireAuth, (req, res) => {
  const reg = registrations.find(r => r.id == req.params.id);
  if (!reg) return res.status(404).json({ error: 'Not found' });
  reg.status = req.body.status;
  res.json(reg);
});

app.listen(process.env.PORT || 5000, () => console.log('Server running'));