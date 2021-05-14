import express from 'express';
import winston from 'winston';
import accountsRouter from './routes/accounts.js';
import { promises as fs } from 'fs';
import cors from 'cors';

const { writeFile, readFile } = fs;

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.fileName = 'accounts.json';
global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'my-bank-api.log' })
  ],
  format: combine(
    label({ label: 'my-bank-api' }),
    timestamp(),
    myFormat
  )
})

const app = express();
app.use(express.json());
app.use(cors());

app.use('/account', accountsRouter);

app.listen(3000, async () => {
  try {
    await readFile(fileName);
    logger.info('API Started!');
  } catch (err) {
    const initialJSON = {
      nextID: 1,
      accounts: []
    }

    writeFile(fileName, JSON.stringify(initialJSON, null, 2))
      .then(() => {
        logger.info('API Started and File Created!');
      })
      .catch(err => {
        logger.error(err);
      });
  }
});
