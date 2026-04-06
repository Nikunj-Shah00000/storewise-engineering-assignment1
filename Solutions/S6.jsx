// src/store/taskSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  loading: false,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    cloneTask: (state, action) => {
      const taskToClone = state.tasks.find(task => task.id === action.payload);
      if (taskToClone) {
        const clonedTask = {
          ...taskToClone,
          id: Date.now(),
          name: `${taskToClone.name || `Task ${taskToClone.id}`} (Clone)`,
          createdAt: new Date().toISOString(),
        };
        state.tasks.push(clonedTask);
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { addTask, updateTask, deleteTask, cloneTask, setLoading } = taskSlice.actions;
export default taskSlice.reducer;