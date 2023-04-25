import { Router } from 'express';
import { prisma, data } from '../controller.mjs';
import pointapi from './point.mjs';
import eventapi from './event.mjs';
import scanapi from './scan.mjs';
import studentsapi from './students.mjs';
import docapi from './doc.mjs';
const adminapi = Router();

// Auth middleware
adminapi.use(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ error: 'ไม่พบ authorization' });
  const secret = authorization.split(' ')[1];
  if (secret !== process.env.MASTERPASSWORDB64) return res.status(403).json({ error: 'รหัสผ่านไม่ถูกต้อง' });
  return next();
});

adminapi.use('/event', eventapi);
adminapi.use('/point', pointapi);
adminapi.use('/scan', scanapi);
adminapi.use('/students', studentsapi);
adminapi.use('/doc', docapi);

// Status/Connection Check
adminapi.get('/', async (req, res) => res.json({ error: false }));

// POST /api/admin/settings
// { title: "name", subtitle: "subtitle name" }
adminapi.post('/settings', async (req, res) => {
  try {
    const { title, subtitle } = req.body;
    if (title) data.title = title;
    if (subtitle) data.subtitle = subtitle;
    return res.json({ error: false });
  } catch (error) {
    return res.status(500).json({ error: error.message, data: {} });
  }
});

// GET /api/admin/dashboard
// Dashboard
adminapi.get('/dashboard', async (req, res) => {
  try {
    const students = await prisma.students.findMany({
      select: {
        photo: true,
        verify: true
      }
    });
    const files = await prisma.files.count();
    const verifile = await prisma.files.count({ where: { verify: true } });
    const unverifile = await prisma.files.count({ where: { verify: false, failreason: null } });
    return res.json({
      error: false,
      data: {
        students: students.length,
        photonoload: students.filter(x => x.photo === null).length,
        photoupload: students.filter(x => x.photo !== null).length,
        photoverify: students.filter(x => x.verify).length,
        filesuploaded: files,
        filesverify: verifile,
        filesunverify: unverifile
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message, data: {} });
  }
});

// GET /api/admin/scan/rfid/:tag
// check tag
// return [student] or []
adminapi.get('/scan/rfid/:tag', async (req, res) => {
  const { tag } = req.params;
  if (!tag) return res.json({ error: false, data: [] });
  try {
    const query = await prisma.students.findFirst({ where: { tag }, include: { scans: true } });
    return res.json({ error: false, data: query ? [{ ...query, passed: (await prisma.event.findMany()).length === query.scans.length }] : [] });
  } catch (error) {
    return res.status(500).json({ error: error.message, data: [] });
  }
});

export default adminapi;
