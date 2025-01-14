import { ITask, ITaskModalState } from "@/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ITaskModalState = {
    isModalOpen: false,
    currentTask:null
}

const taskModalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openTaskModal: (state,action:PayloadAction<ITask|null>) => {
            state.isModalOpen = true
            state.currentTask=action.payload
        },
        closeTaskModal: (state) => {
            state.isModalOpen = false
            state.currentTask=null
        },
        setTaskModalState: (state, action: PayloadAction<ITaskModalState>) => {
            state.isModalOpen = action.payload.isModalOpen
        }
    }
})

export const {openTaskModal,closeTaskModal,setTaskModalState}=taskModalSlice.actions

export default taskModalSlice.reducer