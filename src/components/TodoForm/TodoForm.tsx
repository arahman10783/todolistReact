import React, { ChangeEvent, FormEvent } from 'react'
import {useState} from 'react'
import style from './TodoForm.module.css'
import {Task} from '../../App.types'


interface TodoFormProps {
  tasksList: Task[]
  addTaskToList : (task : string) => Promise<void>
}

export default function TodoForm ({tasksList, addTaskToList}: TodoFormProps){
  const [task, setTask] = useState<string>("")
  const [error, setError] = useState<boolean>(false)

  function checkDuplication(str: string): boolean {
    const duplicateArr: Task[] = tasksList.filter(({title}) => title.toLowerCase() === str.toLowerCase())
    return duplicateArr.length > 0 ? true : false
  }

  function changeHandler(event: ChangeEvent<HTMLInputElement>):void{
    setTask(event.target.value)
    setError(false)
  }


  function submitHandler (event: FormEvent<HTMLFormElement>){
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
      <form className={style["todo-form"]} onSubmit={submitHandler} role='addTaskForm'>
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