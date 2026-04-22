import React from 'react'

const totalItem = (state) => {
    const totalItem = state?.reduce((total, item) => {
        return total + item.cart.qty
    }, 0) || 0
    return totalItem
}

export default totalItem
