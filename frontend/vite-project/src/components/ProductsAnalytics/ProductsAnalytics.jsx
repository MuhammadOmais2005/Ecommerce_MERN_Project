import React, { useEffect, useState } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '@mui/material';
import { LineChart, Line, } from 'recharts';
import {

    MenuItem,
    Select,
    Grid,
    Button, TextField, Menu
} from "@mui/material";
// import { RechartsDevtools } from '@recharts/devtools';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const ProductsAnalytics = () => {
    const [productsAnalyticsData, setProductsAnalyticsData] = useState('')
    const [productsAnalyticsError, setProductsAnalyticsError] = useState("")
    const [productsAnalyticsLoading, setProductsAnalyticsLoading] = useState(true)
    const [productsOverTime, setProductsOverTime] = useState("")
    const [productsOverTimeError, setProductsOverTimeError] = useState("")
    const [productsOverTimeLoading, setProductsOverTimeLoading] = useState(true)
    const [period, setPeriod] = useState("daily");
    const [anchorEl, setAnchorEl] = useState(null);

    const [startDate, setStartDate] = useState(dayjs("2026-01-01"));

    const [endDate, setEndDate] = useState(dayjs());
    // const [endDate, setEndDate] = useState("");
    const theme = useTheme()

    const fetchProuductsAnalytics = async () => {
        try {
            const response = await fetch("http://localhost:4000/products-analytics")
            if (response.ok) {
                const result = await response.json()
                if (result.success) {
                    console.log(result.data)
                    setProductsAnalyticsData(result.data)
                    return
                }
                setProductsAnalyticsError(result.message)

            }
        } catch (err) {
            console.log(err)
            setProductsAnalyticsError(err.message)
        } finally {
            setProductsAnalyticsLoading(false)
        }
    }
    const fetchProductsOverTime = async (searchParams) => {
        try {
            const response = await fetch(`http://localhost:4000/products-qty-over-time/?${searchParams}`)
            if (response.ok) {
                const result = await response.json()
                if (result.success) {
                    console.log(result.data)
                    setProductsOverTime(result.data)
                    return
                }
                setProductsOverTimeError(result.message)

            }
        } catch (err) {
            console.log(err)
            setProductsOverTimeError(err.message)
        } finally {
            setProductsOverTimeLoading(false)
        }
    }
    useEffect(() => {
        fetchProuductsAnalytics()
    }, [])
    useEffect(() => {
        const queryParams = {}
        if (startDate) {
            queryParams.start = startDate
        }
        if (endDate) {
            queryParams.end = endDate
        }
        if (period) {
            queryParams.period = period
        }
        console.log(startDate, endDate, period)
        fetchProductsOverTime(new URLSearchParams(queryParams))
    }, [startDate, endDate, period])
    if (productsAnalyticsLoading) {
        return (
            <Box>
                Loading...
            </Box>
        )
    }
    if (productsAnalyticsError) {
        <Box>
            {productsAnalyticsError}
        </Box>
    }
    return (

        <Box>
            {productsAnalyticsLoading ? (
                <Box>
                    <Typography variant="body1" color="initial">Loading...</Typography>
                </Box>
            ) : productsAnalyticsError ? (
                <Box>
                    <Typography variant="body1" color="initial">
                        {productsAnalyticsError}
                    </Typography>
                </Box>
            ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 3, lg: 4 }, mt: { xs: 3, lg: 5 } }}>
                    <Typography variant="h5" sx={{ color: "primary.main", textTransform: 'uppercase', textAlign: "center" }}>
                        Proudcts Analytics
                    </Typography>

                    <Typography variant="h5" sx={{ color: "primary.main", textTransform: 'uppercase' }}>
                        proudct quantity
                    </Typography>


                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" }, gap: { xs: 4, sm: 4, md: 5, lg: 6 } }}>
                        <Box sx={{
                            backgroundColor: "card.main", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", aspectRatio: "2/1", borderRadius: "10px", gap: { xs: 1, lg: 2 }, boxShadow: (theme) => `2px 2px 15px ${theme.palette.primary.main}`, "&:hover": { boxShadow: (theme) => `4px 4px 15px ${theme.palette.primary.main}` }
                        }}>
                            <Typography variant="body1" sx={{ color: "secondary.main", textAlign: "center" }}>
                                Total Products
                            </Typography>
                            <Typography variant="h3" sx={{ color: "secondary.main" }}>
                                {productsAnalyticsData?.totalProducts}
                            </Typography>
                        </Box>
                        <Box sx={{ backgroundColor: "card.main", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", aspectRatio: "2/1", borderRadius: "10px", gap: { xs: 1, lg: 2 }, boxShadow: (theme) => `2px 2px 15px ${theme.palette.primary.main}`, "&:hover": { boxShadow: (theme) => `4px 4px 15px ${theme.palette.primary.main}` } }}>
                            <Typography variant="body1" sx={{ color: "secondary.main", textAlign: "center" }}>
                                Total Active Products
                            </Typography>
                            <Typography variant="h3" sx={{ color: "secondary.main" }}>
                                {productsAnalyticsData?.totalActiveProducts}
                            </Typography>
                        </Box>
                        <Box sx={{ backgroundColor: "card.main", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", aspectRatio: "2/1", borderRadius: "10px", gap: { xs: 1, lg: 2 }, boxShadow: (theme) => `2px 2px 15px ${theme.palette.primary.main}`, "&:hover": { boxShadow: (theme) => `4px 4px 15px ${theme.palette.primary.main}` } }}>
                            <Typography variant="body1" sx={{ color: "secondary.main", textAlign: "center" }}>
                                Total Inactive  Products
                            </Typography>
                            <Typography variant="h3" sx={{ color: "secondary.main" }}>
                                {productsAnalyticsData?.totalInActiveProducts}
                            </Typography>
                        </Box>
                        <Box sx={{ backgroundColor: "card.main", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", aspectRatio: "2/1", borderRadius: "10px", gap: { xs: 1, lg: 2 }, boxShadow: (theme) => `2px 2px 15px ${theme.palette.primary.main}`, "&:hover": { boxShadow: (theme) => `4px 4px 15px ${theme.palette.primary.main}` } }}>
                            <Typography variant="body1" sx={{ color: "secondary.main", textAlign: "center" }}>
                                Total Out of Stock Proudcts
                            </Typography>
                            <Typography variant="h3" sx={{ color: "secondary.main" }}>
                                {productsAnalyticsData?.totalOutOfStock}
                            </Typography>
                        </Box>
                        <Box sx={{ backgroundColor: "card.main", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", aspectRatio: "2/1", borderRadius: "10px", gap: { xs: 1, lg: 2 }, boxShadow: (theme) => `2px 2px 15px ${theme.palette.primary.main}`, "&:hover": { boxShadow: (theme) => `4px 4px 15px ${theme.palette.primary.main}` } }}>
                            <Typography variant="body1" sx={{ color: "secondary.main", textAlign: "center" }}>
                                Total Item of Proudcts
                            </Typography>
                            <Typography variant="h3" sx={{ color: "secondary.main" }}>
                                {productsAnalyticsData?.totalStock[0]?.totalStock}
                            </Typography>
                        </Box>

                    </Box>









                    <Typography variant="h5" sx={{ color: "primary.main", textTransform: 'uppercase' }}>
                        proudct Prices
                    </Typography>


                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" }, gap: { xs: 4, sm: 4, md: 5, lg: 6 } }}>
                        <Box sx={{
                            backgroundColor: "card.main", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", aspectRatio: "2/1", borderRadius: "10px", gap: { xs: 1, lg: 2 }, boxShadow: (theme) => `2px 2px 15px ${theme.palette.primary.main}`, "&:hover": { boxShadow: (theme) => `4px 4px 15px ${theme.palette.primary.main}` }
                        }}>
                            <Typography variant="body1" sx={{ color: "secondary.main", textAlign: "center" }}>
                                Average Price
                            </Typography>

                            <Box>
                                <Typography variant="h3" sx={{ color: "secondary.main" }}>
                                    {productsAnalyticsData?.priceAnalytics[0].maxPrice}
                                </Typography>
                                <Typography variant="h4" sx={{ color: "secondary.main", textAlign: "center" }}>PKR</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ backgroundColor: "card.main", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", aspectRatio: "2/1", borderRadius: "10px", gap: { xs: 1, lg: 2 }, boxShadow: (theme) => `2px 2px 15px ${theme.palette.primary.main}`, "&:hover": { boxShadow: (theme) => `4px 4px 15px ${theme.palette.primary.main}` } }}>
                            <Typography variant="body1" sx={{ color: "secondary.main", textAlign: "center" }}>
                                Maximum Price
                            </Typography>
                            <Box>
                                <Typography variant="h3" sx={{ color: "secondary.main" }}>
                                    {productsAnalyticsData?.priceAnalytics[0].maxPrice}
                                </Typography>
                                <Typography variant="h4" sx={{ color: "secondary.main", textAlign: "center" }}>PKR</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ backgroundColor: "card.main", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", aspectRatio: "2/1", borderRadius: "10px", gap: { xs: 1, lg: 2 }, boxShadow: (theme) => `2px 2px 15px ${theme.palette.primary.main}`, "&:hover": { boxShadow: (theme) => `4px 4px 15px ${theme.palette.primary.main}` } }}>
                            <Typography variant="body1" sx={{ color: "secondary.main", textAlign: "center" }}>
                                Minimum Price
                            </Typography>
                            <Box>
                                <Typography variant="h3" sx={{ color: "secondary.main" }}>
                                    {productsAnalyticsData?.priceAnalytics[0].minPrice}
                                </Typography>
                                <Typography variant="h4" sx={{ color: "secondary.main", textAlign: "center" }}>PKR</Typography>
                            </Box>
                        </Box>
                    </Box>



                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr", md: "1fr 1fr" }, gap: { xs: 5 },  my: {xs: 2, md: 3, lg: 4} }}>

                        <Box sx={{ aspectRatio: { xs: "3/4", sm: "3/3", lg: "1/1" }, display: "flex", flexDirection: "column" }}>
                            <Typography variant="h6" sx={{ color: "primary.main" }}>
                                Proudcts Quantity per category
                            </Typography>
                            <Box sx={{ width: "100%", flexGrow: 1, px: { xs: 2, lg: 3 } }}>
                                <ResponsiveContainer width="100%" height={"100%"}>

                                    <BarChart
                                        responsive
                                        data={productsAnalyticsData?.totalProductsPerCategory}
                                    >
                                        <XAxis dataKey="_id" stroke={theme.palette.secondary.main}
                                            tick={{ fill: `${theme.palette.secondary.main}`, fontSize: 20, fontWeight: '500' }}
                                            label={{
                                                fill: `${theme.palette.secondary.main}`,       // text color
                                                fontSize: 20,
                                            }}

                                        />
                                        {/* <Legend /> */}
                                        <YAxis stroke={theme.palette.secondary.main}
                                            label={{
                                                value: "count", // your custom Y axis label
                                                angle: -90,            // rotate vertically
                                                position: "insideLeft",
                                                offset: 0,
                                                fill: `${theme.palette.secondary.main}`,       // text color
                                                fontSize: 20,
                                            }}
                                            tick={{ fill: `${theme.palette.secondary.main}`, fontSize: 20, fontWeight: '500' }} />
                                        {/* <Tooltip /> */}


                                        <Bar dataKey="count" fill={theme.palette.primary.main} label={{ position: 'top', fill: `${theme.palette.secondary.main}`, fontSize: 14, fontWeight: 'bold' }} />
                                        {/* <RechartsDevtools /> */}
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
                        </Box>




                        <Box sx={{ aspectRatio: { xs: "2/2", sm: "1/1", md: "1/1", lg: "1/1" }, display: "flex", flexDirection: "column", width: "100%" }}>


                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography variant="h6" sx={{ color: "primary.main" }}>
                                    Proudcts Upload Quantity Over Time
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
                                                    defaultValue={dayjs('2022-04-17')}
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
                                                    defaultValue={dayjs(Date.now)}
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
                            </Menu>

                            <Box sx={{ flexGrow: 1 }}>
                                {
                                    productsOverTimeLoading ? (
                                        <Box>
                                            <Typography variant="body1" color="initial">
                                                Loading...
                                            </Typography>
                                        </Box>
                                    ) : productsOverTimeError ? (
                                        <Box>
                                            <Typography variant="body1" color="initial">
                                                {productsOverTimeError}
                                            </Typography>

                                            <Box>

                                            </Box>
                                        </Box>
                                    ) : (
                                        <Box sx={{ width: "100%", height: "100%", px: { xs: 2, lg: 3 } }}>
                                            <ResponsiveContainer width="100%" height="100%">

                                                <LineChart data={productsOverTime}>
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
            )}

        </Box>


    )
}

export default ProductsAnalytics
