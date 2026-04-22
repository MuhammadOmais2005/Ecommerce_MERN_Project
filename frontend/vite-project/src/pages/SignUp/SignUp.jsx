import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  IconButton,
  InputAdornment, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import AccountAuthProtected from "../../components/AccountAuthProtected/AccountAuthProtected";
import { result } from "lodash";

const SignUp = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [showOtpDialog, setShowOtpDialog] = useState(false)
  const [registerData, setRegisterData] = useState("")
  const [verificationError, setVerificationError] = useState("")
  const [verifying, setVerifying] = useState(false)
  const [time, setTime] = useState(60)


  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm();

  const onSubmit = async (formData) => {
    console.log(formData);
    setIsSubmitting(true)
    try {
      clearErrors()
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        body: JSON.stringify({ ...formData, role: "user" }),
        headers: {
          "Content-Type": "application/json"
        },
      })
      const responseData = await response.json()
      console.log(responseData)
      if (!responseData.success || !response.ok) {
        setError("root", {
          type: "server",
          message: responseData?.message || "something went wrong"
        });
        return
      }
      // if(searchParams.get("redirect") && searchParams.get("redirect")=="checkout"){
      //   navigate("/login?redirect=checkout", {replace: true})
      //   alert("User registered successfully") 
      //   return 
      // }
      // navigate("/login", {replace: true})
      // alert("User registered successfully") 
      setRegisterData(responseData.data)
      setShowOtpDialog(true)
    } catch (err) {
      console.log(err)
      setError("root", {
        type: "server",
        message: err?.message || "something went wrong"
      })
    } finally {
      setIsSubmitting(false)
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    if (showOtpDialog) {
      const timeInterval = setInterval(() => {
        setTime((prev) => {
          if (prev > 0) {
            return prev - 1
          }
          return 0
        })
      }, 1000)
      return () => { clearInterval(timeInterval) }
    }
  }, [showOtpDialog])

  const handleVerify = async () => {
    setVerifying(true)
    try {
      console.log(registerData)
      console.log(otp)
      console.log(...otp.join(","))
      console.log({ email: registerData.email, otp, role: "user" })
      const response = await fetch("http://localhost:4000/verify", {
        method: "post",
        body: JSON.stringify({ email: registerData.email, otp: otp.join(""), role: "user" }),
        headers: {
          "Content-Type": "application/json"
        },
      })
      // console.log(response)

      const result = await response.json()
      console.log(result)
      if (result.success) {
        if (searchParams.get("redirect") && searchParams.get("redirect") == "checkout") {
          navigate("/login?redirect=checkout", { replace: true })
          alert("User registered successfully")
          setShowOtpDialog(false)
          setOtp(["", "", "", ""])
          setVerificationError("")
          clearErrors()
          return
        }
        navigate("/login", { replace: true })
        alert("User registered successfully")
        setShowOtpDialog(false)
        setOtp(["", "", "", ""])
        setVerificationError("")
        clearErrors()
        return
      }
      setVerificationError(result.message)
      alert("verification failed")

    } catch (err) {
      console.log(err)
      setVerificationError(err.message || "Something went wrong.")
    } finally {
      setVerifying(false)
    }
  }

  return (
    <AccountAuthProtected>
      <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <Paper elevation={3} sx={{ p: 4, my: 8, mx: 3 }}>
          <Box component={NavLink} to="/" sx={{ textDecoration: "none", color: "primary.main" }}>
            <Typography variant="h3" textAlign="center" mb={1}>
              LOGO
            </Typography>
          </Box>
          <Typography variant="h4" textAlign="center" mb={3}>
            Sign Up
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>

            {/* Username */}
            <TextField
              fullWidth
              label="Username"
              margin="normal"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters"
                }
              })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />

            {/* Email */}
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address"
                }
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            {/* Password with Toggle Eye */}
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              margin="normal"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Min 8 chars, 1 letter, 1 number & 1 special character"
                }
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Typography variant="body2" sx={{ color: "red" }}>
              {errors?.root?.message}
            </Typography>

            <Button
              fullWidth
              type="submit"
              size="large"
              variant="contained"
              disable={isSubmitting ? true : false}
              sx={{ mt: 3, backgroundColor: "card.main", color: "secondary.main", py: 1.8 }}
            >
              {isSubmitting ? "Signing in" : "Sign Up"}
            </Button>

            <Typography mt={2} textAlign="center">
              Already have an account?{" "}
              <NavLink
                to={`/login${searchParams.get("redirect") == "checkout" ? "/?redirect=checkout" : ""}`}
                style={{ textDecoration: "none", color: "#1976d2" }}
              >
                Login
              </NavLink>
            </Typography>

          </Box>
        </Paper>
        <Dialog open={showOtpDialog} sx={{ backgroundColor: "background.default" }} onClose={() => {
          setShowOtpDialog(false),
            setOtp(["", "", "", ""]),
            setVerificationError("")
          clearErrors()
          setTime(60)
        }}>
          <DialogTitle>

          </DialogTitle>
          <DialogContent sx={{ mt: { lg: 3 }, color: "primary.main" }}>
            <DialogContentText>
              <Box sx={{ mb: { xs: 3, sm: 5, lg: 6 } }}>
                <Typography variant="body1" color="inherit" sx={{ textAlign: "center" }}>
                  Enter a OTP code that has been send to your email.
                </Typography>
                <Typography variant="body1" color="inherit" sx={{ textAlign: "center", color: "secondary.main", overflowWrap: "break-word" }}>
                  {registerData.email}
                </Typography>
                <Typography variant="body1" color="inherit" sx={{ textAlign: "center" }}>
                  Otp will be expired after one minute.
                </Typography>
                <Box>
                  {time == 0 ? (
                    <Typography variant="h6" color="inherit" sx={{ textAlign: "center", color: "secondary.main" }}>
                      Time has left
                    </Typography>
                  ) : (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "baseline" }}>
                      <Typography variant="h4" color="inherit" sx={{ textAlign: "center" }}>
                        {time}
                      </Typography>
                      <Typography variant="h5">s</Typography>

                    </Box>
                  )}
                </Box>

              </Box>
              <Box sx={{ mb: { xs: 2, lg: 6 }, gap: { xs: 1, sm: 2, md: 2, lg: 3, xl: 3 }, mx: "auto", justifyContent: "center" }} display="flex">
                {otp.map((digit, index) => (
                  <TextField
                    key={index}
                    size="large"
                    id={`otp-${index}`}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    inputProps={{ maxLength: 1, style: { textAlign: "center", aspectRatio: "1/1" } }}
                  />
                ))}
              </Box>
              <Box>
                <Typography variant="body1" sx={{ color: "red" }}>
                  {verificationError}
                </Typography>
              </Box>

            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ mb: { xs: 3, lg: 6 } }}>
            <Button
              disabled={verifying}
              variant="contained"
              onClick={handleVerify}
              color="primary"
            >
              {verifying ? "Verifying" : "Verify"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setShowOtpDialog(false),
                  setOtp(["", "", "", ""]),
                  setVerificationError("")
                clearErrors();
                setTime(60)
              }}
              color="primary"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </AccountAuthProtected>

  );
};

export default SignUp;
