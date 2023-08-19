import React, { useState } from "react";
import axios from "axios";

const TaskForm = ({ onAddTask }) => {
	const [task, setTask] = useState("");

	const handleInputChange = (event) => {
		setTask(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (task.trim() === "") return;

		try {
			const response = await axios.post("http://localhost:5000/tasks", {
				title: task,
				completed: false,
			});
			onAddTask(response.data);
			setTask("");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type="text" value={task} onChange={handleInputChange} />
			<button type="submit">Add Task</button>
		</form>
	);
};

export default TaskForm;
