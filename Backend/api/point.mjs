import { Router } from 'express';
import { prisma } from '../controller.mjs';
const pointapi = Router();

// GET /api/admin/point/:pointid
// Get Point Everything
pointapi.get('/:pointid', async (req, res) => {
  try {
    const pointid = +req.params.pointid;
    const point = await prisma.point.findFirst({ where: { pointid }, include: { event: true } });
    return res.json({ error: false, data: point });
  } catch (error) {
    return res.status(500).json({ error: error.message, data: [] });
  }
});

// GET /api/admin/point/:pointid/list
// use to get all students who pass and not pass from point
pointapi.get('/:pointid/list', async (req, res) => {
  try {
    const pointid = +req.params.pointid;
    const [point, list] = await Promise.all([
      prisma.point.findMany({
        select: {
          name: true,
          event: { select: { name: true } }
        },
        where: { pointid }
      }),
      prisma.students.findMany({ select: { id: true, prefixname: true, name: true, faculty: true, scans: { select: { scanedAt: true }, where: { point: { pointid } } } }, orderBy: [{ rowfaculty: 'asc' }] })
    ]);
    return res.json({ error: false, data: { point, list } });
  } catch (error) {
    return res.status(500).json({ error: error.message, data: [] });
  }
});

// POST /api/admin/point/create
// Example [{ name: 'ห้อง 1 เช้า', eventid: 1 }]
pointapi.post('/create', async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(500).json({ error: 'No input!' });
    const createMany = await prisma.point.createMany({ data, skipDuplicates: true });
    return res.json({ error: false, count: createMany.count });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// POST /api/admin/point/edit
// Example { pointid: 1, name: 'ทางเข้า' }
pointapi.post('/edit', async (req, res) => {
  try {
    const { pointid, name } = req.body;
    await prisma.point.update({ where: { pointid }, data: { name } });
    return res.json({ error: false });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// DELETE /api/admin/point/delete
// Example { pointid: 1 }
pointapi.delete('/delete', async (req, res) => {
  try {
    const { pointid } = req.body;
    await prisma.point.delete({ where: { pointid } });
    return res.json({ error: false });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// POST /api/admin/point/scan
// Example { tag: 'AABBCC', pointid: 1 }
pointapi.post('/scan', async (req, res) => {
  let student;
  try {
    const { tag, pointid } = req.body;
    student = await prisma.students.findFirst({
      where: { tag },
      select: {
        id: true,
        prefixname: true,
        name: true,
        faculty: true,
        row: true,
        rowfaculty: true,
        photo: true,
        scans: {
          select: { scanedAt: true, point: { select: { pointid: true } } },
          where: {
            point: {
              event: {
                points: { some: { pointid } }
              }
            }
          }
        }
      }
    });
    if (!student) return res.status(500).json({ error: 'ไม่มีแท็คนี้ในระบบ RFID', errlvl: 2 });
    const point = await prisma.point.findFirst({ where: { pointid: +pointid }, select: { pointid: true, eventid: true, event: { select: { points: true } } } });
    if (!point) return res.status(500).json({ error: 'ไม่มี point นี้', errlvl: 2 });
    await prisma.scan.create({ data: { studentId: student.id, pointid: point.pointid } });
    // useless
    const allpoints = point.event.points.length;
    const passed = allpoints.length === student.scans.length + 1;
    return res.json({ error: false, errlvl: 0, data: [{ ...student, passed }] });
  } catch (error) {
    if (error.code === 'P2002') return res.status(500).json({ error: 'เคยสแกนไปแล้ว', errlvl: 1, data: [student] });
    return res.status(500).json({ error: error.message });
  }
});

export default pointapi;
