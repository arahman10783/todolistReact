import {createSlice} from "@reduxjs/toolkit";
import { filters } from "../utils/enums";


export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    filteredTasks: [],
    filterBy: null
  },
  reducers: {
    addTasks: (state, {payload}) => {
      state.tasks.push(payload);
    },
    setFilteredTasks: (state, {payload}) => {
      state.filterBy = payload;
      state.filteredTasks = [...state.tasks.filter(task => {
        if (!payload) return true;
        return task.completed === (payload === filters.COMPLETED);
      })];
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;
      state.tasks = state.tasks.filter(task => task.id !== taskId);
      state.filteredTasks = state.filteredTasks.filter(task => task.id !== taskId);
    },
    updateTask: (state, action) => {
      const { id, title, completed } = action.payload;
      const existingTask = state.tasks.find(task => task.id === id);
      if (existingTask) {
        existingTask.title = title;
        existingTask.completed = completed;
      }
    }
  },
});

export const { addTasks, setFilteredTasks, deleteTask, updateTask } = taskSlice.actions;