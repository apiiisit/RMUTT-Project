import { Router } from 'express';
import { prisma } from '../controller.mjs';
const studentsapi = Router();

// GET /api/admin/students
// return all students
studentsapi.get('/', async (req, res) => {
  try {
    const query = await prisma.students.findMany({ orderBy: [{ rowfaculty: 'asc' }] });
    return res.json({ error: false, data: query });
  } catch (error) {
    return res.status(500).json({ error: error.message, data: [] });
  }
});

// GET /api/admin/students/checkupload
studentsapi.get('/checkupload', async (req, res) => {
  try {
    const [students, documents] = await Promise.all([
      prisma.students.findMany({ include: { files: true } }),
      prisma.documents.findMany()
    ]);

    return res.json({ error: false, data: { documents, students } });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// GET /api/admin/students/checkupload/:id
studentsapi.get('/checkupload/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [students, documents] = await Promise.all([
      prisma.students.findFirst({ where: { id }, include: { files: true } }),
      prisma.documents.findMany()
    ]);

    return res.json({ error: false, data: { documents, students } });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// GET /api/admin/students/checkpass/:id
studentsapi.get('/checkpass/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [events, scans] = await Promise.all([
      prisma.event.findMany({ include: { points: true } }),
      prisma.scan.findMany({ where: { studentId: id } })
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

// GET /api/admin/students/:id
// return [student] or []
studentsapi.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = await prisma.students.findFirst({ where: { id } });
    return res.json({ error: false, data: query ? [query] : [] });
  } catch (error) {
    return res.status(500).json({ error: error.message, data: [] });
  }
});

// Add students
// Array of students
// Example [{ prefixname: 'นาย', name: 'ภาสวัฒน์ นรมั่น', row: 440, rowfaculty: 1, faculty: 'วิทยาการคอมพิวเตอร์' degree: 'วิทยาศาสตรบัณฑิต', year: 2565 }]
studentsapi.post('/add', async (req, res) => {
  const data = req.body;
  if (!data) return res.status(500).json({ error: 'No input!' });
  try {
    const createMany = await prisma.students.createMany({ data, skipDuplicates: true });
    return res.json({ error: false, count: createMany.count });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// POST /api/admin/students/update
// { id: "116210905030-9", name: "Pazawat Norman", award:"Gold" }
studentsapi.post('/update', async (req, res) => {
  const body = req.body;
  try {
    await prisma.students.update({ where: { id: body.id }, data: { ...body } });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.json({ error: false });
});

// DELETE /api/admin/students/delete
// Example [{ id: "116210905030-9" }]
studentsapi.delete('/delete', async (req, res) => {
  try {
    const body = req.body.map(x => x?.id).filter(x => x);
    const { count } = await prisma.students.deleteMany({ where: { id: { in: [...body] } } });
    return res.json({ error: false, count });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// POST /api/admin/students/setrfid
// { studentId: '116210905030-9', tag: "AABBCC" }
// set rfid student
studentsapi.post('/setrfid', async (req, res) => {
  const { id, rfid } = req.body;
  try {
    // Check if has student
    const studentcheck = await prisma.students.findFirst({ select: { id: true }, where: { id } });
    if (!studentcheck) return res.status(500).json({ error: 'ไม่มีบัณฑิตคนนี้ในระบบ' });
    // Check if rfid already use
    const tagcheck = await prisma.students.findFirst({ select: { id: true, name: true }, where: { tag: rfid } });
    if (tagcheck) return res.status(500).json({ error: 'รหัส RFID ถูกใช้ไปแล้ว', data: [tagcheck] });
    await prisma.students.update({
      where: { id },
      data: { tag: rfid }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.json({ error: false });
});

export default studentsapi;
