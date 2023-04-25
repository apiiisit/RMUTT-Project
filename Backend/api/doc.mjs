import { Router } from 'express';
import { prisma } from '../controller.mjs';
const docapi = Router();

// GET /api/admin/doc/list
// get doc list
// return [doc] or []
docapi.get('/list', async (req, res) => {
  try {
    const documents = await prisma.documents.findMany();
    return res.json({
      error: false,
      data: documents
    });
  } catch (error) {
    return res.status(500).json({ error: error.message, data: [] });
  }
});

// GET /api/admin/doc/list/:documentsId
// get files list from docid
// return [files] or []
docapi.get('/list/:documentsId', async (req, res) => {
  const documentsId = +req.params.documentsId;
  try {
    const students = await prisma.students.findMany({ include: { files: { where: { documentsId } } } });
    return res.json({ error: false, data: students });
  } catch (error) {
    return res.status(500).json({ error: error.message, data: [] });
  }
});

// POST /api/admin/doc/create
// Example [{ name: 'atk วันพระ' }]
docapi.post('/create', async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(500).json({ error: 'No input!' });
    const createMany = await prisma.documents.createMany({ data, skipDuplicates: true });
    return res.json({ error: false, count: createMany.count });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// POST /api/admin/doc/edit
// Example { documentsId: 1, name: 'atk วันหยุด' }
docapi.post('/edit', async (req, res) => {
  try {
    const { documentsId, name } = req.body;
    await prisma.documents.update({ where: { id: documentsId }, data: { name } });
    return res.json({ error: false });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// DELETE /api/admin/doc/delete
// Example { documentsId: 1 }
docapi.delete('/delete', async (req, res) => {
  try {
    const { documentsId } = req.body;
    await prisma.documents.delete({ where: { id: documentsId } });
    return res.json({ error: false });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// GET /api/admin/doc/getphotolist
// get the list students who hasnt verify photo yet
// return [student] or []
docapi.get('/getphotolist', async (req, res) => {
  try {
    const photo = await prisma.students.findMany({
      where: {
        photo: { not: null },
        failreason: null,
        verify: false
      }
    });
    return res.json({
      error: false,
      data: photo ? [...photo] : []
    });
  } catch (error) {
    return res.status(500).json({ error: error.message, data: [] });
  }
});

// GET /api/admin/doc/getdoclist
// get the list students who hasnt check their doc yet
// return [student] or []
docapi.get('/getdoclist', async (req, res) => {
  try {
    const files = await prisma.files.findMany({
      select: { documents: true, id: true, path: true, students: true },
      where: {
        failreason: null,
        verify: false
      }
    });
    /*
    {
        id: number,
        documents: documents,
        path: string,
        students: students;
    }[]
    */
    return res.json({
      error: false,
      data: files ? [...files] : []
    });
  } catch (error) {
    return res.status(500).json({ error: error.message, data: [] });
  }
});

// GET /api/admin/doc/getdoclist/:documentsId
// get the list students who hasnt check their doc yet
// return [student] or []
docapi.get('/getdoclist/:documentsId', async (req, res) => {
  try {
    const documentsId = +req.params.documentsId;
    const files = await prisma.files.findMany({
      select: { id: true, path: true, students: true },
      where: {
        failreason: null,
        verify: false,
        documentsId
      }
    });
    /*
    {
        id: number,
        documents: documents,
        path: string,
        students: students;
    }[]
    */
    return res.json({
      error: false,
      data: files ? [...files] : []
    });
  } catch (error) {
    return res.status(500).json({ error: error.message, data: [] });
  }
});

// POST /api/admin/doc/verifyphoto
// verify student photo
// example { id: "116210905030-9", verify: true }
// example { id: "116210905030-9", verify: false, failreason: "รูปไม่เท่ ไม่สวย atk เลยวันหมดอายุ" }
// return { error: false }
docapi.post('/verifyphoto', async (req, res) => {
  const { id, verify, failreason } = req.body;
  try {
    await prisma.students.update({
      where: { id },
      data: {
        verify,
        ...(failreason ? { failreason } : { failreason: null })
      }
    });
    return res.json({ error: false });
  } catch (error) {
    return res.status(500).json({ error: error.message, data: [] });
  }
});

// POST /api/admin/doc/verifyfile
// verify student file
// file id not student id
// example { id: "1", verify: true }
// example { id: "1", verify: false, failreason: "รูปไม่เท่ ไม่สวย atk เลยวันหมดอายุ" }
// return { error: false }
docapi.post('/verifyfile', async (req, res) => {
  const { id, verify, failreason } = req.body;
  try {
    await prisma.files.update({
      where: { id },
      data: {
        verify,
        ...(failreason ? { failreason } : { failreason: null })
      }
    });
    return res.json({ error: false });
  } catch (error) {
    return res.status(500).json({ error: error.message, data: [] });
  }
});

export default docapi;
