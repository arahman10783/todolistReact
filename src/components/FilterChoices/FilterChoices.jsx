import style from "./FilterChoices.module.css";
import FiltrationBtn from "./FiltrationBtn";
import { filters } from "../../utils/enums";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredTasks } from "../../store/taskSlice";

export default function FilterChoices() {
  //completed when task.completed === true
  //inProgress when task.completed === false
  //All
  const activeFilter = useSelector(state => state.tasks.filterBy);
  const dispatch = useDispatch();

  function handleFilter(filter) {
    dispatch(setFilteredTasks(filter));
  }

  function completedClickHandler() {
    handleFilter(filters.COMPLETED);
  }

  function inProgressClickHandler() {
    handleFilter(filters.IN_PROGRESS);
  }

  function clearFiltersHandler() {
    handleFilter(null);
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
