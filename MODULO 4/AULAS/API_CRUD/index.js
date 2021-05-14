import express from 'express';

import studentRouter from './routes/studentRouter.js';

const app = express();
app.use(express.json());

app.use('/student', studentRouter);

app.listen(3000, () => {
	console.log('API Iniciada!');
});
