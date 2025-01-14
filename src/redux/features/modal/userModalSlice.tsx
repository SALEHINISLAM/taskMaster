import {   IUser, IUserModalState } from "@/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IUserModalState = {
    isUserModalOpen: false,
    currentUser:null
}

const userModalSlice = createSlice({
    name: "userModal",
    initialState,
    reducers: {
        openUserModal: (state,action:PayloadAction<IUser|null>) => {
            state.isUserModalOpen = true
            state.currentUser=action.payload
        },
        closeUserModal: (state) => {
            state.isUserModalOpen = false
            state.currentUser=null
        },
        setUserModalState: (state, action: PayloadAction<IUserModalState>) => {
            state.isUserModalOpen = action.payload.isUserModalOpen
        }
    }
})

export const {openUserModal,closeUserModal,setUserModalState}=userModalSlice.actions

export default userModalSlice.reducer