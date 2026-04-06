import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('taskBoardState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('taskBoardState', serializedState);
  } catch (err) {
    console.error('Error saving state:', err);
  }
};

const persistedState = loadState();

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState({
    tasks: store.getState().tasks,
  });
});

export default store;