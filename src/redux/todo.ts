import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface Task {
    id: string;
    task: string;
    priority: string;
}

interface TaskState {
    tasks: Task[]
}

const initialState: TaskState = {
    tasks: []
}


const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<Task>) {
            state.tasks.push(action.payload)
        },
        removeTask(state, action: PayloadAction<Task>) {
           state.tasks = state.tasks.filter(item => item.id !== action.payload.id)
        }

    }
})

export const tasksReducer = tasksSlice.reducer

export const {addTask, removeTask} = tasksSlice.actions