import React from 'react';
import Action from '../Action';

import './index.css';

export default function GradesControl(props) {
	const { grades, onDelete, onPersist } = props;

	const tableGrades = [];

	let currentStudent = grades[0].student;
	let currentSubject = grades[0].subject;
	let currentGrades = [];
	let id = 1;

	grades.forEach(grade => {
		if (grade.student !== currentStudent) {
			tableGrades.push({
				id: id++,
				student: currentStudent,
				subject: currentSubject,
				grades: currentGrades,
			});

			currentStudent = grade.student;
			currentGrades = [];
		}
		
		if (grade.subject !== currentSubject) {
			currentSubject = grade.subject;
		}
		
		currentGrades.push(grade);
	});

	tableGrades.push({
		id: id++,
		student: currentStudent,
		subject: currentSubject,
		grades: currentGrades,
	});

	const handleActionClick = (id, type) => {
		console.log(id, type);
	}

	return (
		<div className="tables">
			{tableGrades.map(({id, grades}) => {
				const finalGrade = grades.reduce((acc, curr) => acc + curr.value, 0);
				const gradeStyle = finalGrade >= 70 ? 'goodGrade' : 'badGrade';
				
				return (
					<table key={id} className="striped">
					<thead>
						<tr>
							<th>Aluno</th>
							<th>Disciplina</th>
							<th>Avaliação</th>
							<th>Nota</th>
							<th>Ações</th>
						</tr>
					</thead>
					<tbody>
						{grades.map(grade => {
							const { id, student, subject, type, value, isDeleted } = grade;

							return (
								<tr key={id}>
									<td>{student}</td>
									<td>{subject}</td>
									<td>{type}</td>
									<td>{isDeleted ? '–' : value}</td>
									<td>
										<div>
											<Action onActionClick={handleActionClick} id={id} type={isDeleted ? 'add' : 'edit'} />
											{!isDeleted && <Action onActionClick={handleActionClick} id={id} type="delete" />}
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
					<tfoot>
						<tr>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
							<td style={{ textAlign: 'right'}}><strong>Total</strong></td>
							<td>
								<span className={`grade ${gradeStyle}`}>
									{finalGrade}
								</span>
							</td>
							<td>&nbsp;</td>
						</tr>
					</tfoot>
				</table>
				);
			})}
		</div>
	);
}
