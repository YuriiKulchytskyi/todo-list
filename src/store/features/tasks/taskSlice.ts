import { createSlice, createSelector } from "@reduxjs/toolkit";
import { Task } from "../../../types";
import { RootState } from "../../store";

const initialState: Task[] = [];

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      const index = state.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    updateTask: (state, action) => {
      const { id, ...fields } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) {
        Object.assign(task, fields);
      }
    },
    toggleTask: (state, action) => {
      const { id } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) {
        task.status = task.status === "TODO" ? "DONE" : "TODO";
      }
    },
    deleteProjectTasks: (state, action) => {
      const projectId = action.payload;
      return state.filter(task => task.projectId !== projectId);
    }
  },
});

export const { addTask, deleteTask, updateTask, toggleTask, deleteProjectTasks } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;

export const selectTasks = (state: RootState) => state.tasks;

export const selectTasksByProject = (projectId: string | null) => 
  createSelector(
    [selectTasks],
    (tasks) => tasks.filter(task => task.projectId === projectId)
  );
