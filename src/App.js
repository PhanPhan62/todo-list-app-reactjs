import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		fetchTasks();
	}, []);

	const fetchTasks = async () => {
		try {
			const response = await axios.get("http://localhost:5000/tasks");
			setTasks(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleAddTask = (newTask) => {
		setTasks([...tasks, newTask]);
	};

	const handleDeleteTask = (taskId) => {
		setTasks(tasks.filter((task) => task.id !== taskId));
	};

	const handleToggleComplete = (taskId) => {
		setTasks(
			tasks.map((task) =>
				task.id === taskId
					? { ...task, completed: !task.completed }
					: task
			)
		);
	};

	return (
		<div>
			<h1>To-Do List</h1>
			<TaskForm onAddTask={handleAddTask} />
			<TaskList
				tasks={tasks}
				onDeleteTask={handleDeleteTask}
				onToggleComplete={handleToggleComplete}
			/>
		</div>
	);
}

export default App;
