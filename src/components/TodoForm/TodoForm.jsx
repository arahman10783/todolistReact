import {useState} from 'react'
import style from './TodoForm.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { addTasks, setFilteredTasks } from '../../store/taskSlice'

export default function TodoForm (){
  const [task, setTask] = useState("")
  const [error, setError] = useState(false)
  const dispatch = useDispatch()
  const tasksList = useSelector(state => state.tasks.filteredTasks)
  const activeFilter = useSelector(state => state.tasks.filterBy)

  function checkDuplication(str) {
    const duplicateArr = tasksList.filter(({title}) => title.toLowerCase() === str.toLowerCase())
    return duplicateArr.length > 0 ? true : false
  }

  function changeHandler(event){
    setTask(event.target.value)
    setError(false)
  }

  function addTaskToList (task){
      dispatch(addTasks({ id: Date.now(), title: task, completed: false }))
      dispatch(setFilteredTasks(activeFilter)) // Update filtered tasks after adding a new task
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