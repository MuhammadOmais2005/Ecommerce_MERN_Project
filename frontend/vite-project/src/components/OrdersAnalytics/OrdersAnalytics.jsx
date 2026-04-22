import React from 'react'
import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { LineChart, Line, } from 'recharts';
import {
    TextField,
    Box,
    MenuItem,
    Select,
    Grid,
    Button,
    Menu,
    IconButton
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '@mui/material';

const OrdersAnalytics = () => {

    const [isOrderRevenueAnalyticsLoading, setIsOrderRevenueAnalyticsLoading] = useState(true)
    const [isOrderRevenueAnalyticsData, setIsOrderRevenueAnalyticsData] = useState("")
    const [isOrderRevenueAnalyticsError, setIsOrderRevenueAnalyticsError] = useState("")
    const [revenueOrderStatus, setRevenueOrderStatus] = useState("")
    const [revenuePaymentMethod, setRevenuePaymentMethod] = useState("")



    const [isOrdersOverTimeLoading, setIsOrdersOverTimeLoading] = useState(true)
    const [isOrdersOverTimeData, setIsOrdersOverTimeData] = useState("")
    const [isOrdersOverTimeError, setIsOrdersOverTimeError] = useState("")
    const [ordersOverTimeOrderStatus, setOrdersOverTimeOrderStatus] = useState("")
    const [ordersOverTimePaymentMethod, setOrdersOverTimePaymentMethod] = useState("")
    const [ordersOverTimeCategory, setOrdersOverTimeCategory] = useState("")


    const [isReveneuOverTimeLoading, setIsReveneuOverTimeLoading] = useState(true)
    const [isReveneuOverTimeData, setIsReveneuOverTimeData] = useState("")
    const [isReveneuOverTimeError, setIsReveneuOverTimeError] = useState("")
    const [reveneuOverTimeOrderStatus, setReveneuOverTimeOrderStatus] = useState("")
    const [reveneuOverTimePaymentMethod, setReveneuOverTimePaymentMethod] = useState("")
    const [reveneuOverTimeCategory, setReveneuOverTimeCategory] = useState("")


    const [isOrderNumbersAnalyticsLoading, setIsOrderNumbersAnalyticsLoading] = useState(true)
    const [isOrderNumbersAnalyticsData, setIsOrderNumbersAnalyticsData] = useState("")
    const [isOrderNumbersAnalyticsError, setIsOrderNumbersAnalyticsError] = useState("")


    const [period, setPeriod] = useState("daily");
    const [anchorEl, setAnchorEl] = useState(null);
    const [startDate, setStartDate] = useState(dayjs("2020-01-01"));
    const [endDate, setEndDate] = useState(dayjs());


    const [reveneuPeriod, setReveneuPeriod] = useState("daily");
    const [reveneuAnchorEl, setReveneuAnchorEl] = useState(null);
    const [reveneuStartDate, setReveneuStartDate] = useState(dayjs("2020-01-01"));
    const [reveneuEndDate, setReveneuEndDate] = useState(dayjs());
    const [reveneuCategory, setReveneuCategory] = useState();


    const fetchOrderRevenueAnalytics = async (searchParams) => {
        try {
            const response = await fetch(`http://localhost:4000/order-revenue-analytics/?${searchParams}`)
            if (response.ok) {
                const result = await response.json()
                if (result.success) {
                    setIsOrderRevenueAnalyticsData(result.data);
                    console.log(result.data)
                    setIsOrderRevenueAnalyticsError("")
                    setIsOrderRevenueAnalyticsLoading(false)
                    return
                }
                setIsOrderRevenueAnalyticsError(result.message)
                return
            }
            setIsOrderRevenueAnalyticsError("Something went wrong.")
        } catch (err) {
            console.log(err)
        } finally {
            setIsOrderRevenueAnalyticsLoading(false)
        }
    }




    const fetchOrderNumbersAnalytics = async () => {
        try {
            const response = await fetch(`http://localhost:4000/order-numbers-analytics`)
            if (response.ok) {
                const result = await response.json()
                if (result.success) {
                    setIsOrderNumbersAnalyticsData(result.data)
                    console.log(result.data)
                    setIsOrderNumbersAnalyticsError("")
                    setIsOrderNumbersAnalyticsLoading(false)
                    return
                }
                setIsOrderNumbersAnalyticsError(result.message)
                return
            }
            setIsOrderNumbersAnalyticsError("Something went wrong.")
        } catch (err) {
            console.log(err)
        } finally {
            setIsOrderNumbersAnalyticsLoading(false)
        }
    }





    const fetchOrdersOverTime = async (searchParams) => {
        try {
            const response = await fetch(`http://localhost:4000/orders-over-time/?${searchParams}`)
            if (response.ok) {
                const result = await response.json()
                if (result.success) {
                    setIsOrdersOverTimeData(result.data)
                    console.log(result.data)
                    setIsOrdersOverTimeError("")
                    setIsOrdersOverTimeLoading(false)
                    return
                }
                setIsOrdersOverTimeError(result.message)
                return
            }
            setIsOrdersOverTimeError("Something went wrong.")
        } catch (err) {
            console.log(err)
        } finally {
            setIsOrdersOverTimeLoading(false)
        }
    }




    const fetchReveneuOverTime = async (searchParams) => {
        try {
            const response = await fetch(`http://localhost:4000/reveneu-over-time/?${searchParams}`)
            if (response.ok) {
                const result = await response.json()
                if (result.success) {
                    setIsReveneuOverTimeData(result.data)
                    console.log(result.data)
                    setIsReveneuOverTimeError("")
                    setIsReveneuOverTimeLoading(false)
                    return
                }
                setIsReveneuOverTimeError(result.message)
                return
            }
            setIsReveneuOverTimeError("Something went wrong.")
        } catch (err) {
            console.log(err)
        } finally {
            setIsReveneuOverTimeLoading(false)
        }
    }

    useEffect(() => {
        const searchParams = new URLSearchParams()
        searchParams.append("orderStatus", revenueOrderStatus)
        searchParams.append("paymentMethod", revenuePaymentMethod)
        if (reveneuCategory) {
            if (reveneuCategory == "kids(boy)") {
                searchParams.append("category", "kids")
                searchParams.append("gender", "boy")
            } else if (reveneuCategory == "kids(girl)") {
                searchParams.append("category", "kids")
                searchParams.append("gender", "girl")
            } else {
                searchParams.append("category", reveneuCategory)
            }

            for (const item of searchParams) {
                console.log(item)
            }
            console.log(searchParams)
        }
        fetchOrderRevenueAnalytics(searchParams)
    }, [revenueOrderStatus, revenuePaymentMethod, reveneuCategory])

    useEffect(() => {
        fetchOrderNumbersAnalytics()
    }, [])

    useEffect(() => {
        const searchParams = new URLSearchParams()
        searchParams.append("start", startDate)
        searchParams.append("end", endDate)
        searchParams.append("period", period)
        searchParams.append("orderStatus", ordersOverTimeOrderStatus)
        searchParams.append("paymentMethod", ordersOverTimePaymentMethod)

        if (ordersOverTimeCategory) {
            if (ordersOverTimeCategory == "kids(boy)") {
                searchParams.append("category", "kids")
                searchParams.append("gender", "boy")
            } else if (ordersOverTimeCategory == "kids(girl)") {
                searchParams.append("category", "kids")
                searchParams.append("gender", "girl")
            } else {
                searchParams.append("category", ordersOverTimeCategory)
            }
        }


        fetchOrdersOverTime(searchParams)
    }, [startDate, endDate, period, ordersOverTimeOrderStatus, ordersOverTimePaymentMethod, ordersOverTimeCategory])

    useEffect(() => {
        const searchParams = new URLSearchParams()
        searchParams.append("start", reveneuStartDate)
        searchParams.append("end", reveneuEndDate)
        searchParams.append("period", reveneuPeriod)
        searchParams.append("orderStatus", reveneuOverTimeOrderStatus)
        searchParams.append("paymentMethod", reveneuOverTimePaymentMethod)

        if (reveneuOverTimeCategory) {
            if (reveneuOverTimeCategory == "kids(boy)") {
                searchParams.append("category", "kids")
                searchParams.append("gender", "boy")
            } else if (reveneuOverTimeCategory == "kids(girl)") {
                searchParams.append("category", "kids")
                searchParams.append("gender", "girl")
            } else {
                searchParams.append("category", reveneuOverTimeCategory)
            }
        }

        fetchReveneuOverTime(searchParams)
    }, [reveneuStartDate, reveneuEndDate, reveneuPeriod, reveneuOverTimeOrderStatus, reveneuOverTimePaymentMethod, reveneuOverTimeCategory])

    return (
        <Box>
            <Typography variant="h5" sx={{ color: "primary.main", textTransform: 'uppercase', textAlign: "center" }}>
                Orders Analytics
            </Typography>


            <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 3, lg: 4 }, mt: { xs: 3, lg: 5 } }}>
                <Typography variant="h5" sx={{ color: "primary.main", textTransform: 'uppercase' }}>
                    REVENEU
                </Typography>


                <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2, lg: 3 }, flexWrap: "wrap" }}>
                    <Box>
                        <TextField
                            select
                            sx={{ width: { xs: "200px" } }}
                            margin='normal'
                            defaultValue={""}
                            label="Order status"
                            value={revenueOrderStatus}
                            onChange={(e) => setRevenueOrderStatus(e.target.value)}

                        >
                            <MenuItem value={""}>All</MenuItem>
                            {
                                ["Pending", "Completed", "Failed", "Refunded"].map((item, index) => {
                                    return (
                                        <MenuItem value={item}>{item}</MenuItem>
                                    )
                                })
                            }
                        </TextField>
                    </Box>
                    <Box>
                        <TextField
                            sx={{ width: { xs: "200px" } }}
                            select
                            defaultValue={""}
                            margin='normal'
                            label="Payment status"
                            value={revenuePaymentMethod}
                            onChange={(e) => setRevenuePaymentMethod(e.target.value)}

                        >
                            <MenuItem value={""}>All</MenuItem>
                            {
                                ["cod", "card"].map((item, index) => {
                                    return (
                                        <MenuItem value={item}>{item}</MenuItem>
                                    )
                                })
                            }
                        </TextField>
                    </Box>




                    <Box>
                        <TextField
                            sx={{ width: { xs: "200px" } }}
                            select
                            defaultValue={""}
                            margin='normal'
                            label="Category"
                            value={reveneuCategory}
                            onChange={(e) => setReveneuCategory(e.target.value)}

                        >
                            <MenuItem value={""}>All</MenuItem>
                            {
                                ["men", "women", "kids", "kids(boy)", "kids(girl)"].map((item, index) => {
                                    return (
                                        <MenuItem value={item}>{item}</MenuItem>
                                    )
                                })
                            }
                        </TextField>
                    </Box>

                </Box>


                <Box>
                    {isOrderRevenueAnalyticsLoading ? (
                        <Box>
                            <Typography variant="body1" sx={{ color: "primary.main" }}>
                                Loading...
                            </Typography>
                        </Box>
                    ) : isOrderRevenueAnalyticsError ? (
                        <Box>
                            <Typography variant="body1" sx={{ color: "primary.main" }}>{isOrderRevenueAnalyticsError}
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" }, gap: { xs: 4, sm: 4, md: 5, lg: 6 } }}>
                            {
                                [{ label: "Total Revenue", value: isOrderRevenueAnalyticsData.totalRevenue }, { label: "Average Revenue", value: isOrderRevenueAnalyticsData.avgRevenue }, { label: "Maximum Revenue", value: isOrderRevenueAnalyticsData.maxRevenue }, { label: "Minimum Revenue", value: isOrderRevenueAnalyticsData.minRevenue }]?.map((item, index) => {
                                    return (
                                        <Box sx={{
                                            backgroundColor: "card.main", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", aspectRatio: "2/1", borderRadius: "10px", gap: { xs: 1, lg: 2 }, boxShadow: (theme) => `2px 2px 15px ${theme.palette.primary.main}`, "&:hover": { boxShadow: (theme) => `4px 4px 15px ${theme.palette.primary.main}` }
                                        }}>
                                            <Typography variant="body1" sx={{ color: "secondary.main", textAlign: "center" }}>
                                                {item.label}
                                            </Typography>

                                            <Box>
                                                <Typography variant="h3" sx={{ color: "secondary.main", textAlign: "center" }}>
                                                    {Math.round(item.value)}
                                                </Typography>
                                                <Typography variant="h4" sx={{ color: "secondary.main", textAlign: "center" }}>PKR</Typography>
                                            </Box>
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                    )}
                </Box>

            </Box>



            {/* Order Numbers */}



            <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 3, lg: 4 }, mt: { xs: 3, lg: 5 } }}>


                <Typography variant="h5" sx={{ color: "primary.main", textTransform: 'uppercase' }}>
                    Order status qty
                </Typography>

                <Box>
                    {isOrderNumbersAnalyticsLoading ? (
                        <Box>
                            <Typography variant="body1" sx={{ color: "primary.main" }}>
                                Loading...
                            </Typography>
                        </Box>
                    ) : isOrderNumbersAnalyticsError ? (
                        <Box>
                            <Typography variant="body1" sx={{ color: "primary.main" }}>{isOrderNumbersAnalyticsError}
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" }, gap: { xs: 4, sm: 4, md: 5, lg: 6 } }}>
                            {
                                isOrderNumbersAnalyticsData?.map((item, index) => {
                                    return (
                                        <Box sx={{
                                            backgroundColor: "card.main", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", aspectRatio: "2/1", borderRadius: "10px", gap: { xs: 1, lg: 2 }, boxShadow: (theme) => `2px 2px 15px ${theme.palette.primary.main}`, "&:hover": { boxShadow: (theme) => `4px 4px 15px ${theme.palette.primary.main}` }
                                        }}>
                                            <Typography variant="body1" sx={{ color: "secondary.main", textAlign: "center" }}>
                                                {item._id}
                                            </Typography>

                                            <Box>
                                                <Typography variant="h3" sx={{ color: "secondary.main", textAlign: "center" }}>
                                                    {Math.round(item.numbers)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                    )}
                </Box>

            </Box>


            {/* Graphs */}



            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr", md: "1fr 1fr" }, gap: { xs: 5 }, my: { xs: 2, md: 3, lg: 4 } }}>


                <Box sx={{ aspectRatio: { xs: "2/2", sm: "1/1", md: "1/1", lg: "1/1" }, display: "flex", flexDirection: "column", width: "100%" }}>


                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h6" sx={{ color: "primary.main" }}>
                            Orders Quantity Over Time
                        </Typography>
                        <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}><MoreVertIcon /></IconButton>
                    </Box>
                    <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}

                    >
                        <MenuItem>
                            <Box sx={{ width: "100%" }}>
                                <TextField
                                    select
                                    fullWidth
                                    defaultValue={""}
                                    label="Order status"
                                    value={ordersOverTimeOrderStatus}
                                    onChange={(e) => setOrdersOverTimeOrderStatus(e.target.value)}

                                >
                                    <MenuItem value={""}>All</MenuItem>
                                    {
                                        ["Pending", "Completed", "Failed", "Refunded"].map((item, index) => {
                                            return (
                                                <MenuItem value={item}>{item}</MenuItem>
                                            )
                                        })
                                    }
                                </TextField>
                            </Box>

                        </MenuItem>
                        <MenuItem>
                            <Box sx={{ width: "100%" }}>
                                <TextField
                                    fullWidth
                                    select
                                    defaultValue={""}
                                    label="Payment status"
                                    value={ordersOverTimePaymentMethod}
                                    onChange={(e) => setOrdersOverTimePaymentMethod(e.target.value)}

                                >
                                    <MenuItem value={""}>All</MenuItem>
                                    {
                                        ["cod", "card"].map((item, index) => {
                                            return (
                                                <MenuItem value={item}>{item}</MenuItem>
                                            )
                                        })
                                    }
                                </TextField>
                            </Box>
                        </MenuItem>
                        <MenuItem>
                            <Box>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                                        <DatePicker
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true
                                                }
                                            }}
                                            label="Start date"
                                            value={startDate}
                                            onChange={(newValue) => setStartDate(newValue)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box>
                        </MenuItem>
                        <MenuItem>
                            <Box>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                                        <DatePicker
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true
                                                }
                                            }}
                                            label="End date"
                                            value={endDate}
                                            onChange={(newValue) => setEndDate(newValue)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box>

                        </MenuItem>
                        <MenuItem>
                            <Box sx={{ width: "100%" }}>
                                <TextField

                                    fullWidth
                                    select
                                    label="Duration"
                                    value={period}
                                    defaultValue={"weekly"}
                                    onChange={(e) => setPeriod(e.target.value)}

                                >
                                    {
                                        ["daily", "weekly", "monthly", "yearly"].map((item) => {
                                            return (
                                                <MenuItem value={item} >{item}</MenuItem>
                                            )
                                        })
                                    }
                                </TextField>
                            </Box>
                        </MenuItem>
                        <MenuItem>
                                            <Box sx={{ width: { xs: "100%" } }}>
                        <TextField
                            fullWidth
                            select
                            defaultValue={""}
                            label="Category"
                            value={ordersOverTimeCategory}
                            onChange={(e) => setOrdersOverTimeCategory(e.target.value)}

                        >
                            <MenuItem value={""}>All</MenuItem>
                            {
                                ["men", "women", "kids", "kids(boy)", "kids(girl)"].map((item, index) => {
                                    return (
                                        <MenuItem value={item}>{item}</MenuItem>
                                    )
                                })
                            }
                        </TextField>
                    </Box>

                        </MenuItem>
                    </Menu>

                    <Box sx={{ flexGrow: 1 }}>
                        {
                            isOrdersOverTimeLoading ? (
                                <Box>
                                    <Typography variant="body1" color="initial">
                                        Loading...
                                    </Typography>
                                </Box>
                            ) : isOrdersOverTimeError ? (
                                <Box>
                                    <Typography variant="body1" color="initial">
                                        {isOrdersOverTimeError}
                                    </Typography>

                                    <Box>

                                    </Box>
                                </Box>
                            ) : (
                                <Box sx={{ width: "100%", height: "100%", px: { xs: 2, lg: 3 } }}>
                                    <ResponsiveContainer width="100%" height="100%">

                                        <LineChart data={isOrdersOverTimeData}>
                                            <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                                            <XAxis dataKey="label" />
                                            <YAxis />
                                            <Tooltip />

                                            <Line
                                                type="monotone"
                                                dataKey="count"
                                                stroke="#1976d2"
                                                strokeWidth={3}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>

                                </Box>
                            )
                        }

                    </Box>
                </Box>





                <Box sx={{ aspectRatio: { xs: "2/2", sm: "1/1", md: "1/1", lg: "1/1" }, display: "flex", flexDirection: "column", width: "100%" }}>


                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h6" sx={{ color: "primary.main" }}>
                            Sales Over Time
                        </Typography>
                        <IconButton onClick={(event) => setReveneuAnchorEl(event.currentTarget)}><MoreVertIcon /></IconButton>
                    </Box>
                    <Menu anchorEl={reveneuAnchorEl} keepMounted open={Boolean(reveneuAnchorEl)} onClose={() => setReveneuAnchorEl(null)} anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}

                    >
                        <MenuItem>
                            <Box sx={{ width: "100%" }}>
                                <TextField
                                    select
                                    fullWidth
                                    defaultValue={""}
                                    label="Order status"
                                    value={reveneuOverTimeOrderStatus}
                                    onChange={(e) => setReveneuOverTimeOrderStatus(e.target.value)}

                                >
                                    <MenuItem value={""}>All</MenuItem>
                                    {
                                        ["Pending", "Completed", "Failed", "Refunded"].map((item, index) => {
                                            return (
                                                <MenuItem value={item}>{item}</MenuItem>
                                            )
                                        })
                                    }
                                </TextField>
                            </Box>

                        </MenuItem>
                        <MenuItem>
                            <Box sx={{ width: "100%" }}>
                                <TextField
                                    fullWidth
                                    select
                                    defaultValue={""}
                                    label="Payment status"
                                    value={reveneuOverTimePaymentMethod}
                                    onChange={(e) => setReveneuOverTimePaymentMethod(e.target.value)}

                                >
                                    <MenuItem value={""}>All</MenuItem>
                                    {
                                        ["cod", "card"].map((item, index) => {
                                            return (
                                                <MenuItem value={item}>{item}</MenuItem>
                                            )
                                        })
                                    }
                                </TextField>
                            </Box>
                        </MenuItem>
                        <MenuItem>
                            <Box>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                                        <DatePicker
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true
                                                }
                                            }}
                                            label="Start date"
                                            value={reveneuStartDate}
                                            onChange={(newValue) => setReveneuStartDate(newValue)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box>
                        </MenuItem>
                        <MenuItem>
                            <Box>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                                        <DatePicker
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true
                                                }
                                            }}
                                            label="End date"
                                            value={reveneuEndDate}
                                            onChange={(newValue) => setReveneuEndDate(newValue)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box>

                        </MenuItem>
                        <MenuItem>
                            <Box sx={{ width: "100%" }}>
                                <TextField

                                    fullWidth
                                    select
                                    label="Duration"
                                    value={reveneuPeriod}
                                    defaultValue={"weekly"}
                                    onChange={(e) => { setReveneuPeriod(e.target.value) }}

                                >
                                    {
                                        ["daily", "weekly", "monthly", "yearly"].map((item) => {
                                            return (
                                                <MenuItem value={item} >{item}</MenuItem>
                                            )
                                        })
                                    }
                                </TextField>
                            </Box>
                        </MenuItem>
                        <MenuItem>
                                            <Box sx={{ width: { xs: "100%" } }}>
                        <TextField
                            fullWidth
                            select
                            defaultValue={""}
                            label="Category"
                            value={reveneuOverTimeCategory}
                            onChange={(e) => setReveneuOverTimeCategory(e.target.value)}

                        >
                            <MenuItem value={""}>All</MenuItem>
                            {
                                ["men", "women", "kids", "kids(boy)", "kids(girl)"].map((item, index) => {
                                    return (
                                        <MenuItem value={item}>{item}</MenuItem>
                                    )
                                })
                            }
                        </TextField>
                    </Box>

                        </MenuItem>
                    </Menu>

                    <Box sx={{ flexGrow: 1 }}>
                        {
                            isReveneuOverTimeLoading ? (
                                <Box>
                                    <Typography variant="body1" color="initial">
                                        Loading...
                                    </Typography>
                                </Box>
                            ) : isReveneuOverTimeError ? (
                                <Box>
                                    <Typography variant="body1" color="initial">
                                        {isReveneuOverTimeError}
                                    </Typography>

                                    <Box>

                                    </Box>
                                </Box>
                            ) : (
                                <Box sx={{ width: "100%", height: "100%", px: { xs: 2, lg: 3 } }}>
                                    <ResponsiveContainer width="100%" height="100%">

                                        <LineChart data={isReveneuOverTimeData}>
                                            <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                                            <XAxis dataKey="label" />
                                            <YAxis />
                                            <Tooltip />

                                            <Line
                                                type="monotone"
                                                dataKey="count"
                                                stroke="#1976d2"
                                                strokeWidth={3}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>

                                </Box>
                            )
                        }

                    </Box>
                </Box>
            </Box>
        </Box>

    )
}



export default OrdersAnalytics
