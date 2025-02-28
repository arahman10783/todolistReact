import React from 'react'
import style from "./FilterChoices.module.css";
import FiltrationBtn from "./FiltrationBtn";


type Filter = "completed" | "inProgress" | null

interface FilterChoicesProps{
  filterHandler : (filter: Filter) => void
  activeFilter: string | null
}

export default function FilterChoices({ filterHandler, activeFilter }: FilterChoicesProps) {
  //completed when task.completed === true
  //inProgress when task.completed === false
  //All

  function completedClickHandler() {
    filterHandler("completed");
  }

  function inProgressClickHandler() {
    filterHandler("inProgress");
  }

  function clearFiltersHandler() {
    filterHandler(null);
  }
  return (
    <div className={style.container}>
      <FiltrationBtn 
        onClickHandler={completedClickHandler} 
        label="Completed" 
        active={activeFilter === "completed"} 
        // disabled = {activeFilter === "completed"}
        />
      <FiltrationBtn 
        onClickHandler={inProgressClickHandler} 
        label="InProgress" 
        active={activeFilter === "inProgress"} 
        // disabled={activeFilter === "inProgress"} 
        />
      <FiltrationBtn 
        onClickHandler={clearFiltersHandler} 
        label="All" 
        active={activeFilter === null} 
        // disabled = {activeFilter === null}
        />
    </div>
  );
}
