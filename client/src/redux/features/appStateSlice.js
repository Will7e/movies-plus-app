import { createSlice } from "@reduxjs/toolkit"

export const appStateSlice = createSlice({
    name :"AppStateSlice",
    initialState :{
        appState:"",
    },
    reducers :{
        setAppState :(state, action) =>{
            state.themeMode = action.payload
        } 
    }

})

export const {setAppState} = appStateSlice.actions

export default appStateSlice.reducer;