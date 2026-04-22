// import { createSlice } from "@reduxjs/toolkit" 

// const localStorageCartList = JSON.parse(localStorage.getItem("myCartList")) || []
// const cartSlice = createSlice({
//     name: "cart", 
//     initialState: {
//         cartList: localStorageCartList, 
//     }, 
//     reducers: {
//         addInCart: (state, action)=>{
//             const exist = state.cartList.find((item)=>{
//                 return item._id == action.payload._id && item.cart.size == action.payload.cart.size
//             }) 
//             if(exist && state.cart.qty < state.cart?.stock ){
//                 return state.cartList.filter((item)=>{
//                     if(item._id == action.payload._id && item.cart.size == action.payload.cart.size){
//                         console.log("increase")
//                         return [...state.cartList, {...item, cart: {...item.cart, qty: item.cart.qty + 1}}]
//                     }
//                 })
//             }
//             console.log("add")
//             return [...state.cartList, {...action.payload, cart: {...action.payload.cart, qty: 1}}]
//         },

//         getQty: (state, action)=>{
//             const exist = state.cartList.find((item)=>{
//                 return item._id == action._id && state.cart?.size == action.cart.size
//             })  
//             if(exist){
//                 return exist.cart.qty
//             } 
//             return 0
//         }
//     }
// }) 

// export const { addInCart, getQty } = cartSlice.actions 
// export default cartSlice.reducer





import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartList: JSON.parse(localStorage.getItem("myCartList")) || []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addInCart: (state, action) => {
      const product = action.payload;

      const existingItem = state.cartList.find(
        (item) =>
          item._id === product._id &&
          item.cart.size === product.cart.size
      );

      if (existingItem) {
        if (existingItem.cart.qty < existingItem.cart.stock) {
          existingItem.cart.qty += action.payload.cart.number;
        }
      } else {
        state.cartList.push({
          ...product,
          cart: {
            ...product.cart,
            qty: action.payload.cart.number
          }
        });
      }

      localStorage.setItem(
        "myCartList",
        JSON.stringify(state.cartList)
      );
    }, 


    removeInCart: (state, action)=>{
    
      const product = action.payload  
      console.log(product)
      const updatedCartList = state.cartList?.map((item)=>{
        if(item._id == product._id && item?.cart.size == product.cart.size){
          return {...item, cart: {...item.cart, qty: item.cart.qty - 1}}
        } 
        return item
      })
      localStorage.setItem(
        "myCartList",
        JSON.stringify(updatedCartList)
      );

       state.cartList = updatedCartList   
    },


    removeFromCart: (state, action) => {
     
      state.cartList = state.cartList.filter(
        (item) => !(item._id == action.payload._id && item.cart.size == action.payload.cart.size)
      );

      localStorage.setItem(
        "myCartList",
        JSON.stringify(state.cartList)
      );
    },

    clearCart: (state) => {
      state.cartList = [];
      localStorage.removeItem("myCartList");
    }
  }
});

export const {
  addInCart,
  removeFromCart,
  removeInCart,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
