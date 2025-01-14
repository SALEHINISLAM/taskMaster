import { RootState } from "@/redux/store"
import { IUser } from "@/type"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

interface InitialState {
    users: IUser[]
}

const initialState: InitialState = {
    users: [{
        name: "Salehin",
        id: "asdfghjkl"
    }]
}

type DraftUser = Pick<IUser, "name">

const createUser = (userData: DraftUser, id?: string): IUser => {
    return { id: id || uuidv4(), ...userData }
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        addUser: (state, action: PayloadAction<IUser>) => {
            const { id, ...userData } = action.payload;

            const existingIndex = state.users.findIndex(task => task.id === id);

            if (existingIndex !== -1) {
                state.users[existingIndex] = {
                    ...state.users[existingIndex],
                    ...userData,
                };
            } else {
                const newUser = createUser(userData, id);
                state.users.push(newUser);
            }
        },
        removeUser: (state, action: PayloadAction<string>) => {
            if (state.users.length > 1) {
                state.users = state.users.filter(user => user.id !== action.payload)
            } else {
                // return something so that react toastify can be implemented
                toast.warning("Cannot delete the last remaining user!"), {
                    position: "top-right",
                    autoClose: 5000
                }
            }
        },
    },
},
)

export const selectUsers = (state: RootState) => state.user.users
export const { addUser, removeUser } = userSlice.actions
export const selectPendingTasksByUser = (state: RootState, userId: string) =>
    state.todo.tasks.filter((task) => task.assignedTo === userId && !task.isCompleted);
export const userName=(state:RootState,userId:string)=>{
    return state.user.users.find(user=>user.id===userId)
}


export default userSlice.reducer