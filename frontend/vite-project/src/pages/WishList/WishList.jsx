import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleWishItem, clearAllItems } from '../../redux/wishListSlice'
import { Box, Button, Container, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

const WishList = () => {
    const { wishList } = useSelector((state) => {
        return state.wishList
    })
    const dispatch = useDispatch()
    if (!wishList || !(wishList?.length > 0)) {
        return (
            <Box sx={{height: "100%", display: "flex", justifyContent: "center", alignItems: "center", mt: 6}}>
                <Typography variant="body1" sx={{ color: "primary.main", textAlign: "center" }}>
                    No item in wish list.
                </Typography>
            </Box>
        )
    }
    return (
        <Container maxWidth="lg" sx={{mt: 6}}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button variant='contained' sx={{ backgroundColor: "card.main", color: "primary.main" }} onClick={() => dispatch(clearAllItems())} >Clear all item.</Button>
                </Box>
                <Box sx={{ display: "grid", gridTemplateColumns: {xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(4, 1fr)", lg: "repeat(5, 1fr)"}, gap: {xs: 1, sm: 3, md: 4}}}>
                    {
                        wishList?.map((item, index) => {
                            return (
                                <Box key={index} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                    <Box component={NavLink} to={`/product-detail/${item._id}`}>
                                        <Box component="img" src={item.images[0]} sx={{ width: "100%", heigth: "auto" }}></Box>
                                    </Box>
                                    <Button fullWidth onClick={() => dispatch(toggleWishItem(item))} sx={{ backgroundColor: "card.main", color: "primary.main" }}>Remove</Button>
                                </Box>
                            )
                        })
                    }
                </Box>

            </Box>
        </Container>
    )
}

export default WishList
