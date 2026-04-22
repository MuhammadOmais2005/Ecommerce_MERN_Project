import React, { useCallback, useEffect, useState } from 'react'
import { Box, Container, Button, Typography, IconButton, TextField } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector, useDispatch } from 'react-redux';
import checkWishItem from '../../utils/checkWishItem';
import { toggleWishItem } from '../../redux/wishListSlice';
import { useNavigate } from 'react-router-dom';
import FilterDrawer from '../../components/Filter/FilterDrawer';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortProducts from '../SortProducts/SortProducts';
import { Pagination, InputAdornment } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash"

const ProductList = ({ category, limit }) => {

    const { wishList } = useSelector((state) => {
        return state.wishList
    })

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [open, setOpen] = useState(false)

    const onClose = () => {
        setOpen(false)
    }

    const [size, setSize] = useState("")

    const [page, setPage] = useState(1)
    const [products, setProducts] = useState(null)
    const [isError, setIsError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [price, setPrice] = useState([null, null])
    const [sort, setSort] = useState("")
    const [color, setColor] = useState("")
    const [kid, setKid] = useState("")
    const [search, setSearch] = useState("") 
    const [debounceSearch, setDebounceSearch] = useState("")

    const fetchProducts = async (params) => {
        try {
            const data = await fetch(`http://localhost:4000/products/?${params}`)
            const products = await data.json()
            setProducts(products)
            console.log(products)
        } catch (err) {
            setIsError(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const currentFilter = {}
        currentFilter["category"] = category

        if (category == "kids" && kid) {
            currentFilter["kid"] = kid
        }

        currentFilter["page"] = page
        currentFilter["limit"] = limit
        if (price[0]) {
            currentFilter["minPrice"] = price[0]
        }
        if (price[1]) {
            currentFilter["maxPrice"] = price[1]
        }
        if (size) {
            console.log(size)
            currentFilter["size"] = size
        }
        if (sort) {
            currentFilter["sort"] = sort
        }
        if (color) {
            currentFilter["color"] = color
        }
        if (search.trim()) {
            currentFilter["search"] = search.trim()
        }
        const params = new URLSearchParams(currentFilter);
        fetchProducts(params)
    }, [page, price, size, sort, color, kid, search]); 

    // useEffect(()=>{
    //     const debouncedSearch = debounce(()=>{
    //         setSearch(debounceSearch)
    //     }, 5000, {leading: false, trailing: true}) 
    //     debouncedSearch()
    //     return ()=>debouncedSearch.cancel()
    // }, [debounceSearch]) 


    const debouncedSearch = useCallback(
        debounce((value)=>{
            setSearch(value)
        }, 5000, {leading: false, trailing: true})
        , []); 

    useEffect(() => {
        return () => {
            debouncedSearch.cancel()
        }
    }, [debouncedSearch])

    // useEffect(() => {
    //     const debouncefilter = debounce(() => {
    //         const currentFilter = {}
    //         currentFilter["category"] = category

    //         if (category == "kids" && kid) {
    //             currentFilter["kid"] = kid
    //         }

    //         currentFilter["page"] = page
    //         currentFilter["limit"] = limit
    //         if (price[0]) {
    //             currentFilter["minPrice"] = price[0]
    //         }
    //         if (price[1]) {
    //             currentFilter["maxPrice"] = price[1]
    //         }
    //         if (size) {
    //             console.log(size)
    //             currentFilter["size"] = size
    //         }
    //         if (sort) {
    //             currentFilter["sort"] = sort
    //         }
    //         if (color) {
    //             currentFilter["color"] = color
    //         }
    //         if (search.trim()) {
    //             currentFilter["search"] = search.trim()
    //         }
    //         const params = new URLSearchParams(currentFilter);
    //         fetchProducts(params)
    //     }, 1000) 

    //     return ()=>debouncefilter.cancel()
    // }, [page, price, size, sort, color, kid, search]);


    if (isLoading) {
        return (
            <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", mt: 6 }}>
                <Typography variant="body1" sx={{ color: "primary.main", textAlign: "center" }}>
                    Loading...
                </Typography>
            </Box>
        )
    }
    if (isError) {
        return (
            <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", mt: 6 }}>
                <Typography variant="body1" sx={{ color: "primary.main", textAlign: "center" }}>
                    {isError.message}
                </Typography>
            </Box>
        )
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 6 }}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                <TextField
                    fullWidth
                    placeholder="Search..."
                    variant="outlined"
                    size="small"
                    value={debounceSearch}
                    onChange={(e) =>{setDebounceSearch(e.target.value.trim()), debouncedSearch(e.target.value.trim())}}
                    sx={{ display: { xs: "block", md: "none" }, mb: 2 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton type="submit">
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "3fr 2fr" } }}>
                <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton aria-label="" onClick={() => setOpen(!open)}>
                            <FilterAltIcon fontSize="large" sx={{ color: "secondary.main" }} />
                        </IconButton>
                        <Typography onClick={() => setOpen(!open)} variant="h6" sx={{ color: "secondary.main", fontWidth: "normal", display: { xs: "none", sm: "block" }, cursor: "pointer" }}>
                            Filter
                        </Typography>
                    </Box>
                    <Box sx={{ display: { xs: "none", md: "block" } }}>
                        <SortProducts sort={sort} setSort={setSort} />
                    </Box>
                </Box>
                <Box sx={{ justifyContent: "flex-end", alignItems: "center", width: "100%", display: { xs: "none", md: "flex" } }}>
                    <TextField
                        placeholder="Search..."
                        variant="outlined"
                        size="small"
                        value={debounceSearch}
                        onChange={(e) =>{setDebounceSearch(e.target.value.trim()), debouncedSearch(e.target.value.trim())}}
                        sx={{ width: 300 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton type="submit">
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Box sx={{ display: { xs: "block", md: "none" } }}>
                    <SortProducts sort={sort} setSort={setSort} />
                </Box>

            </Box>
            <Box>
                {products.data.docs.length == 0 ? (
                    <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", mt: 6 }}>
                        <Typography variant="body1" sx={{ color: "primary.main", textAlign: "center" }}>
                            Not Found.
                        </Typography>
                    </Box>
                ) : (
                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }, gap: { xs: 1, sm: 2, md: 2 } }}>
                        {
                            products.data.docs.map((product, index) => {
                                return (
                                    <Box key={index} sx={{ display: "flex", flexDirection: "column" }}>
                                        <Box sx={{ position: "relative" }}>
                                            <Box src={product.images[0]} component="img" sx={{ width: "100%", height: "auto" }}></Box>

                                            <IconButton sx={{ position: "absolute", top: "4%", right: "4%" }} onClick={() => dispatch(toggleWishItem(product))} >
                                                <FavoriteIcon sx={{ color: checkWishItem(wishList, product._id) ? "red" : "card.main" }} fontSize='large' />
                                            </IconButton>
                                        </Box>
                                        <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
                                            <Typography variant="body1" sx={{
                                                color: "primary.main", display: '-webkit-box',
                                                WebkitLineClamp: 1,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>{product.title}</Typography>
                                            <Typography variant="body1" sx={{ color: "secondary.main", fontWeight: "bold" }}>Rs. {product.price}</Typography>
                                            <Button onClick={() => navigate(`/product-detail/${product._id}`)} fullWidth sx={{ backgroundColor: "card.main", color: "primary.main" }}>
                                                View Details
                                            </Button>
                                        </Box>

                                    </Box>
                                )
                            })
                        }
                    </Box>

                )}
            </Box>

            <FilterDrawer open={open} onClose={onClose} setOpen={setOpen} price={price} setPrice={setPrice} size={size} setSize={setSize} category={category} color={color} setColor={setColor} kid={kid} setKid={setKid} setPage={setPage} setSearch={setSearch} />

            <Box sx={{ display: "flex", justifyContent: "center", my: 6 }}>
                {products.data.docs.length == 0 ? ("") : (
                    <Pagination size="large" page={page} count={products.data.totalPages} onChange={(e, value) => setPage(value)} variant="outlined" shape="rounded" />
                )}
            </Box>

        </Container>
    )
}

export default ProductList
