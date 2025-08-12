import { createContext, useState } from "react";

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]) //hook
    const [filteredTasks, setFilteredTasks] = useState([])

    
    return (
        <TodoContext.Provider value={{ tasks, setTasks, filteredTasks, setFilteredTasks }}>
            {children}
        </TodoContext.Provider>
    );
}

export { TodoContext, TodoProvider };
