import { Router } from 'express';
import prisma from '../dbclient.mjs';
const adminapi = Router();

// Auth middleware
adminapi.use(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ error: 'require authorization header' });
  const [type, secret] = authorization.split(' ');
  if (!(type === 'Bearer' && secret === process.env.MASTERPASSWORDB64)) return res.status(403).json({ error: 'forbidden' });
  return next();
});

// Status/Connection Check
adminapi.get('/', async (req, res) => res.json({ error: false }));

// Create N students
// Array of array where
// 0 is student code
// 1 is student full name
// Example [[ '116210905030-9', 'Passawat Noraman' ]]
adminapi.post('/students/add', async (req, res) => {
  try {
    const data = req.body;
    for (const item of data) {
      const [id, name] = item;
      try {
        await prisma.students.create({ data: { id, name } });
      } catch (error) {
        // P2002 already have this primary key in the table
        // so we ignore this
        if (error.code !== 'P2002') {
          console.log('error:', error);
          return res.status(500).json({ error: error.message });
        };
      }
    }
    return res.json({ error: false });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// return all students
adminapi.get('/students', async (req, res) => {
  try {
    const query = await prisma.students.findMany();
    return res.json({ error: false, data: query });
  } catch (error) {
    return res.status(500).json({ error: error.message, data: [] });
  }
});
// check rfid
adminapi.get('/scan/rfid/:rfid', async (req, res) => {
  const rfid = req.params.rfid;
  if (!rfid) return res.json({ error: false, data: [] });
  try {
    const query = await prisma.students.findMany({
      where: {
        tag: {
          equals: rfid
        }
      },
      take: 1
    });
    return res.json({ error: false, data: query });
  } catch (error) {
    return res.status(500).json({ error: error.message, data: [] });
  }
});

export default adminapi;
