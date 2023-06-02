import { configureStore, createSlice } from "@reduxjs/toolkit";


let data = createSlice({
    name: 'data',
    initialState: {},
    reducers: {
        dataState(state, action) {
            return {
                ...state,
                data: action.payload
            }
        }
    }
})

export let { dataState } = data.actions;


export default configureStore({
    reducer:{
        data : data.reducer,
    }
})