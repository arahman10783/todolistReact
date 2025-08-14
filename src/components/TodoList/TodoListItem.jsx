import {useState} from 'react'
import style from './todoListItem.module.css'
import { useDispatch } from 'react-redux'
import { deleteTask, updateTask } from '../../store/taskSlice'

export default function TodoListItem ({task}){
  const [isChecked, setIsChecked] = useState(task.completed)
  const dispatch = useDispatch()

  function deleteItem(taskId){
     dispatch(deleteTask(taskId))
    }

  function modifyItem(task){
      dispatch(updateTask(task))
    }

  function handleComplete (event){
    setIsChecked(event.target.checked)
    modifyItem({
      ...task,
      completed: event.target.checked
    })
  }

  function handleDelete (){
    deleteItem(task.id)
  }


  return (
    <li className={style["todo-element"]}>
      <label className={style.checkLabel}>
        <input type="checkbox" className={style.checkbox} onClick={handleComplete}
        checked={isChecked}
        />
      </label>
      <span className= {isChecked ? style.completedTask : ""}>{task?.title}</span>
      <button className={style.delete} onClick={handleDelete}>Delete</button>
    </li>
  )
}