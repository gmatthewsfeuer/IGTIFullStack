import React, { useState, useEffect } from 'react';
import Spinner from './components/Spinner';

import * as api from './api/apiService';
import GradesControl from './components/GradesControl';

export default function App() {
	const [allGrades, setAllGrades] = useState([]);
	const [selectedGrade, setSelectedGrade] = useState({});
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const fetchGrades = async () => {
			try {
				const response = await api.getAllGrades();

				setAllGrades(response);
			} catch (err) {
				console.warn(err);
			}
		};

		fetchGrades();
  }, []);
  
  const handleDelete = () => {
    console.log('object');
  }

  const handlePersist = () => {
    console.log('object');
  }

	return (
		<div className="container">
			<h1 className="center">Controle de Notas</h1>

			{allGrades.length === 0 && <Spinner description="Carregando" />}
			{allGrades.length > 0 && (
				<GradesControl
					grades={allGrades}
					onDelete={handleDelete}
					onPersist={handlePersist}
				/>
			)}
		</div>
	);
}
