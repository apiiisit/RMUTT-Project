import * as dotenv from 'dotenv';
import express from 'express';
import publicapi from './api/public.mjs';
import adminapi from './api/admin.mjs';
dotenv.config();
const app = express();
const port = process.env.port;
process.env.adminpass = Buffer.from(process.env.adminpass).toString('base64');

app.get('/', (req, res) => res.send('hello world'));

app.use('/api/public', publicapi);
app.use('/api/admin', adminapi);

app.listen(port, () => console.log(`Listening on http://localhost:${port}/`));
