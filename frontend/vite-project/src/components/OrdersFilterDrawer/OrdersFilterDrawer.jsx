import React, { useCallback, useEffect, useState } from 'react'
import Drawer from '@mui/material/Drawer'
import { Box, IconButton, Typography } from '@mui/material'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
import Slider from '@mui/material/Slider';
import { debounce, set } from "lodash"


const OrdersFilterDrawer = ({ open, setOpen, orderStatus, setOrderStatus, payementStatus, setPayementStatus, startDate, endDate, setStartDate, setEndDate, grandPrice, setGrandPrice }) => {

    const [debounceGrandPrice, setDebounceGrandPrice] = useState(["", ""])
    const [loadingFilter, setLoadingFilter] = useState(true)
    const [errorFilter, setErrorFilter] = useState("")
    const [dataFilter, setDateFilter] = useState('')

    const handlePaymentStatus = (e, item) => {
        setPayementStatus((prev) => ({ ...prev, [item]: !prev[item] }))
    }

    const handleDebouncePrice = useCallback(debounce((value) => {
        setGrandPrice(value)
    }, 300, { trailing: true, leading: false }), [])

    const fetchFilterData = async () => {
        try {
            const response = await fetch("http://localhost:4000/orders-filter")
            if (response.ok) {
                const result = await response.json()
                if (result.success) {
                    setDateFilter(result.data)
                    setDebounceGrandPrice([result.data.minPrice, result.data.maxPrice])
                    return
                }
                setErrorFilter(result.message)
                return
            }
            setErrorFilter("Something went wrong.")
        } catch (err) {
            console.log(err)
            setErrorFilter(err.message)
        } finally {
            setLoadingFilter(false)
        }
    }

    useEffect(() => {
        fetchFilterData()
    }, [])
    if (loadingFilter) {
        return (
            <Box>
                <Typography variant="body1" sx={{ color: "primary.main" }}>
                    Loading...
                </Typography>
            </Box>
        )
    }
    if (errorFilter) {
        return (
            <Box>
                <Typography variant="body1" sx={{ color: "primary.main" }}>
                    {errorFilter}
                </Typography>
            </Box>
        )
    }
    return (
        <Drawer
            variant="temporary"
            anchor="right"
            open={open}
            onClose={() => setOpen(false)}

        >
            <Box sx={{ width: { xs: "250px", sm: "300px" }, display: "flex", flexDirection: "column", gap: 4, px: { xs: 3 }, py: { xs: 4 } }}>




                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography variant="body1" sx={{ color: "primary.main", cursor: "pointer" }} onClick={() => { setOrderStatus(""), setPayementStatus(""), setStartDate(dayjs("2026-01-01")), setEndDate(dayjs()), setGrandPrice([dataFilter?.minPrice, dataFilter?.maxPrice]), setDebounceGrandPrice([dataFilter?.minPrice, dataFilter?.maxPrice]) }}>Clear all</Typography>
                    {/* <IconButton onClick={()=>setOpen(false)}> */}
                    <CloseIcon sx={{ color: "primary.main", cursor: "pointer" }} onClick={() => setOpen(false)} />
                    {/* </IconButton> */}
                </Box>



                <Box>
                    <FormControl fullWidth>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: { xs: 2 } }}>
                            <FormLabel sx={{ color: "primary.main" }} >Grand Price</FormLabel>
                            <Typography variant="body1" sx={{ color: "primary.main", cursor: "pointer" }} onClick={() => { setGrandPrice([dataFilter?.minPrice, dataFilter?.maxPrice]), setDebounceGrandPrice([dataFilter?.minPrice, dataFilter?.maxPrice]) }}>Clear</Typography>
                        </Box>
                        <Box sx={{px: {xs: 1}}}>
                            <Slider disableSwap fullWidth valueLabelDisplay="auto" value={debounceGrandPrice} min={dataFilter?.minPrice} max={dataFilter?.maxPrice} onChange={(e, newValue) => { setDebounceGrandPrice(newValue), handleDebouncePrice(newValue) }} />
                        </Box>
                    </FormControl>
                </Box>



                {/* Order Status */}

                <FormControl>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: { xs: 2 } }}>
                        <FormLabel sx={{ color: "primary.main" }} >Order Status</FormLabel>
                        <Typography variant="body1" sx={{ color: "primary.main", cursor: "pointer" }} onClick={() => setOrderStatus("")}>Clear</Typography>
                    </Box>
                    <RadioGroup
                        value={orderStatus}
                        onChange={(e) => { setOrderStatus(e.target.value) }}
                    >
                        {
                            ["Pending", "Paid", "Processing", "Shipped", "Out for Delivery", "Delivered", "Cancelled", "Returned",].map((item) => {
                                return (
                                    <FormControlLabel value={item} control={<Radio />} label={item} />
                                )
                            })
                        }
                    </RadioGroup>
                </FormControl>



                {/* Payment Status */}


                <FormControl>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: { xs: 2 } }}>
                        <FormLabel sx={{ color: "primary.main" }} >Payment Status</FormLabel>
                        <Typography variant="body1" sx={{ color: "primary.main", cursor: "pointer" }} onClick={() => setPayementStatus("")}>Clear</Typography>
                    </Box>
                    {
                        ["Pending", "Completed", "Failed", "Refunded"].map((item) => {
                            return (
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={payementStatus[item]} onChange={(e) => handlePaymentStatus(e, item)} />
                                    }
                                    label={item}
                                />
                            )
                        })
                    }
                </FormControl>




                {/* Date Range */}

                <FormControl>

                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: { xs: 2 } }}>
                        <FormLabel sx={{ color: "primary.main" }}>Date Range</FormLabel>
                        <Typography variant="body1" sx={{ color: "primary.main", cursor: "pointer" }} onClick={() => { setStartDate(dayjs("2026-01-01")), setEndDate(dayjs()) }}>Clear</Typography>
                    </Box>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <DatePicker
                                    label="Start date"
                                    value={startDate}
                                    maxDate={dayjs()}
                                    onChange={(newValue) => setStartDate(newValue)}
                                />
                                <DatePicker
                                    label="End date"
                                    value={endDate}
                                    minDate={startDate} // cannot pick before start date
                                    maxDate={dayjs()}
                                    onChange={(newValue) => setEndDate(newValue)}
                                />
                            </Box>
                        </DemoContainer>

                    </LocalizationProvider>

                </FormControl>
            </Box>

        </Drawer >
    )
}

export default OrdersFilterDrawer
