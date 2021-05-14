import axios from 'axios';

const API_URL = 'http://localhost:3001/grade/';

const GRADE_VALIDATION = [
	{
		id: 1,
		gradeType: 'Exercícios',
		minValue: 0,
		maxValue: 10,
	},
	{
		id: 2,
		gradeType: 'Trabalho Prático',
		minValue: 0,
		maxValue: 40,
	},
	{
		id: 3,
		gradeType: 'Desafio',
		minValue: 0,
		maxValue: 50,
	},
];

async function getAllGrades() {
	const res = await axios.get(API_URL);

	const grades = res.data.grades.map(grade => {
		const { student, subject, type } = grade;

		return {
			...grade,
			studentLowerCase: student.toLowerCase(),
			subjectLowerCase: subject.toLowerCase(),
			typeLowerCase: type.toLowerCase(),
			isDeleted: false,
		};
	});

	const noRepeatData = dataType => {
		let data = new Set();
		grades.forEach(grade => {
			for (let key in grade) {
				if (key === dataType) {
					data.add(grade[key]);
				}
			}
		});

		return Array.from(data);
	};

	const allStudents = noRepeatData('student');
	const allSubjects = noRepeatData('subject');
	const allTypes = noRepeatData('type');

  let maxId = -1;
  grades.forEach(({ id }) => {
    if (id > maxId) {
      maxId = id;
    }
  });

  let nextId = maxId + 1;
	const allCombinations = [];

	allStudents.forEach(student => {
		allSubjects.forEach(subject => {
			allTypes.forEach(type => {
				allCombinations.push({
					student,
					subject,
					type,
				});
			});
		});
	});

	allCombinations.forEach(combination => {
		const { student, subject, type } = combination;

		const hasItem = grades.find(grade => {
			return grade.subject === subject &&
				grade.student === student &&
				grade.type === type;
		});

		if (!hasItem) {
			grades.push({
        id: nextId++,
        student,
        studentLowerCase: student.toLowerCase(),
        subject,
        subjectLowerCase: subject.toLowerCase(),
        type,
        typeLowerCase: type.toLowerCase(),
        value: 0,
				isDeleted: true,
			});
		}
  });
  
  grades.sort((a,b) => a.typeLowerCase.localeCompare(b.typeLowerCase));
  grades.sort((a,b) => a.studentLowerCase.localeCompare(b.studentLowerCase));
  grades.sort((a,b) => a.subjectLowerCase.localeCompare(b.subjectLowerCase));

	return grades;
}

async function insertGrade(grade) {
  const response = await axios.post(API_URL, grade);

  return response.data.id;
}

async function updateGrade(grade) {
  const response = await axios.put(API_URL, grade);

  return response.data;
}

async function deleteGrade({ id }) {
  const response = await axios.delete(`${API_URL}${id}`);

  return response.data;
}

async function getValidationFromGradeType(gradeType) {
  const gradeValidation = GRADE_VALIDATION.find(item => item.gradeType === gradeType);

  const { minValue, maxValue } = gradeValidation;

  return {
    minValue,
    maxValue,
  }
}

export { 
  getAllGrades,
  insertGrade,
  updateGrade,
  deleteGrade,
  getValidationFromGradeType,
};
