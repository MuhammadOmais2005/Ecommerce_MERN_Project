const checkWishItem = (wishList, id)=>{
    const exist = wishList?.find((item)=>{
        return item?._id == id
    })
    if(exist){
        return true
    }
    return false
} 

export default checkWishItem
