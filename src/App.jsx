import './App.css';
import PageTitle from './components/PageTitle';
import Brief from './components/Brief';


function App() {
  return (
    <div className="container">
    <PageTitle title = "My TO-DO List" />
    <Brief taskNo={2} />
    
    {/* <p>You have <span id="tasksNo"></span> tasks to do</p>
    <div className="todo-form">
      <input id="taskInput" type="text" placeholder="Add task to do"/>
      <button id="addTaskBtn" role="button">Add to the List</button>
    </div>
    <p id="error">
      Please add real data and not duplicate
    </p>
    <p id="info">
      No Tasks added yet
    </p>
    <ul class="todo-list" id="todoListId">
      
    </ul> */}
  </div>
  );
}
export default App
