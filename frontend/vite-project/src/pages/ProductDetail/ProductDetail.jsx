import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Container, IconButton, Typography, Button, Drawer } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector, useDispatch } from 'react-redux';
import { addInCart } from '../../redux/cartListSlice';
import { useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SingleProductImagesGallery from '../../components/SingleProductImagesGallery/SingleProductImagesGallery';
import { toggleWishItem } from '../../redux/wishListSlice';
import checkWishItem from '../../utils/checkWishItem';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState()
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [number, setNumber] = useState(0)
  const [currQty, setCurrQty] = useState(0)
  const [cart, setCart] = useState(null)



  const theme = useTheme()

  const navigate = useNavigate()

  const incr = (product) => {
    setNumber((prev) => {
      return prev + 1
    })
  }

  const decr = () => {
    setNumber((prev) => {
      return prev - 1
    })
  }



  const { cartList } = useSelector((state) => {
    return state.cartList
  })
  const { wishList } = useSelector((state) => {
    return state.wishList
  })

  const updateCurrQty = (size) => {
    const exist = cartList.find((item) => {
      return item._id == id && item?.cart?.size == size
    })
    if (exist) {
      setCurrQty(exist.cart.qty)
      return
    }
    setCurrQty(0)
  }


  const dispatch = useDispatch()

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:4000/product/${id}`)
      const data = await response.json()
      if (data.success) {
        setProduct(data.data)
      }
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  if (isLoading) {
    return (
      <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", mt: 6 }}>
        <Typography variant="body1" sx={{ color: "primary.main", textAlign: "center" }}>
          Loading...
        </Typography>
      </Box>
    )
  }
  if (error) {
    return (
      <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", mt: 6 }}>
        <Typography variant="body1" sx={{ color: "primary.main", textAlign: "center" }}>
          {error.message}
        </Typography>
      </Box>
    )
  }
  return (
    <Container sx={{ mt: 6 }}>
      <Box sx={{
        display: "grid", gridTemplateColumns: { sx: "1fr", md: "5fr 6fr" }, gap: { xs: 4, md: 10, lg: 12 }, px: {
          xs: 0, sm: 8, md: 10, lg: 15, xl: 13
        }
      }}>
        {/* <Box component="img" src={product.images[0]} sx={{ width: "100%", height: "auto" }}>  */}
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <SingleProductImagesGallery images={product.images} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant='h6' sx={{ color: "primary.main" }} >{product.title}</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <Typography variant='body1' sx={{ color: "primary.main" }} >PRICE</Typography>
            <Typography variant='h6' sx={{ color: "secondary.main" }} >Rs. {product.price}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <Typography variant='body2' sx={{ color: "primary.main" }} >SHIPING TIME</Typography>
            <Typography variant='body2' sx={{ color: "secondary.main" }} >7-10 BUSINESS DAYS</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <Typography variant='body1' sx={{ color: "primary.main" }} >COLOR</Typography>
            <Typography variant='h6' sx={{ color: "secondary.main", textTransform: "capitalize" }} >{product.color}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <Typography variant='body1' sx={{ color: "primary.main" }} >FABRIC</Typography>
            <Typography variant='h6' sx={{ color: "secondary.main", textTransform: "capitalize" }} >{product.fabric}</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="body1" sx={{ color: "primary.main" }}>
              SIZE
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              {
                product.variants.map((item, index) => {
                  return (
                    <Button size="small" key={index} onClick={() => { setCart({ size: item.size, stock: item.stock }), updateCurrQty(item.size), setNumber(0) }} sx={{ border: `2px solid ${cart?.size == item.size ? theme.palette.secondary.main : theme.palette.primary.main}`, aspectRatio: "", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "10%", minWidth: 50, height: 50, width: 50 }}>
                      <Typography variant='body1' sx={{ color: "secondary.main", fontWeight: "500" }}>{item.size}/<Typography variant="body2" color="initial" sx={{ display: "inline", margin: 0, color: "secondary.main" }}>{item.stock}</Typography></Typography>
                    </Button>
                  )
                })
              }
            </Box>
          </Box>

          {
            (currQty + number == cart?.stock && currQty != 0) && (
              <Typography sx={{ color: "red" }} variant="body2" color="initial">{currQty + number == cart?.stock && currQty != 0 && `you have already added ${currQty} items of this size ${cart?.size}. Only ${cart?.stock} items in this stock and ${cart?.stock - currQty} are left`}</Typography>
            )
          }


          {number >= cart?.stock && (
            <Typography sx={{ color: "red" }} variant="body2" color="initial">{number >= cart?.stock && `Only ${cart?.stock} items of this size ${cart.size} are available.`}</Typography>
          )}


          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="body2" sx={{ color: "primary.main" }}>
              QUANTITY
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", }}>
              <IconButton disabled={!cart || cart?.stock <= currQty + number} onClick={incr} sx={{ border: `2px solid ${theme.palette.primary.main}`, color: "secondary.main" }}>
                <AddIcon />
              </IconButton>
              <Box sx={{ color: "primary.main" }}>
                <Typography variant="h5" sx={{ px: 2 }}>{number}</Typography>
              </Box>
              <IconButton disabled={number == 0 ? true : false} sx={{ border: `2px solid ${theme.palette.primary.main}`, color: "secondary.main" }} onClick={decr}>
                <RemoveIcon />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: { xs: "column" }, gap: 3 }}>
            <Button size="large" fullWidth disabled={!cart || number == 0} onClick={() => { dispatch(addInCart({ ...product, cart: { ...cart, number } })), setCurrQty(number + currQty), setNumber(0) }} sx={{ backgroundColor: "card.main", color: "primary.main", border: `1px solid ${theme.palette.primary.main}` }} >ADD TO CART</Button>
            <Button size="large" onClick={() => dispatch(toggleWishItem(product))} fullWidth sx={{ backgroundColor: "card.main", color: "primary.main", border: `1px solid ${theme.palette.primary.main}` }} endIcon={<FavoriteIcon sx={{ color: checkWishItem(wishList, product._id) ? "red" : "primary.main" }} />}>{checkWishItem(wishList, product._id) ? "Remove from wish list" : "add in wish list"}</Button>
          </Box>

          <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
            <Typography variant="body1" color="initial" sx={{ color: "primary.main" }}>DESCRIPTION</Typography>
            <Box>
              {
                product.description.map((item, index) => {
                  return (
                    <Typography key={index} variant="body2" color="initial" sx={{ color: "primary.main" }}>{item}</Typography>
                  )
                })
              }
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default ProductDetail
