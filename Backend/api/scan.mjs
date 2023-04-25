import { Router } from 'express';
import { prisma } from '../controller.mjs';
const scanapi = Router();

// GET /api/admin/scan/:studentId
scanapi.get('/:studentId', async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const query = await prisma.scan.findMany({ where: { studentId } });
    return res.json({ error: false, data: [...query] });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// เอาออกไปก่อน
// ยังไม่ได้แก้ให้เป็นแบบ point
// DELETE /api/admin/scan/delete
// Example { eventid: 1 , studentId: '116210905041-6' }
// scanapi.delete('/delete', async (req, res) => {
//   try {
//     const { eventid, studentId } = req.body;
//     await prisma.scan.deleteMany({
//       where: {
//         eventid,
//         studentId
//       }
//     });
//     return res.json({ error: false });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

export default scanapi;
