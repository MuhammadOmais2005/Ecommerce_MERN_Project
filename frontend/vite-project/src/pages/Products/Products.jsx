import React, { useEffect } from 'react'
import { Box, Typography, Button, IconButton, TextField, MenuItem, Container, FormControlLabel, Checkbox } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react'
import AddProductDialog from '../../components/AddProductDialog/AddProductDialog'
import EditProductDialog from '../../components/EditProductDialog/EditProductDialog'
import DashboardFilterDrawer from '../../components/DashboardFilterDrawer/DashboardFilterDrawer';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Pagination from '@mui/material/Pagination';
import ProductFullView from '../../components/ProductFullView/ProductFullView';
import { set } from 'lodash';

const Products = () => {
  const [openAdd, setOpenAdd] = useState(false)
  const onCloseAdd = () => {
    setOpenAdd(false)
  }
  const [openEdit, setOpenEdit] = useState(false)
  const onCloseEdit = () => {
    setEdit(false)
  }

  const [products, setProducts] = useState("");
  const [isProductsLoading, setIsProductsLoading] = useState(true)
  const [isProudctsError, setIsProductsError] = useState("")
  const [originalData, setOriginalData] = useState("")


  const [filter, setFilter] = useState("")
  const [isFilterLoading, setIsFilterLoading] = useState(true)
  const [isFilterError, setIsFilterError] = useState("")

  const [product, setProduct] = useState("");
  const [isProductLoading, setIsProductLoading] = useState(true)
  const [isProductError, setIsProductError] = useState("")


  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isProductViewOpen, setIsProductViewOpen] = useState(false)
  const [price, setPrice] = useState([null, null])
  const [color, setColor] = useState("")
  const [category, setCategory] = useState("")
  const [fabric, setFabric] = useState("")
  const [size, setSize] = useState("")
  const [currPrice, setCurrPrice] = useState([null, null])
  const [sort, setSort] = useState()
  const [gender, setGender] = useState("")
  const [outOfStock, setOutOfStock] = useState(false)
  const [limit, setLimit] = useState(3)
  const [page, setPage] = useState(1)
  const [singleProduct, setSingleProduct] = useState("")
  const [isSingleProductDeleted, setIsSingleProductDeleted] = useState("")
  const [isSingleProductUpdated, setIsSingleProductUpdated] = useState("")
  const [checkList, setCheckList] = useState([])
  const [isAllCheck, setIsAllCheck] = useState(false)



  const fetchProducts = async (searchParams) => {
    try {
      const response = await fetch(`http://localhost:4000/products/?${searchParams}`)
      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          setProducts(result.data.docs)
          setOriginalData(result.data)
          console.log(result.data.docs)
        }
      }
    } catch (err) {
      console.log(err)
      setIsProductsError(err)
    } finally {
      setIsProductsLoading(false)
    }
  }

  const fetchFilter = async (searchParams) => {
    try {
      const response = await fetch(`http://localhost:4000/filter/?${searchParams}`)
      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          setFilter(result.data)
          setPrice([result.data.price.min, result.data.price.max])
          setCurrPrice([result.data.price.min, result.data.price.max])
          console.log(result.data)
        }
      }
    } catch (err) {
      setIsFilterError(err)
      console.log(err)
    } finally {
      setIsFilterLoading(false)
    }
  }

  const fetchProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/product/${id}`)
      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          setProduct(result.data)
          console.log(result.data)
        }
      }
    } catch (err) {
      setIsProductError(err)
      console.log(err)
    } finally {
      setIsProductLoading(false)
    }
  }

  const clearAllDrawerFilter = () => {
    setSize("")
    setPrice([null, null])
    setCurrPrice([null, null])
    setColor("")
    setFabric("")
  }

  useEffect(() => {
    const searchParams = { limit: 10 }
    if (!!price[0]) {
      searchParams["minPrice"] = Number(price[0])
    }
    if (!!price[1]) {
      searchParams["maxPrice"] = Number(price[1])
    }
    if (color) {
      searchParams["color"] = color
    }
    if (fabric) {
      searchParams["fabric"] = fabric
    }
    if (category) {
      searchParams["category"] = category
    }
    if (size) {
      searchParams["size"] = size
    }
    if (sort) {
      searchParams["sort"] = sort
    }
    if (gender && category == "kids") {
      searchParams["kid"] = gender
    }
    if (outOfStock) {
      searchParams["outOfStock"] = outOfStock
    }
    if (limit) {
      searchParams["limit"] = limit
    }
    if (page) {
      searchParams["page"] = page
    }

    console.log(searchParams)
    // console.log(price)

    fetchProducts(new URLSearchParams(searchParams))
  }, [price, fabric, color, category, size, sort, gender, outOfStock, limit, page, isSingleProductDeleted, isSingleProductUpdated]);

  useEffect(() => {
    clearAllDrawerFilter();
    const currentParams = {}
    if (category) {
      currentParams["category"] = category
    }
    if (category != "kids") {
      setGender("")
    }
    if (gender && category == "kids") {
      currentParams["kid"] = gender
    }
    fetchFilter(new URLSearchParams(currentParams))
  }, [category, gender])



  useEffect(() => {
    setPage(1)
    setCheckList([])
    setIsAllCheck(false)
  }, [limit, price, fabric, color, category, size, sort, gender, outOfStock])


  const handleCheck = (id) => {
    const allCheckList = products?.map((item) => {
      return item._id
    });
    if (checkList.includes(id)) {
      const updatedCheckList = checkList.filter(item => item !== id);
      setIsAllCheck(false)
      setCheckList(updatedCheckList);
    } else {
      const newCheckList = [...checkList, id]
      const isAllChecked = allCheckList.every((item) => {
        return newCheckList.includes(item)
      })
      if (isAllChecked) {
        setIsAllCheck(true)
      }
      setCheckList(newCheckList);
    }

  };


  const handleAllCheck = () => {
    const allCheckList = products?.map((item) => {
      return item._id
    });
    console.log(allCheckList)
    const isAllChecked = allCheckList.every((item) => {
      return [...checkList].includes(item)
    })
    if (isAllChecked) {
      setCheckList([])
      setIsAllCheck(false)
      return
    } else {
      setCheckList([...allCheckList])
      setIsAllCheck(true)
    }
  }



  const singleProductDelete = async (product) => {
    try {
      const response = await fetch(`http://localhost:4000/product/${product._id}`,
        {
          method: "DELETE",
          body: JSON.stringify(product)
        }
      )
      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          alert("Delete successfully.")
          setIsSingleProductDeleted(product._id)
          return
        }
        alert(result.message)
        return
      }
      alert("Delete Failed.")
    } catch (err) {
      console.log(err)
      alert(err.message)
    }
  }

  if (isProductsLoading) {
    return (
      <Box>
        <Typography variant="h5" color="initial">
          Loading...
        </Typography>
      </Box>
    )
  }
  if (isProudctsError) {
    return (
      <Box>
        <Typography variant="h5" color="initial">
          {isProudctsError.message}
        </Typography>
      </Box>
    )
  }
  return (
    // <Container maxWidth="xl">
    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 2, md: 3, lg: 4 }, overflow: "hidden", width: "100%", mt: { xs: 2, sm: 3, lg: 4 } }}>
      <Typography variant="h4" sx={{ color: "primary.main", fontWeight: "500" }}>
        PRODUCTS
      </Typography>


      <Box sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "space-between" } }}>
        {/* Filter and Sorting */}

        <Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => setDrawerOpen(true)}>
              <FilterAltIcon fontSize='large' sx={{ color: "primary.main" }} />
            </IconButton>
            <Typography onClick={() => setDrawerOpen(true)} variant="h5" sx={{ color: "primary.main" }}>
              Filter
            </Typography>
          </Box>
        </Box>


        {/* Sort */}

        <Box>
          <TextField
            select
            id=""
            label="Sorting"
            size="small"
            sx={{ width: { xs: "150px", lg: "300px" } }}
            value={sort}
            onChange={(e) => setSort(e.target.value)}

          >
            <MenuItem value="">Sorting</MenuItem>
            {
              [{ label: "Sort by price (low to high)", value: "price_asc" }, { label: "Sort by price (high to low)", value: "price_desc" }, { label: "Sort by highest rating", value: "rating" }, { label: "Sort by newest", value: "newest" }, { label: "Sort by Oldest", value: "oldest" },].map((sort) => {
                return (
                  <MenuItem value={sort.value}>{sort.label}</MenuItem>
                )
              })
            }
          </TextField>
        </Box>


      </Box>



      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

        {/* Category */}

        <Box>
          <TextField
            select
            id=""
            label="Category"
            size="small"
            sx={{ width: { xs: "120px", lg: "300px" } }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}

          >
            <MenuItem value="">Select Category</MenuItem>
            {
              ["men", "women", "kids"].map((category) => {
                return (
                  <MenuItem value={category}>{category}</MenuItem>
                )
              })
            }
          </TextField>
        </Box>






        {/* Gender */}

        {
          category == "kids" && (
            <Box>
              <TextField
                select
                id=""
                label="Gender"
                size="small"
                sx={{ width: { xs: "95px", lg: "300px" } }}
                value={gender}
                onChange={(e) => setGender(e.target.value)}

              >
                <MenuItem value="">Both</MenuItem>
                {
                  [{ label: "Boy", value: "boy" }, { label: "Girl", value: "girl" }].map((gender) => {
                    return (
                      <MenuItem value={gender.value}>{gender.label}</MenuItem>
                    )
                  })
                }
              </TextField>
            </Box>
          )
        }




        <Box>
          <FormControlLabel
            label="Out of stock"
            control={
              <Checkbox
                value={outOfStock}
                onChange={() => setOutOfStock((prev) => (!prev))}
                color="primary"
              />
            }
          />
        </Box>


      </Box>

      {/* Add new prouduct */}

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
        <Button size="large" variant='contained' onClick={() => setOpenAdd(true)} endIcon={<AddIcon />}>
          Add
        </Button>
      </Box>


      {/* Table  */}
      <Box>
        <TableContainer>
          <Table sx={{ minWidth: "1000px" }} size="small" >
            <TableHead>
              <TableRow
                sx={{
                  // '&:last-child td, &:last-child th': {
                  //   borderBottom: 'none',
                  // },
                  height: "70px",
                  '& td': {
                    borderBottom: 2,
                    borderTop: 2,
                    borderColor: 'divider',
                  },
                  '& th': {
                    borderBottom: 2,
                    borderTop: 2,
                    borderColor: 'divider',
                  }
                }}
              >
                <TableCell padding='checkbox' align="left">
                  <Checkbox checked={isAllCheck} onChange={handleAllCheck} />
                </TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Color</TableCell>
                <TableCell align="left">Fabric</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((product, index) => (
                <TableRow
                  key={product.id}
                  hover
                  sx={{
                    '&:last-child td, &:last-child th': {
                      borderBottom: 'none',
                    },
                    '& td': {
                      borderBottom: 2,
                      borderColor: 'divider',
                    },
                    '& th': {
                      borderBottom: 2,
                      borderColor: 'divider',
                    }
                  }}
                >
                  <TableCell padding='checkbox'>
                    <Checkbox checked={checkList.includes(product._id)} onChange={() => handleCheck(product._id)} component="th" scope="row" />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {product.title}
                  </TableCell>
                  <TableCell align="left">{product.category}</TableCell>
                  <TableCell align="left">{product.color}</TableCell>
                  <TableCell align="left">{product.fabric}</TableCell>
                  <TableCell align="left">{product.price}</TableCell>
                  <TableCell align="center">
                    <Box>
                      <IconButton onClick={() => { fetchProduct(product._id), setOpenEdit(true) }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => { singleProductDelete(product) }}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton>
                        <FullscreenIcon onClick={() => { setIsProductViewOpen(true), setSingleProduct(product) }} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {
        products.length <= 0 ? (
          <Box sx={{ mt: { xs: 2, lg: 3 } }}>
            <Typography variant="body1" sx={{ color: "primary.main", textAlign: "center" }}>
              No result found
            </Typography>
          </Box>
        ) : ""
      }



      {
        products.length > 0 ? (
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            <TextField
              type="number"
              value={limit}
              label="Limit"
              margin="normal"
              size=""
              sx={{ width: { xs: "90px", lg: "120px" } }}
              inputProps={{
                min: 1,
                max: originalData.totalDocs,
                step: 1,

              }}
              onChange={(e) => { setLimit(e.target.value), setCheckList([]), setIsAllCheck(false) }}

            />
          </Box>
        ) : ("")
      }

      {
        products.length > 0 ? (
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: { xs: 2, lg: 3 } }}>
            <Pagination count={originalData.totalPages} page={page} onChange={(e, value) => setPage(value)} showFirstButton showLastButton />
          </Box>
        ) : ("")
      }

      <AddProductDialog openAdd={openAdd} onCloseAdd={onCloseAdd} setOpenAdd={setOpenAdd} setIsSingleProductUpdated={setIsSingleProductUpdated} />
      <EditProductDialog product={product} isProductLoading={isProductLoading} isProductError={isProductError} openEdit={openEdit} onCloseEdit={onCloseEdit} setOpenEdit={setOpenEdit} setIsSingleProductUpdated={setIsSingleProductUpdated} />
      <ProductFullView open={isProductViewOpen} setOpen={setIsProductViewOpen} data={singleProduct} />
      <DashboardFilterDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} price={price} setPrice={setPrice} filter={filter} isFilterLoading={isFilterLoading} isFilterError={isFilterError} color={color} setColor={setColor} fabric={fabric} setFabric={setFabric} size={size} setSize={setSize} currPrice={currPrice} setCurrPrice={setCurrPrice} />
    </Box>


    // </Container>

  )
}

export default Products
