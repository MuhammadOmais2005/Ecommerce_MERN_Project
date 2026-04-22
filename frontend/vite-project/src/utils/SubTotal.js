const subtotal = (state)=>{
    return state?.reduce((total, item)=>{
        return total + (item.price * item.cart.qty )
    }, 0)
} 
export default subtotal