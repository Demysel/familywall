import { useState, useEffect, useContext } from 'react';
import { ApiContext } from '../contexts/ApiContext';

export default function TaskList() {
  const { fetchData, updateData, TASKS_BIN } = useContext(ApiContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await fetchData(TASKS_BIN);
    setTasks(data);
  };

  const addTask = async () => {
    if (newTask) {
      const updatedTasks = [...tasks, { text: newTask, completed: false }];
      await updateData(TASKS_BIN, updatedTasks);
      setNewTask('');
      loadTasks();
    }
  };

  return (
    <div>
      <input 
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Nouvelle tâche"
      />
      <button onClick={addTask}>Ajouter</button>
      
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input 
              type="checkbox" 
              checked={task.completed}
              onChange={() => toggleTask(index)}
            />
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
