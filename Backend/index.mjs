import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import publicapi from './api/public.mjs';
import adminapi from './api/admin.mjs';
import userapi from './api/user.mjs';
// import { randomBytes } from 'crypto';
dotenv.config();
const app = express();
const port = process.env.PORT;
process.env.MASTERPASSWORDB64 = Buffer.from(process.env.MASTERPASSWORD).toString('base64');
// if (process.env.NODE_ENV === 'development') {
//   process.env.TOKEN_SECRET = randomBytes(64).toString('hex');
// }
app.use(cors());
app.use(express.json());
app.use('/api/', publicapi);
app.use('/api/admin', adminapi);
app.use('/api/user', userapi);

app.listen(port, () => console.log(`Listening on http://localhost:${port}/`));
