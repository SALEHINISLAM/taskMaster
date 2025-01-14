import { RootState } from "@/redux/store";
import { ITask } from "@/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

interface TInitialState {
    tasks: ITask[],
    filter: "All" | "High" | "Medium" | "Low",
    status: "all" | "pending" | "completed",
}

const toDay = new Date().getTime()

const initialState: TInitialState = {
    tasks: [
        {
            id: "asdfghjkl",
            title: "Initialize Frontend",
            description: "Create Home Page and routing",
            dueDate: toDay,
            isCompleted: false,
            priority: "High",
            assignedTo: "asdfghjkl"
        },
        {
            id: "asdfghjkm",
            title: "Create Github Repository",
            description: "Create github repository and push it.",
            dueDate: toDay,
            isCompleted: false,
            priority: "Medium",
            assignedTo: "asdfghjkl"
        },
    ],
    filter: "All",
    status: "pending"
}

const taskSlice = createSlice({
    name: "task", initialState, reducers: {
        addTask: (state, action: PayloadAction<ITask>) => {
            const { id, ...taskData } = action.payload;

            const existingIndex = state.tasks.findIndex(task => task.id === id);

            if (existingIndex !== -1) {
                state.tasks[existingIndex] = {
                    ...state.tasks[existingIndex],
                    ...taskData,
                    dueDate: new Date(taskData.dueDate).getTime(),
                };
            } else {
                const newTask = createTask(taskData, id);
                state.tasks.push(newTask);
            }
            //sort task by dueDate
            state.tasks.sort((a, b) => a.dueDate - b.dueDate)
        },

        toggleCompleteState: (state, action: PayloadAction<string>) => {
            state.tasks.forEach(task => task.id === action.payload ? task.isCompleted = !task.isCompleted : task)
            state.tasks = state.tasks.filter(task => task.id !== action.payload)
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload)
        },
        updateFilter: (state, action: PayloadAction<"All" | "High" | "Medium" | "Low">) => {
            state.filter = action.payload
        },
        updateStatus: (state, action: PayloadAction<"all" | "pending" | "completed">) => {
            state.status = action.payload
        }
    }
})

type draftTask = Pick<ITask, "title" | "description" | "dueDate" | "priority" | "assignedTo">

const createTask = (taskData: draftTask, id?: string): ITask => {
    return {
        ...taskData,
        id: id || uuidv4(),
        isCompleted: false,
        dueDate: new Date(taskData.dueDate).getTime(),
    };
};


export const selectTasks = (state: RootState) => {
    const filter = state.persisted.todo.filter
    const status = state.persisted.todo.status
    console.log(filter)
    if (filter === "High") {
        return state.persisted.todo.tasks.filter(task => task.priority === "High")
    }
    else if (filter === "Medium") {
        return state.persisted.todo.tasks.filter(task => task.priority === "Medium")
    }
    else if (filter === "Low") {
        return state.persisted.todo.tasks.filter(task => task.priority === "Low")
    }
    else if (status === "pending") {
        return state.persisted.todo.tasks.filter(task => task.isCompleted === false)
    }
    else if (status === "completed") {
        return state.persisted.todo.tasks.filter(task => task.isCompleted === true)
    }
    else {
        return state.persisted.todo.tasks
    }
}

export const selectFilter = (state: RootState) => {
    return state.persisted.todo.filter
}

export const selectStatus = (state: RootState) => {
    return state.persisted.todo.status
}

export const { addTask, toggleCompleteState, deleteTask, updateFilter } = taskSlice.actions

export default taskSlice.reducer;