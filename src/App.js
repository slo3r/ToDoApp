import React, { useEffect, useState } from 'react';
import './App.css';
import '@fontsource/roboto-slab';
import {CgTrash} from 'react-icons/cg'

function App() {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [completedTasks, setCompletedTasks] = useState(
    JSON.parse(localStorage.getItem('completedTasks')) || []
  );
  

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const storedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    setTasks(storedTasks);
    setCompletedTasks(storedCompletedTasks);
  }, []);
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [tasks, completedTasks]);
  
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

 const handleKeyPress = (e) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      setTasks([...tasks, input]);
      setInput('');
    }
  };

  const handleTaskClick = (index) => {
    const newCompletedTasks = [...completedTasks];
    newCompletedTasks[index] = !newCompletedTasks[index];
    setCompletedTasks(newCompletedTasks);
  };

  const handleDeleteAllTasks = () => {
    setTasks([]); 
    setCompletedTasks([]);  
  };

  return (
    <div className="App">
      <div className="app-container">

      <div className='trash' onClick={handleDeleteAllTasks}>
          <CgTrash size={"40px"}/>
      </div>

     <div className="title">
      ToDo App
     </div>

     <div className="tasks-container">
     {tasks.map((task, index) => (
            <div className={`task ${completedTasks[index] ? 'completed' : ''}`} 
            key={index} 
            onClick={() => handleTaskClick(index)}>
              <input type="radio" checked={completedTasks[index] || false} readOnly></input>
              <p>{task}</p>
            </div>
          ))}
        
     </div>

      <div className="input">
        <input 
          placeholder="Add a task"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        ></input>
      </div>
    </div>
    </div>
  );
}

export default App;
