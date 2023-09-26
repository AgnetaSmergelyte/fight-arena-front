import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        id: '',
        username: '',
        image: '',
        money: 0,
        inventory: [],
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
        setInventory: (state, action) => {
            state.inventory = action.payload
        },
        setImage: (state, action) => {
            state.image = action.payload
        },
        addItemToInventory: (state, action) => {
            state.inventory = [...state.inventory, action.payload]
        },
    }
})

export const {changeUsername, changeId, changeMoney, setInventory, setImage, addItemToInventory} = userSlice.actions

export default userSlice.reducer;