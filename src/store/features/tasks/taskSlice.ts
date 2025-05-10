import { createSlice } from "@reduxjs/toolkit";
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
      console.log(action.payload.status);
    },
    toggleTask: (state, action) => {
      const { id } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) {
        task.status = task.status === "TODO" ? "DONE" : "TODO";
      }
    },
  },
});

export const { addTask, deleteTask, updateTask, toggleTask } =
  taskSlice.actions;
export const taskReducer = taskSlice.reducer;

export const selectTasks = (state: RootState) => state.tasks;
