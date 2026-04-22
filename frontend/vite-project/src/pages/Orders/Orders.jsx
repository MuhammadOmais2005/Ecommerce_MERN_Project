import React, { useCallback, useEffect, useState } from 'react'
import { Box, Typography, TextField, IconButton, MenuItem, Icon } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Pagination from '@mui/material/Pagination';
import OrdersFilterDrawer from '../../components/OrdersFilterDrawer/OrdersFilterDrawer';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import dayjs from 'dayjs';
import { debounce } from "lodash"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import OrderUpdateDialog from '../../components/OrderUpdateDialog/OrderUpdateDialog';
import dateDifference from '../../utils/dateDifference';
import OrderFullView from '../../components/OrderFullView/OrderFullView';

const Orders = () => {
  const [ordersData, setOrdersData] = useState("")
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [wholeData, setWholeData] = useState("")
  const [ordersError, setOrdersError] = useState("")

  const [checkList, setCheckList] = useState([])
  const [isAllCheck, setIsAllCheck] = useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(3)


  const [openFilterDrawer, setOpenFilterDrawer] = useState(false)
  const [orderStatus, setOrderStatus] = useState("")
  const [payementStatus, setPayementStatus] = useState({
    Pending: false,
    Completed: false,
    Failed: false,
    Refunded: false,
  })
  const [startDate, setStartDate] = useState(dayjs("2026-01-01")); // default today
  const [endDate, setEndDate] = useState(dayjs()); // default +7 days
  const [sort, setSort] = useState("")
  const [search, setSearch] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [showOrderUpdateDialog, setshowOrderUpdateDialog] = useState(false)
  const [singleOrderData, setSingleOrderData] = useState("")
  const [grandPrice, setGrandPrice] = useState(["", ""])
  const [showFullOrder, setShowFullOrder] = useState(false)
  const [isSingleOrderDeleted, setIsSingleOrderDeleted] = useState("")
  const [isSingleOrderUpdated, setIsSingleOrderUpdated] = useState("")
  


  const handleSearch = useCallback(debounce((e) => {
    setSearch(e.target.value)
  }, 200, { leading: false, trailing: true }), [])

  const fetchOrders = async (searchParams) => {
    try {
      const response = await fetch(`http://localhost:4000/orders/?${searchParams}`)
      if (response.ok) {
        const result = await response.json()
        console.log(result)
        if (result.success) {
          setWholeData(result.data)
          setOrdersData(result.data.docs)
          console.log(result.data.docs)
          return
        }
        setOrdersError(result.message)
      }
    } catch (err) {
      console.log(err)
      setOrdersError(err.message || "Somethig went wrong.")
    } finally {
      setOrdersLoading(false)
    }
  }
  useEffect(() => {
    const searchParams = new URLSearchParams()
    if (page) {
      searchParams.append("page", page)
    }
    if (limit) {
      searchParams.append("limit", limit)
    }
    if (orderStatus) {
      searchParams.append("orderStatus", orderStatus)
    }

    if (payementStatus["Pending"]) {
      searchParams.append("paymentStatus", "Pending")
    }
    if (payementStatus["Completed"]) {
      searchParams.append("paymentStatus", "Completed")
    }
    if (payementStatus["Failed"]) {
      searchParams.append("paymentStatus", "Failed")
    }
    if (payementStatus["Refunded"]) {
      searchParams.append("paymentStatus", "Refunded")
    }
    if (startDate) {
      searchParams.append("startDate", startDate)
    }
    if (endDate) {
      searchParams.append("endDate", endDate)
    }
    if (sort) {
      searchParams.append("sort", sort)
    }
    if (search) {
      searchParams.append("search", search)
    }

    if(grandPrice[0]){
      searchParams.append("minGrandPrice", grandPrice[0])
      
    }

    if(grandPrice[1]){
      searchParams.append("maxGrandPrice", grandPrice[1])
    }

    fetchOrders(searchParams)
  }, [page, limit, orderStatus, payementStatus, startDate, endDate, sort, search, grandPrice, isSingleOrderDeleted, isSingleOrderUpdated])


  useEffect(() => {
    setPage(1)
    setCheckList([])
    setIsAllCheck(false)
  }, [limit, orderStatus, payementStatus, startDate, endDate, sort, search, orderStatus])


  const handleCheck = (id) => {
    const allCheckList = ordersData?.map((item) => {
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
    const allCheckList = ordersData?.map((item) => {
      return item._id
    })
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

  const handlePage = (e, value) => {
    setPage(value)
    setCheckList([])
    setIsAllCheck(false)
  }



    const singleOrderDelete = async (order) => {
    try {
      const response = await fetch(`http://localhost:4000/order-delete/${order._id}`,
        {
          method: "DELETE",
        }
      )
      if (response.ok) {
        const result = await response.json()
        console.log(result)
        if (result.success) {
          alert("Delete successfully.")
          setIsSingleOrderDeleted(order._id)
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


  if (ordersLoading) {
    return (
      <Box>
        <Typography variant="body1" color="initial">Loading...</Typography>
      </Box>
    )
  }
  if (ordersError) {
    return (
      <Box>
        <Typography variant="body1" color="initial">{ordersError}</Typography>
      </Box>
    )
  }
  return (
    <Box sx={{mt: {xs: 2, sm: 3, lg: 4} }}>


        <Typography variant="h4" sx={{color: "primary.main", fontWeight: "500", mb: 4}}>
          ORDERS
        </Typography>


      <Box sx={{ display: "flex", alignItems: {xs: "", lg: "center"}, flexDirection: {xs: "column", lg: "row"}, justifyContent: "space-between", gap: {xs: 1, lg: ""}, backgroundColor: "" }}>


        <Box sx={{ display: "flex", alignItems: {xs: "start", lg: "center"}, justifyContent: {xs: "space-between", lg: "flex-start" }, gap: {xs: "", lg: 3}, flexDirection: {xs: "row", lg: "row"} }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => setOpenFilterDrawer(true)}>
              <FilterAltIcon fontSize='large' sx={{color: "primary.main"}} />
            </IconButton>
            <Typography variant="body1"  onClick={() => setOpenFilterDrawer(true)} sx={{ fontSize: { lg: "20px" }, display: {xs: "none", sm: "block"}, cursor: "pointer", color: "primary.main" }}>Filter</Typography>
          </Box>
          <Box>
            <TextField
              
              sx={{ width: { xs: "160px", sm: "190px", md: "200px", lg: "200px" } }}
              select
              label="Sorting"
              value={sort}
              onChange={(e) => setSort(e.target.value)}

            >
              {
                [{ value: "new", label: "Newest first" }, { value: "old", label: "Oldest first" }, { value: "low-price", label: "Lowest grand total" }, { value: "high-price", label: "Highest grand total" }, { value: "asc-fullName", label: "A-Z full name" }, { value: "desc-fullName", label: "Z-A full name" }, { value: "asc-orderStatus", label: "A-Z Order Status" }, { value: "desc-orderStatus", label: "Z-A Order Status" }, { value: "asc-paymentStatus", label: "A-Z payment status" }, { value: "desc-paymentStatus", label: "Z-A payment status" }].map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                  )
                })
              }
            </TextField>
          </Box>
        </Box>

        <Box>
          <TextField
            type='search'
            label="Search"
            sx={{ width: { xs: "100%", sm: "200px", md: "250px", lg: "250px" } }}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value),
                handleSearch(e)
            }}

          />
        </Box>



      </Box>





      <Box sx={{ display: "flex", justifyContent: "right", alignItems: "center", my: { xs: 3, lg: 2 } }}>
        {
          checkList.length > 1 && (
            <Box>
              <TextField
                label="Bulk operations"
                select
                sx={{ width: { xs: "150px", sm: '170px', md: '190px', lg: "230px" } }}


              >
                {["Bulk Update", "Bulk Delete"].map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                  )
                })}
              </TextField>
            </Box>
          )
        }

      </Box>



      <Box>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
              sx={{
                  // '&:last-child td, &:last-child th': {
                  //   borderBottom: 'none',
                  // },
                  height: "70px",

                  '& th': {
                    borderBottom: 2,
                    borderTop: 2,
                    borderColor: 'divider',
                  }
                }}>
                <TableCell align="center" padding='checkbox'>
                  <Checkbox checked={isAllCheck} onChange={handleAllCheck} />
                </TableCell>
                <TableCell>FullName</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Grand Price</TableCell>
                <TableCell align="right">Order Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            {
              ordersData.length ? (
                <TableBody>
              {ordersData.map((row) => (
                <TableRow
                  key={row.name}
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
                  <TableCell align="center" padding='checkbox'>
                    <Checkbox checked={checkList.includes(row._id)} onChange={() => handleCheck(row._id)} />
                  </TableCell>
                  <TableCell component="td" scope="row"  sx={{textWrap: "nowrap"}}>
                    {row.shippingAddress.fullName}
                  </TableCell>
                  <TableCell component="td" scope="row">
                    {row.shippingAddress.email}
                  </TableCell>
                  <TableCell component="td" scope="row">
                    {row.shippingAddress.phone}
                  </TableCell>
                  <TableCell component="td" scope="row" sx={{textWrap: "nowrap"}}>
                    {dateDifference(row.createdAt)}
                  </TableCell>
                  <TableCell align="right">{row.shippingAddress.state}/{row.shippingAddress.country}</TableCell>
                  <TableCell align="right">{row.grandPrice}</TableCell>
                  <TableCell align="right">{row.orderStatus}</TableCell>
                  <TableCell align="center" sx={{ display: "flex", flexWrap: "nowrap", justifyContent: "center" }}>
                    <IconButton onClick={()=>{setShowFullOrder(true), setSingleOrderData(row)}}>
                      <FullscreenIcon />
                    </IconButton>
                    <IconButton onClick={() => { setshowOrderUpdateDialog(true); setSingleOrderData(row) }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={()=>singleOrderDelete(row)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
              ): ("")
            }
          </Table>
          {
            ordersData?.length > 0? (""): (
              <Typography sx={{textAlign: "center", my: 2, color: "primary.main"}} variant="body1">
                No item was found
              </Typography>
            )
          }
        </TableContainer>
      </Box>

      {
        ordersData.length>0? (
          <Box sx={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
        <TextField
          type="number"
          value={limit}
          label="Limit" 
          margin="normal" 
          size=""
          sx={{width: {xs: "90px", lg: "120px"}}}
          inputProps={{
            min: 1,
            max: wholeData.totalDocs,
            step: 1,

          }}
          onChange={(e) => setLimit(e.target.value)}

        />
      </Box>
        ): ("")
      }

      {
        ordersData.length>0 ? (
          <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", mt: {xs: 2, lg: 3}}}>
        <Pagination count={wholeData.totalPages} page={page} onChange={handlePage} showFirstButton showLastButton />
      </Box>
        ): ("")
      }

      <OrdersFilterDrawer open={openFilterDrawer} setOpen={setOpenFilterDrawer} orderStatus={orderStatus} setOrderStatus={setOrderStatus} payementStatus={payementStatus} setPayementStatus={setPayementStatus} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} grandPrice={grandPrice} setGrandPrice={setGrandPrice} />

      <OrderUpdateDialog showOrderUpdateDialog={showOrderUpdateDialog} setshowOrderUpdateDialog={setshowOrderUpdateDialog} singleOrderData={singleOrderData} setSingleOrderData={setSingleOrderData} setIsSingleOrderUpdated={setIsSingleOrderUpdated}/>

      <OrderFullView data={singleOrderData} open={showFullOrder} setOpen={setShowFullOrder}/>
    </Box>
  )
}

export default Orders
