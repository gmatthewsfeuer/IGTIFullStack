import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

//--- CONFIGURAÇÃO VARIÁVEIS DE AMBIENTE ---

dotenv.config();

const { MONGODB_CONNECTION_PASSWORD, MONGODB_CONNECTION_USER } = process.env;
const databaseName = 'students';
const uri = `mongodb+srv://${MONGODB_CONNECTION_USER}:${MONGODB_CONNECTION_PASSWORD}@bootcamp.gdeuf.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

const router = express.Router();

//--- IMPORTANDO MODELOS ---

import { studentModel } from '../models/studentModel.js';

//--- CONECTANDO AO MONGODB ATLAS ---

(async () => {
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true
    });
    
    console.log('Conectado com sucesso ao MongoDB Atlas!');
	} catch (err) {
		console.log(`Houve um problema ao conectar ao MongoDB Atlas! \n${err}`);
	}
})();

//--- ROTAS --- 

// Create
router.post('/', async (req, res, next) => {
  try {
    const student = new studentModel(req.body);

    await student.save();

    res.send(student);
  } catch (err) {
    next(err);
  }
});

// Retrieve
router.get('/', async (req, res, next) => {
  try {
    const students = await studentModel.find({});

    res.send(students);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const student = await studentModel.findById({_id: id});

    res.send(student);
  } catch (err) {
    next(err);
  }
});

// Update
router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const student = await studentModel.findByIdAndUpdate({_id: id}, req.body, {new: true});

    res.send(student);
  } catch (err) {
    next(err);
  }
});

// Delete
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const student = await studentModel.findByIdAndDelete({_id: id});

    if (!student) {
      res.status(404).send('Documento não foi encontrado na coleção.');
    } else {
      res.status(200).send('Documento deletado!');
    }
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  console.log(err);
  res.status(400).send({ error: err.message });
});

export default router;
