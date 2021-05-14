import express from 'express';
import winston from 'winston';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level} – ${message}`;
});

global.fileName = 'grades.json';
global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'grades-control-api.log' })
  ],
  format: combine(
    label({ label: 'grades-control-api' }),
    timestamp(),
    myFormat
  )
})

import accountsRouter from './routes/students.js';

const app = express();
app.use(express.json());

app.use('/student', accountsRouter);

app.listen(3000, async () => {
  try {
    await readFile(fileName);
    logger.info('API Started!');
  } catch (err) {
    const initialJSON = {
      nextId: 1,
      grades: []
    }

    writeFile(fileName, JSON.stringify(initialJSON, null, 2))
      .then(() => {
        logger.info('API Started and File Created!');
      })
      .catch(err => {
        logger.error(err);
      })
  }
});
