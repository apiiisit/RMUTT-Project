import { Router } from 'express';
import { prisma, snow } from '../controller.mjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import sharp from 'sharp';
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fieldNameSize: 200,
    fieldSize: 100 * 1000 // 100MB ?
  }
});
const userapi = Router();

// Auth middleware
userapi.use(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ error: 'ไม่พบ authorization' });
  const token = authorization.split(' ')[1];
  jwt.verify(token, process.env.TOKEN_SECRET, (err, userid) => {
    if (err) return res.status(403).json({ error: 'Session ไม่ผ่าน' });
    req.userid = userid;
    next();
  });
});

// GET /api/user/
// Status/Connection Check
userapi.get('/', async (req, res) => {
  try {
    const [points, query] = await Promise.all([prisma.point.findMany(), prisma.students.findFirst({
      where: {
        id: {
          equals: req.userid
        }
      },
      include: {
        scans: true
      }
    })]);
    return res.json({ error: false, data: query ? [{ ...query, passed: points.length === query.scans.length }] : [] });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// GET /api/user/checkpass
userapi.get('/checkpass', async (req, res) => {
  try {
    const [events, scans] = await Promise.all([
      prisma.event.findMany({ include: { points: true } }),
      prisma.scan.findMany({ where: { studentId: req.userid } })
    ]);
    const cleanscan = scans.map(x => x.pointid);
    const eventlist = events.map(event => {
      const check = event.points.map(x => x.pointid).every(x => cleanscan.includes(x)) ? 0 : cleanscan.length >= 1 ? 1 : 2;
      return ({ eventid: event.eventid, name: event.name, passed: check });
    });
    return res.json({ error: false, data: eventlist });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// GET /api/user/uploadtask
userapi.get('/uploadtask', async (req, res) => {
  try {
    const task = await prisma.documents.findMany({ select: { id: true, name: true, files: { where: { studentId: req.userid } } } });
    return res.json({ error: false, data: { task } });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Upload photo
// GET /api/user/uploadphoto
userapi.post('/uploadphoto', upload.single('photo'), async (req, res) => {
  const photo = req.file ? snow.getUniqueID().toString() : false;
  if (!photo) return res.json({ error: 'no input' });

  try {
    await sharp(req.file.buffer).jpeg({ mozjpeg: true }).toFile(`./upload/${photo}.jpeg`);
    await prisma.students.update({ where: { id: req.userid }, data: { photo, verify: false, failreason: null } });
    return res.json({
      error: false,
      photo
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

// Upload file (still photo only i dont care)
// can accept file but im too lazy to opt. image and file
// GET /api/user/uploadfile/:documentsId
userapi.post('/uploadfile/:documentsId', upload.single('file'), async (req, res) => {
  const documentsId = +req.params.documentsId;

  const file = req.file ? snow.getUniqueID().toString() : false;
  if (!file) return res.json({ error: 'no input' });

  try {
    await sharp(req.file.buffer).jpeg({ mozjpeg: true }).toFile(`./upload/${file}.jpeg`);
    await prisma.files.upsert({
      where: { studentdoc: { studentId: req.userid, documentsId } },
      create: { studentId: req.userid, documentsId, path: file },
      update: {
        path: file,
        verify: false,
        failreason: null
      }
    });
    return res.json({
      error: false,
      file
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

export default userapi;
