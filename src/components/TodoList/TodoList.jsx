import style from './todoList.module.css'
import TodoListItem from "./TodoListItem";
import { useSelector } from "react-redux";


export default function TodoList (){
  const tasksList = useSelector((state) => state.tasks.filteredTasks);
  console.log('first', tasksList)
  return(
    <>
    {
      tasksList.length > 0 ?
          <ul className={style["todo-list"]}>
            {
              tasksList.map (task => <TodoListItem key ={task.id} task = {task} />)
            }          
          </ul>
          : <p className={style.info}> No Tasks added yet </p>
    
    }
    </>
  )
}