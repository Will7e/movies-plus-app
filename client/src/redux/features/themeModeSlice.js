import { createSlice } from "@reduxjs/toolkit"

export const themeSlice = createSlice({
    name :"ThemeMode",
    initialState :{
        themeMode:"dark",
    },
    reducers :{
        setThemeMode :(state, action) =>{
            state.themeMode = action.payload
        } 
    }

})

export const {setThemeMode} = themeSlice.actions

export default themeSlice.reducer;