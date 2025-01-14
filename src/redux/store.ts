import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./features/counter/counterSlice"
import taskReducer from "./features/tasks/taskSlice"
import userReducer from "./features/users/userSlice"
import taskModalReducer from "./features/modal/taskModalSlice"
import userModalReducer from "./features/modal/userModalSlice"

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        todo: taskReducer,
        user: userReducer,
        taskModal: taskModalReducer,
        userModal:userModalReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["modal/openModal", "task/addTask"],
                ignorePaths: ["todo.tasks.dueDate","modal.currentTask.dueDate"]
            }
        })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch