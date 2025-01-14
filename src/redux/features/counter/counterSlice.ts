import { createSlice } from "@reduxjs/toolkit"

const initialState = { count: 0 }

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        increment: (state,number) => { state.count=state.count+number.payload },
        decrement: (state) => { state.count-- },
    }
})

export const { increment, decrement } = counterSlice.actions

export default counterSlice.reducer