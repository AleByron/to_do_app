import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import React, { useState } from "react";
import { nanoid } from "nanoid";

const FILTER_MAP = {
  All : () => true,
  Active : (task) => !task.completed,
  Completed: (task) => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);


function App(props) {
const [filterValue, setFilter] = useState("All");


  const [tasks, setTasks] = useState(props.tasks);
   function toggleTaskCompleted(id){
    const updateTasks = tasks.map((task) => {
      if(task.id === id && task.completed === false){
        task.completed = true;
      }
      else if(task.id === id && task.completed === true ){
        task.completed = false;
      }
      return task;
    })
    setTasks(updateTasks);
   }

   function editTask(id, isEditing){
    const updateTasks = tasks.filter((task) => {
      if (task.id === id){
        task.name = isEditing
      }
      return task;
    })
    setTasks(updateTasks);
   }

   function deleteTask(id){
    const updateTasks = tasks.filter((task) => id !== task.id)
    setTasks(updateTasks);
   }

  const taskList = tasks.filter(FILTER_MAP[filterValue]).map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
    key={name} 
    name={name}
    isPressed ={name === filterValue}
    setFilter = {setFilter}
    />
  ));
  


  

  let headingTextNoun = function Noun(taskList){
    if (taskList.length > 1){
      headingTextNoun = "tasks"
    }
    else {
      headingTextNoun = "task"
    }
    return headingTextNoun;
  }
  const headingText = `${taskList.length} ${headingTextNoun(taskList)} remaining`;

  function addTask(name){ //to put inside brackets at line 17
    let newTask = { id: `todo-${nanoid()}`, name, completed: false };
    console.log(newTask);
    //tasks.push(newTask);
    setTasks([...tasks, newTask]);
    console.log(tasks);
  }
  return (
    <div className="todoapp stack-large">
      <h1>ToDo App</h1>

<Form addTaskProp={addTask} />
      <div className="filters btn-group stack-exception">
      {filterList}
      </div>
      <h2 id="list-heading">
      {headingText} 
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
      {taskList}
      </ul>
    </div>
  );
}


export default App;
