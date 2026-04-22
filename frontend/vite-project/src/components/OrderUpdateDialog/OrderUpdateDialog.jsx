import React, { useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { FormControl, FormLabel, MenuItem, Box } from '@mui/material'
import { useForm, Controller } from "react-hook-form"

const OrderUpdateDialog = ({ showOrderUpdateDialog, setshowOrderUpdateDialog, singleOrderData, setSingleOrderData, setIsSingleOrderUpdated }) => {

    const { control, formState: { errors }, reset, handleSubmit, setValue } = useForm()

    useEffect(() => {
        if (singleOrderData && showOrderUpdateDialog) {
            setValue("orderStatus", singleOrderData?.orderStatus)
            setValue("paymentStatus", singleOrderData?.paymentInfo?.status)
        }
    }, [singleOrderData, reset, showOrderUpdateDialog])

    const onSubmit = async (data) => {
        console.log(data)
        try {
            const response = await fetch(`http://localhost:4000/order-update/${singleOrderData._id}`,
                {
                    method: "PUT", 
                    body: JSON.stringify({orderStatus: data.orderStatus, paymentStatus: data.paymentStatus}), 
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            if (response.ok) {
                const result = await response.json()
                console.log(result)
                if (result.success) {
                    setIsSingleOrderUpdated(singleOrderData._id + Date.now())
                    alert("Updated successfully.")
                    setshowOrderUpdateDialog(false)
                    return
                }
                alert(result.message)
                return
            }
            alert("Update Failed.")
        } catch (err) {
            console.log(err)
            alert(err.message)
        }
    }

    return (
        <Dialog open={showOrderUpdateDialog} maxWidth="sm" fullWidth onClose={() => { setshowOrderUpdateDialog(false), setSingleOrderData("") }}>
            <DialogTitle>
                Update Statuses
            </DialogTitle>
            <DialogContent>
                {/* <DialogContentText> */}



                <Box component="form" id="order-update-form" onSubmit={handleSubmit(onSubmit)} >
                    <Controller
                        name="orderStatus"
                        control={control}
                        rules={{ required: "Order status is required" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                fullWidth
                                label="Order Status"
                                margin="normal"
                                error={!!errors.orderStatus}
                                helperText={errors.orderStatus?.message}
                            >
                                {[
                                    "Pending",
                                    "Processing",
                                    "Shipped",
                                    "Out for Delivery",
                                    "Delivered",
                                    "Cancelled",
                                    "Returned",
                                ].map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />




                    {/* <Box> */}
                    <Controller
                        name="paymentStatus"
                        control={control}
                        rules={
                            {
                                required: {
                                    value: true,
                                    message: "Payment status is required"
                                }
                            }
                        }
                        render={({ field }) => {
                            return (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Payment Status"
                                    margin="normal"
                                    error={!!errors?.paymentStatus}
                                    helperText={errors?.paymentStatus?.message}

                                >
                                    {
                                        ["Pending", "Completed", "Failed", "Refunded"].map((item, index) => {
                                            return (
                                                <MenuItem key={index} value={item}>{item}</MenuItem>
                                            )
                                        })
                                    }
                                </TextField>
                            )
                        }}
                    />
                    {/* </Box> */}
                </Box>
                {/* </DialogContentText> */}
            </DialogContent>
            <DialogActions>
                <Button
                    form="order-update-form"
                    type='submit'
                    onClick={() => { }}
                    color="primary"
                    variant='contained'
                >
                    Update
                </Button>
                <Button
                    onClick={() => { setshowOrderUpdateDialog(false), setSingleOrderData("") }}
                    color="primary"
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default OrderUpdateDialog

















