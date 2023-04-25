import { Router } from 'express';
import { prisma, data } from '../controller.mjs';
import jwt from 'jsonwebtoken';
import path from 'node:path';
const publicapi = Router();

const GenerateToken = (data) => jwt.sign(data, process.env.TOKEN_SECRET, { algorithm: 'HS256' });

// Status/Connection Check
publicapi.get('/', async (req, res) => res.json({
  error: false,
  data: {
    ...data
  }
}));

// login
publicapi.post('/login', async (req, res) => {
  try {
    // We don't have access to RMUTT Database
    const url = 'https://covid19.rmutt.ac.th/model/login.model.php';
    const formData = (new URLSearchParams({ username: req.body.username.replace(/^(\d{12})-?(\d{1})$/, '$1$2'), password: req.body.password })).toString();
    const postreq = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'user-agent': 'rmutt-project contact at notrealpaz@gmail.com'
      },
      body: formData
    });
    const data = await postreq.json();
    if (data.error) return res.status(500).json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });

    const userId = req.body.username.replace(/^(\d{12})-?(\d{1})$/, '$1-$2');
    const studentcheck = await prisma.students.findFirst({ select: { id: true }, where: { id: userId } });
    if (!studentcheck) return res.status(500).json({ error: 'ไม่มีนักศึกษาคนนี้ในระบบ RFID' });
    return res.json({ error: false, token: GenerateToken(userId) });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

publicapi.get('/image/:id', async (req, res) => {
  return res.sendFile(path.resolve('upload', (req.params.id + '.jpeg')));
});

export default publicapi;
