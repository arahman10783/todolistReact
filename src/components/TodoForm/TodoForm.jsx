import {useState} from 'react'
import style from './TodoForm.module.css'

export default function TodoForm ({tasksList, addTaskToList}){
  const [task, setTask] = useState("")
  const [error, setError] = useState(false)

  function checkDuplication(str) {
    const duplicateArr = tasksList.filter(({title}) => title.toLowerCase() === str.toLowerCase())
    return duplicateArr.length > 0 ? true : false
  }

  function changeHandler(event){
    setTask(event.target.value)
    setError(false)
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
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <form className={style["todo-form"]} onSubmit={submitHandler} role="form">
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