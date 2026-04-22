import { createSlice } from "@reduxjs/toolkit"

const localStorageWishList = JSON.parse(localStorage.getItem("myWishList")) || []

const wishSlice = createSlice({
    name: "wishlist",
    initialState: {
        wishList: localStorageWishList
    },
    reducers: {
        toggleWishItem: (state, action) => {
            const exist = state.wishList.findIndex((item) => {
                return item?._id == action.payload._id
            })
            if (exist == -1) {
                state.wishList.push(action.payload)
                localStorage.setItem("myWishList", JSON.stringify(state.wishList))
                console.log(state.wishList) 
                return
            }
            state.wishList.splice(exist,1)
            localStorage.setItem("myWishList", JSON.stringify(state.wishList))
            console.log(state.wishList)  

        }, 
        clearAllItems: (state, action)=>{
            state.wishList = [] 
            localStorage.clear("myWishList")

        }
    }
})

export default wishSlice.reducer
export const { toggleWishItem, clearAllItems } = wishSlice.actions