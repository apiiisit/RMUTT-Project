import { PrismaClient } from '@prisma/client';
import { Snowflake } from 'nodejs-snowflake';
import fs from 'node:fs';

// DB
export const prisma = new PrismaClient();

// Snowflake for image id generation
if (!fs.existsSync('./upload')) fs.mkdirSync('./upload');
export const snow = new Snowflake({
  custom_epoch: new Date(2023, 1, 1).getTime() / 1000,
  instance_id: 1
});

let setting = {};
export const writedata = (obj) => fs.writeFileSync('./config.json', JSON.stringify(obj, null, 2), { encoding: 'utf8' });

try {
  setting = JSON.parse(fs.readFileSync('./config.json', { encoding: 'utf8' }));
} catch (error) {
  setting = {
    title: 'ชื่องาน',
    subtitle: 'วันที่'
  };
  writedata(setting);
}

export const data = new Proxy(setting, {
  set: (obj, prop, value) => {
    console.log('proxy working');
    obj[prop] = value;
    writedata(obj);
    return true;
  }
});
