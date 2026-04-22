import { Container, Box, Paper, Typography, TextField, Button, Alert } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
    const { register, formState: { errors }, reset, watch, setError, clearErrors, handleSubmit } = useForm()
    const password = watch("password")
    const { token } = useParams()
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [resetError, setResetError] = useState("")
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const response = await fetch("http://localhost:4000/reset-password", {
                method: "POST",
                body: JSON.stringify({ token, password: data.password }),
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const result = await response.json()
            if (!response.ok) {
                setResetError(result.message)
                return
            }
            if (result.success) {
                setSuccessMessage("Password has been reset successfully. Now login again.")
                setTimeout(() => {
                    navigate("/login", {replace: true})
                }, 4000)
                setResetError("")
            }

        } catch (err) {
            console.log(err)
            setResetError(err.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Container maxWidth="sm">
                <Paper elavation={7} sx={{ p: { xs: 2, sm: 4, md: 5, lg: 6 } }}>
                    <Box>
                        <Typography sx={{ textAlign: "center", color: "primary.main" }} variant="h3" color="initial">
                            LOGO
                        </Typography>
                        <Typography sx={{ textAlign: "center", color: "primary.main" }} variant="h6">
                            RESET PASSWORD
                        </Typography>
                    </Box>
                    <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Password"
                            error={!!errors?.password}
                            helperText={errors?.password?.message}
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Password is required."
                                },
                                pattern: {
                                    value:
                                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message:
                                        "Min 8 chars, 1 letter, 1 number & 1 special character"
                                }
                            })}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Confirm Password"
                            error={!!errors?.confirmPassword}
                            helperText={errors?.confirmPassword?.message}
                            {...register("confirmPassword", {
                                required: {
                                    value: true,
                                    message: "Confirm password is required."
                                },
                                validate: (value) => {
                                    if (value == password) {
                                        return true
                                    }
                                    return "Confirm password is not same."
                                }
                            })}
                        />
                        {
                            resetError && (
                                <Typography variant="body1" sx={{ color: "red" }}>
                                    {resetError}
                                </Typography>
                            )
                        }
                        <Button disabled={(loading || successMessage)?  true: false} type='Submit' fullWidth size="large" variant='contained' sx={{ mt: 2 }}>
                            reset
                        </Button>
                    </Box>
                </Paper>
            </Container>

            {
                successMessage ? (
                    <Alert sx={{ position: "fixed", top: "2%", left: "50%", transform: "translateX(-50%)" }} onClose={() => { setSuccessMessage("") }}>
                        {successMessage}
                    </Alert>
                ) : ""
            }
        </Box>
    )
}

export default ResetPassword
