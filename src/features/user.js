import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        id: '',
        username: '',
        image: '',
        money: 0,
    },
    reducers: {
        changeUsername: (state, action) => {
            state.username = action.payload
        },
        changeId: (state, action) => {
            state.id = action.payload
        },
        changeMoney: (state, action) => {
            state.money = action.payload
        },

    }
})

export const {changeUsername, changeId, changeMoney} = userSlice.actions

export default userSlice.reducer;