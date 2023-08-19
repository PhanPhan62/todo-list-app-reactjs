import React from "react";
import axios from "axios";

const TaskList = ({ tasks, onDeleteTask, onToggleComplete }) => {
	const handleDeleteTask = async (taskId) => {
		try {
			await axios.delete(`http://localhost:5000/tasks/${taskId}`);
			onDeleteTask(taskId);
		} catch (error) {
			console.error(error);
		}
	};

	const handleToggleComplete = async (task) => {
		try {
			await axios.patch(`http://localhost:5000/tasks/${task.id}`, {
				completed: !task.completed,
			});
			onToggleComplete(task.id);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<ul>
			{tasks.map((task) => (
				<li key={task.id}>
					<span
						style={{
							textDecoration: task.completed
								? "line-through"
								: "none",
						}}
					>
						{task.title}
					</span>
					<button onClick={() => handleToggleComplete(task)}>
						Toggle Complete
					</button>
					<button onClick={() => handleDeleteTask(task.id)}>
						Delete
					</button>
				</li>
			))}
		</ul>
	);
};

export default TaskList;
