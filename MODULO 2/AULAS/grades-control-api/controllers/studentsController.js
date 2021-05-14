import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

async function insertStudent(student) {
  if (
    !student.name ||
    !student.subject ||
    !student.type ||
    student.value == null
  ) {
    throw new Error('Name, Subject, Type and Value is required.');
  }

  const data = JSON.parse(await readFile(fileName));

  student = { id: data.nextId++, ...student, timestamp: new Date() };
  data.grades.push(student);

  await writeFile(fileName, JSON.stringify(data, null, 2));

  logger.info(`POST /student – ${JSON.stringify(student)}`);

  return student;
}

async function getStudent() {
  const data = JSON.parse(await readFile(fileName));
  delete data.nextId;

  logger.info('GET /student');

  return data;
}

async function getStudentById(req) {
  const data = JSON.parse(await readFile(fileName));
  const student = data.grades.find(std => std.id === parseInt(req.params.id));

  if (!student) {
    throw new Error("Student not found.");
  }

  logger.info('GET /student/:id');

  return student;
}

async function getTotalGrade(params) {
  const data = JSON.parse(await readFile(fileName));
  const student = data.grades.find(std => std.student === params.student);

  if (!student) {
    throw new Error("Student not found.");
  }

  const totalGrade = data.grades
    .filter(std => std.student === student.student && std.subject === params.subject)
    .reduce((acc, curr) => acc + curr.value, 0);

  logger.info('POST /student/getTotalGrade');

  return { totalGrade };
}

async function getAverageGrade(params) {
  const data = JSON.parse(await readFile(fileName));

  let average = data.grades
    .filter(grade => grade.subject === params.subject && grade.type === params.type);
  
  if (!average) {
    throw new Error("It's not possible to get average grades.");
  }

  const length = average.length;

  average = average.reduce((acc, curr) => acc + curr.value, 0) / length;

  logger.info('POST /student/getAverageGrade');

  return { average };
}

async function getThreeBestGrade(params) {
  const data = JSON.parse(await readFile(fileName));

  const bestGrade = data.grades
    .filter(grade => grade.subject === params.subject && grade.type === params.type)
    .map(grade => grade.value)
    .sort((a, b) => b - a)
    .slice(0, 3);

  if (!bestGrade) {
    throw new Error("It's not possible to get the three best grades.");
  }

  logger.info('POST /student/getThreeBestGrade');

  return { bestGrade };
}

async function updateStudent(student) {
  if (
    !student.id ||
    !student.student ||
    !student.subject ||
    !student.type ||
    student.value == null
  ) {
    throw new Error('Student, Subject, Type and Value is required.');
  }

  const data = JSON.parse(await readFile(fileName));

  const index = data.grades.findIndex(std => std.id === student.id);

  if (index === -1) {
    throw new Error('Registry not found.');
  }

  data.grades[index] = { id: data.grades[index].id, ...student };

  await writeFile(fileName, JSON.stringify(data, null, 2));

  logger.info(`PUT /student – ${JSON.stringify(data.grades[index])}`);

  return data.grades[index];
}

async function deleteStudent(student) {
  const data = JSON.parse(await readFile(fileName));

  const index = data.grades.find(std => std.id === parseInt(student.params.id));

  if (!index) {
    throw new Error("Student not found.");
  }

  data.grades = data.grades.filter(std => std.id !== parseInt(student.params.id));

  await writeFile(fileName, JSON.stringify(data, null, 2));

  logger.info(`DELETE /account/:id – ${student.params.id}`);
}

export {
  insertStudent,
  getStudent,
  getStudentById,
  getTotalGrade,
  getAverageGrade,
  getThreeBestGrade,
  updateStudent,
  deleteStudent
}
