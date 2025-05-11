import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../../types";
import { RootState } from "../../store";

export type Project = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  tasks: Task[];
};

interface ProjectState {
  projects: Project[];
}

const initialState: ProjectState = {
  projects: []
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      if (!state.projects) {
        state.projects = [];
      }
      state.projects.push(action.payload);
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      if (!state.projects) {
        state.projects = [];
        return;
      }
      const index = state.projects.findIndex((project) => project.id === action.payload);
      if (index !== -1) {
        state.projects.splice(index, 1);
      }
    },
    updateProject: (state, action: PayloadAction<Partial<Project> & { id: string }>) => {
      if (!state.projects) {
        state.projects = [];
        return;
      }
      const { id, ...fields } = action.payload;
      const project = state.projects.find((project) => project.id === id);
      if (project) {
        Object.assign(project, fields);
      }
    },
  },
});

export const { addProject, deleteProject, updateProject } = projectSlice.actions;
export const projectReducer = projectSlice.reducer;

export const selectProjects = (state: RootState) => state.projects.projects || []; 
