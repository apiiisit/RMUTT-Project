import { Router } from 'express';
const publicapi = Router();

publicapi.get('/', (req, res) => res.status(200).send('200'));

// return all students
publicapi.get('/students', (req, res) => {
  res.send('Students List');
});

export default publicapi;
