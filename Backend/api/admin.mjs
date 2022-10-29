import { Router } from 'express';
const adminapi = Router();

// Auth
adminapi.use((req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(403).send('403 Forbidden');
  const [type, secret] = authorization.split(' ');
  if (!(type === 'Bearer' && secret === process.env.adminpass)) return res.status(403).send('403 Forbidden');
  return next();
});

adminapi.get('/', (req, res) => res.status(200).send('200'));

// return all students
adminapi.get('/students', (req, res) => {
  res.send('Students List');
});

export default adminapi;
