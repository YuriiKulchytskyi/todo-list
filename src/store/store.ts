import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { taskReducer } from './features/tasks/taskSlice';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
import { projectReducer } from './features/projects/projectSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['projects', 'tasks']
}

const rootReducer = combineReducers({
  tasks: taskReducer,
  projects: projectReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
