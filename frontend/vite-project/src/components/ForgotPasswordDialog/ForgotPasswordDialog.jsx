import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import { Box, FormLabel, TextField, Typography, Alert } from '@mui/material'

const ForgotPasswordDialog = ({ open, setOpen, role }) => {
    const { register, reset, formState: { errors }, handleSubmit, setValue } = useForm()
    const [forgetError, setForgetError] = useState("")
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const response = await fetch("http://localhost:4000/forget-password", {
                method: "POST",
                body: JSON.stringify({ email: data.email, role }),
                headers: {
                    "Content-Type": "application/json"
                },
            })
            console.log(response)
            const result = await response.json()
            if (response.ok) {
                console.log(result)
                if (result.success) {
                    // alert("Email has been sent to your email to reset password")
                    setOpen(false)
                    setForgetError("")
                    setSuccessMessage(`Reset password link has been sent to this email ${data.email}`)
                    return
                }
                setForgetError(result.message)
            }
            setForgetError(result.message)
        } catch (err) {
            setForgetError(err.message || "Something went wrong.")
            console.log(err, "erro")
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <Dialog open={open} onClose={() => { setOpen(false), reset(), setForgetError("") }}>
                <DialogTitle>
                    <Typography variant="h5" sx={{ color: "primary.main" }}>
                        Forgot Password
                    </Typography>
                </DialogTitle>
                <DialogContent >
                    <DialogContentText sx={{ mb: { xs: 3, lg: 4 } }}>
                        <Typography variant="body1" sx={{ color: "secondary.main" }}>
                            Enter a email which have been you registered.
                        </Typography>
                        <Box component={"form"} id="form" onSubmit={handleSubmit(onSubmit)} on sx={{ minWidth: { lg: "350px" } }}>
                            <TextField
                                label="Email"
                                fullWidth
                                placeholder='Enter your registered email'
                                margin="normal"
                                error={!!errors?.email}
                                helperText={errors?.email?.message}
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email is required"
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Enter a valid email"
                                    }
                                })}

                            />
                        </Box>
                        {
                            forgetError && (
                                <Typography variant="body1" sx={{ color: "red" }}>
                                    {forgetError}
                                </Typography>
                            )
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='contained'
                        type='Submit'
                        color="primary"
                        form="form"
                        disabled={loading}
                    >
                        Reset
                    </Button>
                    <Button
                        variant='outlined'
                        onClick={() => { setOpen(false), reset(), setForgetError("") }}
                        color="primary"
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            {
                successMessage ? (
                    <Alert sx={{position: "fixed", top: "2%", left: "50%", transform: "translateX(-50%)"}} onClose={() => { setSuccessMessage("") }}>
                        {successMessage}
                    </Alert>
                ) : ""
            }
        </>
    )
}

export default ForgotPasswordDialog
