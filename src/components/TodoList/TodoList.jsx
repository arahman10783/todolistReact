import { useContext } from 'react';
import style from './todoList.module.css'
import TodoListItem from "./TodoListItem";
import { TodoContext } from '../../context/TodoProvider';


export default function TodoList ({tasksList, deleteItem, modifyItem}){
  const { filteredTasks } = useContext(TodoContext);
  return(
    <>
    {
      filteredTasks.length > 0 ?
          <ul className={style["todo-list"]}>
            {
              filteredTasks.map (task => <TodoListItem key ={task.id} task = {task} deleteItem = {deleteItem} modifyItem = {modifyItem} />)
            }          
          </ul>
          : <p className={style.info}> No Tasks added yet </p>
    
    }
    </>
  )
}