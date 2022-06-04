import React from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = React.useState([])
  const [task, setTask] = React.useState("")
  const [taskEditing, setEditing] = React.useState(null)
  const [editingText, setEditingText] = React.useState("")
  React.useEffect(() => {
    const json = localStorage.getItem("tasks");
    const loadedTasks = JSON.parse(json);
    if (loadedTasks) {
      setTasks(loadedTasks);
    }
  }, []);

  function submitTask(e){
    e.preventDefault()

    const newTask = {
      id: new Date().getTime(),
      text: task,
      completed: false

    }

    setTasks([...tasks].concat(newTask))
    setTask(" ")
  }
  function deleteTask(id){

    const updateTask = [...tasks].filter((task) => task.id !== id)

    setTasks(updateTask)

  }
  function toggleComplete(id){
    const updateTasks = [...tasks].map((task) => {
      if(task.id === id){
        task.completed = !task.completed
      }
      return task
    })
    setTasks(updateTasks)
  }

  function editTask(id){

    const updatedTask = [...tasks].map((task) => {
      if(task.id === id){
        task.text = editingText

      }
      return task
  })

    setTasks(updatedTask)
    setEditing(null)
    setEditingText("")
  }

  return (
    <div id = "task-list">
      <h1>Task  List</h1>
    <form onSubmit={submitTask}>
      <input type = "text" onChange={(e) => setTask(e.target.value)} value = {task}/>
      <button type = "submit">Add task</button>
    </form>
    {tasks.map((task) => <div key = {task.id} className = "task">
    <div className="task-text">
    <input
      type = "checkbox" 
      onChange={() => toggleComplete(task.id)}
     checked ={task.completed}/>
      {task.id === taskEditing ? (  <input 
     type="text" 
     onChange={(e) => setEditingText(e.target.value)}
     value = {editingText}/> ) : (<div> {task.text}</div>)}

</div>
    

     
    

     
     
     
<div className="task-actions">
     {task.id === taskEditing ? (
              <button onClick={() => editTask(task.id)}>Submit Edits</button>
            ) : (
              <button onClick={() => setEditing(task.id)}>Edit</button>
            )}
     <button onClick={() => deleteTask(task.id)}> Delete</button>
     </div>
     </div>)}
    </div>
  );
}

export default App;
