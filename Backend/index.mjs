import * as dotenv from 'dotenv';
import express from 'express';
import publicapi from './api/public.mjs';
import adminapi from './api/admin.mjs';
dotenv.config();
const app = express();
const port = process.env.port;
process.env.MASTERPASSWORDB64 = Buffer.from(process.env.MASTERPASSWORD).toString('base64');

app.use(express.json());
app.use('/', publicapi);
app.use('/admin', adminapi);

app.listen(port, () => console.log(`Listening on http://localhost:${port}/`));
