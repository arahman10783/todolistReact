import {useContext, useState} from 'react'
import style from './TodoForm.module.css'
import {BASE_URL} from '../../App'
import { TodoContext } from '../../context/TodoProvider'

export default function TodoForm ({tasksList}){
  const [task, setTask] = useState("")
  const [error, setError] = useState(false)
  const { setTasks, setFilteredTasks } = useContext(TodoContext);

  function checkDuplication(str) {
    const duplicateArr = tasksList.filter(({title}) => title.toLowerCase() === str.toLowerCase())
    return duplicateArr.length > 0 ? true : false
  }

  function changeHandler(event){
    setTask(event.target.value)
    setError(false)
  }

  async function addTaskToList (task){
      try {
        await fetch(`${BASE_URL}/todoList`, {
          method: "POST",
          body: JSON.stringify({
            title: task,
            completed: false
          })
        })
        setTasks(prevTasks => [...prevTasks, { title: task, completed: false }])
        setFilteredTasks(prevFiltered => [...prevFiltered, { title: task, completed: false }])
      } catch (error) {
        console.log(error.message)
      }
      
    }

  function submitHandler (event){
    event.preventDefault()
    if(task.trim().length > 0 && !checkDuplication(task)){
      setError(false)
      addTaskToList(task)
      setTask("")
    }else{
      setError(true)
    }
  }
  return (
    <>
      <form className={style["todo-form"]} onSubmit={submitHandler} data-testid="form">
          <input data-testid="inputTask" value={task} onChange={changeHandler} type="text" placeholder="Add task to do"/>
          <button data-testid="addBtn">Add to the List</button>
      </form>
      {
        error && 
        <p data-testid="formError" className={style.error}> Please add real data and not duplicate </p>
      }
    </>
  )
}