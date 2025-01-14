import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import taskReducer from "./features/tasks/taskSlice";
import userReducer from "./features/users/userSlice";
import taskModalReducer from "./features/modal/taskModalSlice";
import userModalReducer from "./features/modal/userModalSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

// Combine reducers to persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "todo"], // Only persist these reducers
};

const rootReducer = combineReducers({
  user: userReducer,
  todo: taskReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Combine the persisted reducers with other reducers
const globalReducer = combineReducers({
  persisted: persistedReducer, // Add persisted reducers under a key
  counter: counterReducer,
  taskModal: taskModalReducer,
  userModal: userModalReducer,
});

// Configure the store
export const store = configureStore({
  reducer: globalReducer, // Use the combined global reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Ignore redux-persist actions
      },
    }),
});

// Export the persistor
export const persistor = persistStore(store);

// Export types for RootState and Dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
