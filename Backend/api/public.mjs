import { Router } from 'express';
import jwt from 'jsonwebtoken';
const publicapi = Router();

const GenerateToken = (data) => jwt.sign(data, process.env.TOKEN_SECRET, { algorithm: 'HS256' });

// Status/Connection Check
publicapi.get('/', async (req, res) => res.json({ error: false }));

// login
publicapi.post('/login', async (req, res) => {
  try {
    // We don't have access to RMUTT Database
    const url = 'https://covid19.rmutt.ac.th/model/login.model.php';
    const formData = (new URLSearchParams({ username: req.body.username, password: req.body.password })).toString();
    const postreq = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'user-agent': 'rmutt-project contact at notrealpaz@gmail.com'
      },
      body: formData
    });
    const data = await postreq.json();
    if (data.error) return res.status(200).json({ error: 'username or password is incorrect' });
    return res.json({ error: false, token: GenerateToken(req.body.username) });
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
});

export default publicapi;
