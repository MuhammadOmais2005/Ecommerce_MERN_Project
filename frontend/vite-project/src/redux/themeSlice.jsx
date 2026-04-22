import { createSlice } from "@reduxjs/toolkit" 

const themeSlice = createSlice({
    name: "theme", 
    initialState: {
        mode: false, 
    }, 
    reducers: {
        toggleTheme:  (state)=>{
            state.mode = !state.mode
        },
    }
})

export default themeSlice.reducer 
export const {toggleTheme} = themeSlice.actions