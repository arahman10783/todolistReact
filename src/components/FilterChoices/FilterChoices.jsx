import style from "./FilterChoices.module.css";
import FiltrationBtn from "./FiltrationBtn";
import { filters } from "../../utils/enums";

export default function FilterChoices({ filterHandler, activeFilter }) {
  //completed when task.completed === true
  //inProgress when task.completed === false
  //All

  function completedClickHandler() {
    filterHandler(filters.COMPLETED);
  }

  function inProgressClickHandler() {
    filterHandler(filters.IN_PROGRESS);
  }

  function clearFiltersHandler() {
    filterHandler(null);
  }
  return (
    <div className={style.container}>
      <FiltrationBtn 
        onClickHandler={completedClickHandler} 
        label="Completed" 
        active={activeFilter === filters.COMPLETED} 
        disabled = {activeFilter === filters.COMPLETED}
        />
      <FiltrationBtn 
        onClickHandler={inProgressClickHandler} 
        label="InProgress" 
        active={activeFilter === filters.IN_PROGRESS} 
        disabled={activeFilter === filters.IN_PROGRESS} 
        />
      <FiltrationBtn 
        onClickHandler={clearFiltersHandler} 
        label="All" 
        active={activeFilter === null} 
        disabled = {activeFilter === null}
        />
    </div>
  );
}
