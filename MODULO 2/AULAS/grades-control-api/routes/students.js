import express from 'express';

import {
  insertStudent,
  getStudent,
  getStudentById,
  getTotalGrade,
  getThreeBestGrade,
  getAverageGrade,
  updateStudent,
  deleteStudent
} from '../controllers/studentsController.js';

const router = express.Router();

router
  .post('/', async (req, res, next) => {
    try {
      res.send(await insertStudent(req.body));
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (_, res, next) => {
    try {
      res.send(await getStudent());
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      res.send(await getStudentById(req));
    } catch (err) {
      next(err);
    }
  })
  .post('/getTotalGrade', async (req, res, next) => {
    try {
      res.send(await getTotalGrade(req.body));
    } catch (err) {
      next(err);
    }
  })
  .post('/getAverageGrade', async (req, res, next) => {
    try {
      res.send(await getAverageGrade(req.body));
    } catch (err) {
      next(err);
    }
  })
  .post('/getThreeBestGrade', async (req, res, next) => {
    try {
      res.send(await getThreeBestGrade(req.body));
    } catch (err) {
      next(err);
    }
  })
  .put('/', async (req, res, next) => {
    try {
      res.send(await updateStudent(req.body));
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      res.end(await deleteStudent(req));
    } catch (err) {
      next(err);
    }
  });

router.use((err, req, res, next) => {
  console.log(err);
  res.status(400).send({ error: err.message });
});

export default router;
