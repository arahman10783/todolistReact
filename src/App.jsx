import {PageTitle} from './components/pageTitle';
import {Brief} from './components/Breif';
import {TodoForm} from './components/TodoForm'
import {TodoList} from './components/TodoList'
import {FilterChoices} from './components/FilterChoices'
import style from './App.module.css'
import { useSelector } from 'react-redux';


// export const BASE_URL = "http://localhost:50000"


function App() {
  const tasks = useSelector((state) => state.tasks.tasks);




  return (
      <div className={style.container}>
        <PageTitle title = "My TO-DO List" />
        <Brief taskNo={tasks.length} />
        <TodoForm />
        <FilterChoices  />
        <TodoList />
      </div>
    
  );
}
export default App
