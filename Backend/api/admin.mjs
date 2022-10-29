import { Router } from 'express';
import prisma from '../dbclient.mjs';
const adminapi = Router();

// Auth
// adminapi.use((req, res, next) => {
//   const { authorization } = req.headers;
//   if (!authorization) return res.status(403).send('403 Forbidden');
//   const [type, secret] = authorization.split(' ');
//   if (!(type === 'Bearer' && secret === process.env.adminpass)) return res.status(403).send('403 Forbidden');
//   return next();
// });

adminapi.get('/', (req, res) => res.status(200).send('200'));

// Create 1 student
adminapi.post('/students/add', async (req, res) => {
  try {
    const data = req.body;
    for (const item of data) {
      const [id, name] = item;
      try {
        await prisma.students.create({ data: { id, name } });
      } catch (error) {
        if (error.code !== 'P2002') {
          console.log('error:', error);
          return res.json({ error: error.message });
        };
      }
    }
    return res.json({ error: false });
  } catch (error) {
    return res.json({ error: error.message });
  }
});

// Create more students
// adminapi.post('/students/add', async (req, res) => {

// });

// return all students
adminapi.get('/students', async (req, res) => {
  try {
    const data = await prisma.students.findMany();
    return res.json({ error: false, data });
  } catch (error) {
    return res.json({ error: error.message, data: {} });
  }
});

export default adminapi;
