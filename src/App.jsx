import {useState, useEffect} from 'react'
import {PageTitle} from './components/pageTitle';
import {Brief} from './components/Breif';
import {TodoForm} from './components/TodoForm'
import {TodoList} from './components/TodoList'
import {FilterChoices} from './components/FilterChoices'
import {filters} from './utils/enums'
import style from './App.module.css'


// imagination how useState written
// function useState(initialState){
//   let state = initialState
//   function setState(newState){
//     state = newState
//   }
//   return [state, setState]
// }
export const BASE_URL = "http://localhost:5000"


function App() {
  const [tasks, setTasks] = useState([]) //hook
  const [errorMessage, setErrorMessage] = useState("")
  const [updated, setUpdated] = useState(false)
  const [filterBy, setFilterBy] = useState(null)
  const [filterdTasks, setFilteredTasks] = useState([])

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
      await fetch(`${BASE_URL}/todoList/${taskId}`,{
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
      await fetch(`${BASE_URL}/todoList/${task.id}`, {
        method: "PUT",
        body: JSON.stringify({ ...task })
      })
      setUpdated(!updated)
      setErrorMessage("")
    } catch (error) {
      setErrorMessage(error.message)
    }
    
  }

  function filterTasks (tasks, filterBy){
    switch (filterBy) {
      case filters.COMPLETED:
        setFilteredTasks(tasks.filter(task => task.completed === true))
        break;
      case filters.IN_PROGRESS:
        setFilteredTasks(tasks.filter(task => task.completed === false))
        break;
      default:
        setFilteredTasks(tasks)
        break;
    }
    if(filterBy === null){
      setFilteredTasks(tasks)
    }
  }

  function handleFilter(filter) {
    setFilterBy(filter)
  }

  async function getList(){
    try {
      const res = await fetch(`${BASE_URL}/todoList`)
      const tasks = await res.json()
      if(Array.isArray(tasks)){
        setTasks(tasks)
        filterTasks(tasks, filterBy)
      }else{
        setTasks([])
        setFilteredTasks([])
      }
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
  }, [updated, filterBy])

  return (
    <div className={style.container}>
      <PageTitle title = "My TO-DO List" />
      <Brief taskNo={tasks.length} />
      <TodoForm tasksList={tasks} addTaskToList={addTaskToList} />
      <FilterChoices filterHandler={handleFilter} activeFilter = {filterBy} />
      {
        errorMessage && <p className={style.error}>{errorMessage}</p>
      }
      <TodoList tasksList = {filterdTasks} deleteItem = {deleteItem} modifyItem = {modifyItem}/>
    </div>
  );
}
export default App
