import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { initial } from 'lodash'

const OrderFullView = ({ open, setOpen, data }) => {
    return (
        <Dialog fullWidth="md" open={open} onClose={() => setOpen(false)}>
            <DialogTitle>

            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 3, sm: 4 } }}>
                    <Typography variant="h6" sx={{ color: "primary.main" }}>Personal Info</Typography>
                    <Box>
                        <Typography variant="body1" sx={{ color: "secondary.main" }}>Full Name</Typography>
                        <Typography variant="body1" sx={{ color: "primary.main" }}>{data?.shippingAddress?.fullName}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="body1" sx={{ color: "secondary.main" }}>Email</Typography>
                        <Typography variant="body1" sx={{ color: "primary.main" }}>{data?.shippingAddress?.email}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="body1" sx={{ color: "secondary.main" }}>Phone</Typography>
                        <Typography variant="body1" sx={{ color: "primary.main" }}>{data?.shippingAddress?.phone}</Typography>
                    </Box>

                    <Box>
                        <Typography variant="body1" sx={{ color: "secondary.main" }}>Address</Typography>
                        <Typography variant="body1" sx={{ color: "primary.main" }}>{data?.shippingAddress?.address}</Typography>
                    </Box>


                    <Typography variant="h6" sx={{ color: "primary.main" }}>Shipping Info</Typography>


                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }, gap: { xs: 1, sm: 2, md: 2 } }}>
                        <Box>
                            <Typography variant="body1" sx={{ color: "secondary.main" }}>City</Typography>
                            <Typography variant="body1" sx={{ color: "primary.main" }}>{data?.shippingAddress?.city}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" sx={{ color: "secondary.main" }}>Postal code</Typography>
                            <Typography variant="body1" sx={{ color: "primary.main" }}>{data?.shippingAddress?.postalCode}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" sx={{ color: "secondary.main" }}>Country</Typography>
                            <Typography variant="body1" sx={{ color: "primary.main" }}>{data?.shippingAddress?.country}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" sx={{ color: "secondary.main" }}>State</Typography>
                            <Typography variant="body1" sx={{ color: "primary.main" }}>{data?.shippingAddress?.state}</Typography>
                        </Box>
                    </Box>


                    <Typography variant="h6" sx={{ color: "primary.main" }}>Payment Info</Typography>


                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }, gap: { xs: 1, sm: 2, md: 2 } }}>
                        <Box>
                            <Typography variant="body1" sx={{ color: "secondary.main" }}>Payment Method</Typography>
                            <Typography variant="body1" sx={{ color: "primary.main" }}>{data?.paymentInfo?.method}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" sx={{ color: "secondary.main" }}>Payment Status</Typography>
                            <Typography variant="body1" sx={{ color: "primary.main" }}>{data?.paymentInfo?.status}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" sx={{ color: "secondary.main" }}>Paid At</Typography>
                            <Typography variant="body1" sx={{ color: "primary.main" }}>{!!data?.paymentInfo?.paidAt || "-"}</Typography>
                        </Box>
                    </Box>



                    <Typography variant="h6" sx={{ color: "primary.main" }}>Price Info</Typography>


                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }, gap: { xs: 1, sm: 2, md: 2 } }}>
                        <Box>
                            <Typography variant="body1" sx={{ color: "secondary.main" }}>Shipping price</Typography>
                            <Typography variant="body1" sx={{ color: "primary.main" }}>{data?.shippingPrice} PKR</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" sx={{ color: "secondary.main" }}>Total price</Typography>
                            <Typography variant="body1" sx={{ color: "primary.main" }}>{data?.totalPrice} PKR</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1" sx={{ color: "secondary.main" }}>Grand price</Typography>
                            <Typography variant="body1" sx={{ color: "primary.main" }}>{data?.grandPrice} PKR</Typography>
                        </Box>
                    </Box>


                    <Typography variant="h6" sx={{ color: "primary.main" }}>
                        Order Items
                        (
                            {
                        data?.orderItems?.reduce((initialValue, item)=>{
                            return initialValue + item.qty
                        }, 0)
                        
                        }
                        )
                    </Typography>



                    <Box>
                        <TableContainer>
                            <Table sx={{ minWidth: 580 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow
                                        sx={{
                                            height: "70px",

                                            '& th': {
                                                borderBottom: 2,
                                                borderTop: 2,
                                                borderColor: 'divider',
                                            }
                                        }}>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Category</TableCell>
                                        <TableCell>Size</TableCell>
                                        <TableCell>Fabric</TableCell>
                                        <TableCell>Color</TableCell>
                                        <TableCell>Qty</TableCell>
                                        <TableCell>Total price</TableCell>
                                    </TableRow>
                                </TableHead>
                                {
                                    data?.orderItems?.length > 0 ? (
                                        <TableBody>
                                            {data?.orderItems?.map((row) => (
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
                                                    <TableCell component="td" scope="row">
                                                        <Box component={"img"} src={row.images[0]} sx={{ width: { xs: "75px", md: "70px", md: "80px" }, height: "auto" }}>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell sx={{textWrap: "nowrap"}} component="td" scope="row">
                                                        {row.title}
                                                    </TableCell>
                                                    <TableCell component="td" scope="row">
                                                        {row.category}
                                                    </TableCell>
                                                    <TableCell component="td" scope="row">
                                                        {row.size}
                                                    </TableCell>
                                                    <TableCell component="td" scope="row">
                                                        {row.fabric}
                                                    </TableCell>
                                                    <TableCell component="td" scope="row">
                                                        {row.color}
                                                    </TableCell>
                                                    <TableCell component="td" scope="row">
                                                        {row.qty}
                                                    </TableCell>
                                                    <TableCell component="td" scope="row" sx={{ textWrap: "nowrap" }}>
                                                        {row.qty * row.price} PKR
                                                    </TableCell>

                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    ) : ("")
                                }
                            </Table>
                            {
                                data?.orderItems?.length > 0 ? ("") : (
                                    <Typography sx={{ textAlign: "center", my: 2, color: "primary.main" }} variant="body1">
                                        No item was found
                                    </Typography>
                                )
                            }
                        </TableContainer>
                    </Box>

                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => setOpen(false)}
                    color="primary"
                    variant='outlined'
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default OrderFullView
