import React from 'react'
import style from './todoList.module.css'
import TodoListItem from "./TodoListItem";
import { Task, DeleteItem, ModifyItem } from '../../App.types';



interface TodoListProps {
  tasksList: Task[];
  deleteItem: DeleteItem;
  modifyItem: ModifyItem
}

export default function TodoList ({tasksList, deleteItem, modifyItem}: TodoListProps){
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