import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        id: '',
        username: '',
        image: '',
        money: 0,
        inventory: [],
        selectedItems: [null, null, null],
        room: null,
        player1: null,
        player2: null,
        turn: '',
        timer: 20
    },
    reducers: {
        changeUsername: (state, action) => {
            state.username = action.payload
        },
        changeId: (state, action) => {
            state.id = action.payload
        },
        setMoney: (state, action) => {
            state.money = action.payload
        },
        changeMoney: (state, action) => {
            state.money += action.payload
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
        setSelectedItems: (state, action) => {
            state.selectedItems = action.payload
        },
        setRoom: (state, action) => {
            state.room = action.payload
        },
        setPlayer1: (state, action) => {
            state.player1 = action.payload
        },
        setPlayer2: (state, action) => {
            state.player2 = action.payload
        },
        setTurn: (state, action) => {
            state.turn = action.payload
        },
        countDown: (state, action) => {
            state.timer--
        },
        setTimer: (state, action) => {
            state.timer = action.payload
        },
    }
})

export const {
    changeUsername,
    changeId,
    setMoney,
    changeMoney,
    setInventory,
    setImage,
    setSelectedItems,
    setRoom,
    setPlayer1,
    setPlayer2,
    setTurn,
    countDown,
    setTimer
} = userSlice.actions

export default userSlice.reducer;