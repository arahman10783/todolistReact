import {useState, useEffect} from 'react'
import {PageTitle} from './components/pageTitle';
import {Brief} from './components/Breif';
import {TodoForm} from './components/TodoForm'
import {TodoList} from './components/TodoList'
import style from './App.module.css'


// imagination how useState written
// function useState(initialState){
//   let state = initialState
//   function setState(newState){
//     state = newState
//   }
//   return [state, setState]
// }
const BASE_URL = "http://localhost:5000"

function App() {
  const [tasks, setTasks] = useState([]) //hook
  const [errorMessage, setErrorMessage] = useState("")
  const [updated, setUpdated] = useState(false)

  async function addTaskToList (task){
    try {
      await fetch(`${BASE_URL}/todoList`, {
        method: "POST",
        body: JSON.stringify({
          title: task,
          completed: false
        })
      })
      setUpdated(!updated)
      setErrorMessage("")
    } catch (error) {
      setErrorMessage(error.message)
    }
    
  }

  async function deleteItem(taskId){
    try {
      const res = await fetch(`${BASE_URL}/todoList/${taskId}`,{
        method: "DELETE"
      })
      setUpdated(!updated)
      setErrorMessage("")
      
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  async function modifyItem(task){
    try {
      const res = await fetch(`${BASE_URL}/todoList/${task.id}`, {
        method: "PUT",
        body: JSON.stringify({ ...task })
      })
      setUpdated(!updated)
      setErrorMessage("")
    } catch (error) {
      setErrorMessage(error.message)
    }
    
  }

  async function getList(){
    try {
      const res = await fetch(`${BASE_URL}/todoList`)
      const tasks = await res.json()
      Array.isArray(tasks) ? setTasks(tasks) : setTasks([])
    } catch (error) {
      setErrorMessage(error.message)
    }

  }

  useEffect(() => {
    getList()
    //clean function "unmount"
    return () => {
      setErrorMessage("")
    }
  }, [updated])

  return (
    <div className={style.container}>
      <PageTitle title = "My TO-DO List" />
      <Brief taskNo={tasks.length} />
      <TodoForm tasksList={tasks} addTaskToList={addTaskToList} />
      {
        errorMessage && <p className={style.error}>{errorMessage}</p>
      }
      <TodoList tasksList = {tasks} deleteItem = {deleteItem} modifyItem = {modifyItem}/>
    </div>
  );
}
export default App
