import * as dotenv from 'dotenv';
import express from 'express';
import publicapi from './api/public.mjs';
import adminapi from './api/admin.mjs';
import { randomBytes } from 'crypto';
dotenv.config();
const app = express();
const port = process.env.port;
process.env.MASTERPASSWORDB64 = Buffer.from(process.env.MASTERPASSWORD).toString('base64');
if (process.env.NODE_ENV === 'development') {
  process.env.TOKEN_SECRET = randomBytes(64).toString('hex');
}
app.use(express.json());
app.use('/api/', publicapi);
app.use('/api/admin', adminapi);

app.listen(port, () => console.log(`Listening on http://localhost:${port}/`));
