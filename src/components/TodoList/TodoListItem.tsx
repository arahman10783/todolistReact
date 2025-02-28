import React, {useState, ChangeEvent} from 'react'
import style from './todoListItem.module.css'
import { Task, DeleteItem, ModifyItem } from '../../App.types'

interface TodoListItemProps {
  task: Task;
  deleteItem: DeleteItem;
  modifyItem: ModifyItem
}

export default function TodoListItem ({task, deleteItem, modifyItem}: TodoListItemProps){
  const [isChecked, setIsChecked] = useState<boolean>(task.completed)

  function handleComplete (event: ChangeEvent<HTMLInputElement>): void{
    setIsChecked(event.target.checked)
    modifyItem({
      ...task,
      completed: event.target.checked
    })
  }

  function handleDelete (): void{
    deleteItem(task.id)
  }


  return (
    <li className={style["todo-element"]}>
      <label className={style.checkLabel}>
        <input type="checkbox" className={style.checkbox} onChange={handleComplete}
        checked={isChecked}
        />
      </label>
      <span className= {isChecked ? style.completedTask : ""}>{task?.title}</span>
      <button className={style.delete} onClick={handleDelete}>Delete</button>
    </li>
  )
}