import { Router } from 'express';
import { prisma } from '../controller.mjs';
const eventapi = Router();

// GET /api/admin/event/
// use to get all event list
eventapi.get('/', async (req, res) => {
  try {
    const query = await prisma.event.findMany({ orderBy: [{ eventid: 'asc' }] });
    return res.json({ error: false, data: query });
  } catch (error) {
    return res.status(500).json({ error: error.message, data: [] });
  }
});

// GET /api/admin/event/list
// use to get all students who pass and not pass
// return {event,list}
eventapi.get('/list', async (req, res) => {
  try {
    const [events, query] = await Promise.all([
      prisma.event.findMany({ select: { eventid: true, name: true, points: { select: { pointid: true, name: true } } } }),
      prisma.students.findMany({ select: { id: true, prefixname: true, name: true, faculty: true, scans: { select: { scanedAt: true } } }, orderBy: [{ rowfaculty: 'asc' }] })
    ]);
    const allpoints = events.map(x => x.points.length).reduce((a, b) => a + b);
    const list = query.map(x => ({
      id: x.id,
      prefixname: x.prefixname,
      name: x.name,
      faculty: x.faculty,
      scans: x.scans,
      passed: allpoints === x.scans.length
    }));
    return res.json({ error: false, data: { events, list } });
  } catch (error) {
    return res.status(500).json({ error: error.message, data: [] });
  }
});

// GET /api/admin/event/:eventid/list
// same as above but only one event
eventapi.get('/:eventid/list', async (req, res) => {
  try {
    const eventid = +req.params.eventid;
    const [events, query] = await Promise.all([
      prisma.event.findFirst({ where: { eventid }, select: { name: true, points: { select: { pointid: true, name: true }, orderBy: { pointid: 'asc' } } } }),
      prisma.students.findMany({ select: { id: true, prefixname: true, name: true, faculty: true, scans: { select: { pointid: true, scanedAt: true }, where: { point: { eventid } }, orderBy: { pointid: 'asc' } } }, orderBy: [{ rowfaculty: 'asc' }] })
    ]);
    const list = query.map(x => ({
      id: x.id,
      prefixname: x.prefixname,
      name: x.name,
      faculty: x.faculty,
      scans: x.scans,
      passed: events.points.length === x.scans.length ? 0 : x.scans.length >= 1 ? 1 : 2
    }));
    return res.json({ error: false, data: { events, list } });
  } catch (error) {
    return res.status(500).json({ error: error.message, data: [] });
  }
});

// POST /api/admin/event/create
// Example [{ name: 'ห้อง 1 เช้า' }]
eventapi.post('/create', async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(500).json({ error: 'No input!' });
    const createMany = await prisma.event.createMany({ data, skipDuplicates: true });
    return res.json({ error: false, count: createMany.count });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// POST /api/admin/event/edit
// Example { eventid: 1, name: 'ห้อง 1 เย็น' }
eventapi.post('/edit', async (req, res) => {
  try {
    const { eventid, name } = req.body;
    await prisma.event.update({ where: { eventid: +eventid }, data: { name } });
    return res.json({ error: false });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// DELETE /api/admin/event/delete
// Example { eventid: 1 }
eventapi.delete('/delete', async (req, res) => {
  try {
    const { eventid } = req.body;
    await prisma.event.delete({ where: { eventid: +eventid } });
    return res.json({ error: false });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default eventapi;
