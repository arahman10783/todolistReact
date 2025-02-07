import style from './todoList.module.css'
import TodoListItem from "./TodoListItem";


export default function TodoList ({tasksList, deleteItem, modifyItem}){
  return(
    <>
    {
      tasksList.length > 0 ?
          <ul className={style["todo-list"]}>
            {
              tasksList.map (task => <TodoListItem key ={task.id} task = {task} deleteItem = {deleteItem} modifyItem = {modifyItem} />)
            }          
          </ul>
          : <p className={style.info}> No Tasks added yet </p>
    
    }
    </>
  )
}