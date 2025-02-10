import {useState} from 'react'
import style from './todoListItem.module.css'

export default function TodoListItem ({task, deleteItem, modifyItem}){
  const [isChecked, setIsChecked] = useState(task.completed)

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