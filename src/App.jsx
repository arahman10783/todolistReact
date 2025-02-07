import './App.css';
import {useState} from 'react'
import {PageTitle} from './components/pageTitle';
import {Brief} from './components/Breif';
import {TodoForm} from './components/TodoForm'
import {TodoList} from './components/TodoList'
import { v4 as uuidv4 } from 'uuid';
import style from './App.module.css'


// imagination how useState written
// function useState(initialState){
//   let state = initialState
//   function setState(newState){
//     state = newState
//   }
//   return [state, setState]
// }

function App() {
  const [tasks, setTasks] = useState([]) //hook

  function addTaskToList (task){
    const newTask = {
      id: uuidv4(), //use UUID
      title: task,
      completed: false
    }
    setTasks((prevState) => [
      ...prevState,
      newTask
    ])
  }

  function deleteItem(taskid){
    setTasks(tasks => tasks.filter(task => task.id !== taskid))
  }

  function modifyItem(task){
    const filterdTasks = tasks.filter (element => element.id !== task.id)
    setTasks([
      ...filterdTasks,
      task
    ])
  }

  return (
    <div className={style.container}>
      <PageTitle title = "My TO-DO List" />
      <Brief taskNo={tasks.length} />
      <TodoForm tasksList={tasks} addTaskToList={addTaskToList} />
      <TodoList tasksList = {tasks} deleteItem = {deleteItem} modifyItem = {modifyItem}/>
    </div>
  );
}
export default App
