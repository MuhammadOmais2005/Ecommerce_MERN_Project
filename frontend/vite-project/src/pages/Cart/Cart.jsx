import { Box, Button, IconButton, Typography, Container } from '@mui/material'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../../redux/cartListSlice'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addInCart } from '../../redux/cartListSlice';
import { removeFromCart } from '../../redux/cartListSlice';
import { removeInCart } from '../../redux/cartListSlice';
import { useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import subtotal from '../../utils/SubTotal';


const Cart = () => {
    const shipmentCost = 500
    const { cartList } = useSelector((state) => {
        return state.cartList
    })

    const { currentAccount } = useSelector((state) => {
        return state.accountList
    })

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const theme = useTheme()

    const deleteIemWhenQtyZero = (number, item) => {
        if (number == 0) {
            dispatch(removeFromCart(item))
            return true
        }
        return false
    }


    if (cartList.length <= 0 || !cartList) {
        return (
            <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", mt: 6 }}>
                <Typography variant="body1" sx={{ color: "primary.main", textAlign: "center" }}>
                    No item in cart list.
                </Typography>
            </Box>
        )
    }


    const getCheckOut = () => {
        if (currentAccount.length == 0) {
            navigate("/signup/?redirect=checkout")
            return
        }
        navigate("/checkout")
    }

    return (
        <Container sx={{mt: 6}}>
            <Box>
                <Box sx={{ display: { xs: "none", md: "grid" }, gridTemplateColumns: "1fr 3fr 2fr 1fr 2fr 2fr 1fr", gap: 1, py: 2, color: "secondary.main", backgroundColor: "card.main" }}>
                    <Typography variant="body1" sx={{ textAlign: "center" }} >Product</Typography>
                    <Typography variant="body1" sx={{ textAlign: "center" }} >Title</Typography>
                    <Typography variant="body1" sx={{ textAlign: "center" }} >Price</Typography>
                    <Typography variant="body1" sx={{ textAlign: "center" }} >Size</Typography>
                    <Typography variant="body1" sx={{ textAlign: "center" }} >Quantity</Typography>
                    <Typography variant="body1" sx={{ textAlign: "center" }} >Remove</Typography>
                    <Typography variant="body1" sx={{ textAlign: "center" }} >Total</Typography>
                </Box>

                <Box sx={{ display: { xs: "grid", md: "none" }, gridTemplateColumns: { xs: "2fr 3fr 1fr", sm: "1fr 3fr 2fr 1fr", md: "1fr 3fr 2fr 1fr 2fr 2fr 1fr" }, gap: 1, py: 2, color: "secondary.main" }}>
                    <Typography variant="body1" sx={{ textAlign: "center" }} >Product</Typography>
                    <Typography variant="body1" sx={{ textAlign: "center" }} >Description</Typography>
                    <Typography variant="body1" sx={{ textAlign: "center", display: { xs: "none", sm: "block" } }} >Quantity</Typography>
                    <Typography variant="body1" sx={{ textAlign: "center" }} >Total</Typography>
                </Box>
                <Box sx={{ color: "primary.main" }}>
                    {
                        cartList.map((item) => {
                            return (
                                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: "2fr 4fr 2fr", sm: "1fr 3fr 2fr 1fr", md: "1fr 3fr 2fr 1fr 2fr 2fr 1fr" }, gap: 1, borderBottom: `1px solid ${theme.palette.primary.main}` }}>
                                    <Box component={NavLink} to={`/product-detail/${item._id}`} sx={{ display: "flex", justifyContent: 'center', alignItems: "center", width: "100%", height: "100%" }}>
                                        <Box component="img" src={item.images[0]} sx={{ width: "100%", height: "auto" }}></Box>
                                    </Box>
                                    <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
                                        <Typography variant="body2">
                                            {item.title}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: { xs: "block", md: "none" } }}>
                                        <Typography variant="body2">
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2">
                                            Rs. {item.price}
                                        </Typography>
                                        <Typography variant="body2">
                                            Size {item.cart.size}
                                        </Typography>
                                        <Box sx={{ display: { xs: "flex", sm: "none" }, justifyContent: "start", alignItems: "center", gap: 1 }}>
                                            <IconButton disabled={item.cart.qty == item.cart.stock} onClick={() => { dispatch(addInCart({ ...item, cart: { ...item.cart, number: 1 } })) }}>
                                                <AddIcon />
                                            </IconButton>
                                            <Typography>{item.cart.qty}</Typography>
                                            <IconButton disabled={item.cart.qty == 0 && deleteIemWhenQtyZero(item.cart.qty, item)} onClick={() => dispatch(removeInCart(item))}>
                                                <RemoveIcon />
                                            </IconButton>
                                        </Box>
                                        <IconButton onClick={() => dispatch(removeFromCart(item))}>
                                            <DeleteIcon sx={{ color: "primary.main" }} />
                                        </IconButton>
                                    </Box>
                                    <Box sx={{ justifyContent: "center", alignItems: "center", display: { xs: "none", md: "flex" } }}>
                                        <Typography variant="body1" sx={{ textAlign: "center" }}>
                                            Rs. {item.price}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", display: { xs: "none", md: "flex" } }}>
                                        <Typography variant="body1" sx={{ textAlign: "center" }}>
                                            {item.cart.size}
                                        </Typography>
                                    </Box>


                                    <Box sx={{ textAlign: "center", display: { xs: "none", sm: "flex" }, justifyContent: "center", alignItems: "center", gap: 1 }}>
                                        <IconButton disabled={item.cart.qty == item.cart.stock} onClick={() => dispatch(addInCart({ ...item, cart: { ...item.cart, number: 1 } }))} sx={{ border: `1px solid ${theme.palette.secondary.main}` }}>
                                            <AddIcon />
                                        </IconButton>
                                        <Typography>{item.cart.qty}</Typography>
                                        <IconButton disabled={item.cart.qty == 0 && deleteIemWhenQtyZero(item.cart.qty, item)} onClick={() => dispatch(removeInCart(item))} sx={{ border: `1px solid ${theme.palette.secondary.main}` }}>
                                            <RemoveIcon />
                                        </IconButton>
                                    </Box>
                                    <Box sx={{ display: { xs: "none", md: "flex", justifyContent: "center", alignItems: "center" } }}>
                                        <IconButton onClick={() => dispatch(removeFromCart(item))}>
                                            <DeleteIcon sx={{ color: "primary.main" }} />
                                        </IconButton>
                                    </Box>

                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <Typography variant="body2" sx={{ textAlign: "center" }}>
                                            Rs. {item.cart.qty * item.price}
                                        </Typography>
                                    </Box>
                                </Box>
                            )
                        })
                    }
                </Box>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "3fr 5fr" }, gap: { xs: 5, md: 25 }, mt: 3 }}>
                    <Box>
                        <Button size='large' onClick={() => dispatch(clearCart())} variant="outlined" sx={{ backgroundColor: "card.main", color: "primary.main" }}>
                            Clear Cart
                        </Button>
                    </Box>
                    <Box sx={{ color: "secondary.main", display: "flex", gap: 1, flexDirection: "column" }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography>Subtotal</Typography>
                            <Typography variant="body1">
                                Rs. {
                                    subtotal(cartList)
                                }
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography>Shipment charges</Typography>
                            <Typography variant="body1">
                                Rs. {shipmentCost}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography>Grand total</Typography>
                            <Typography variant="body1">
                                Rs. {
                                    subtotal(cartList) + shipmentCost
                                }
                            </Typography>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Button szie="large" onClick={getCheckOut} fullWidth sx={{ backgroundColor: "card.main", color: "secondary.main", py: 2 }} variant='contained' >
                                proceed to checkout
                            </Button>
                        </Box>
                    </Box>

                </Box>
            </Box>

        </Container>

    )
}

export default Cart
