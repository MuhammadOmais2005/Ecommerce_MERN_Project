import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  IconButton,
  InputAdornment,
  Alert
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewAccount } from "../../redux/dashboardAuthSlice";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ForgotPasswordDialog from "../../components/ForgotPasswordDialog/ForgotPasswordDialog";
import DashboardProtectedRoute from "../../components/DashboardProtectedRoute/DashboardProtectedRoute";
import { useEffect } from "react";


const DashboardLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm();

  const checkAuthorization = async (token) => {
    try {
      const response = await fetch("http://localhost:4000/protected-route", {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      const result = await response.json()
      if (response.ok) {
        if (result.success) {
          setSuccessMessage("Login successfully.")
          setTimeout(() => {
            setSuccessMessage("")
            navigate("/dashboard")
          }, 3000)
          return
        }
        return
      }

      alert(result.message || "Something went wrong.")
    } catch (err) {
      console.log(err)
      alert(err.message || "Something went wrong.")
    }
  }

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "adminCurrentAccount") {
        const updated = JSON.parse(event.newValue);
        checkAuthorization(updated?.[0]?.token)
      }

      // if (event.key === "adminAccountList") {
      //   const updatedList = JSON.parse(event.newValue);

      //   dispatch(setAccountList(updatedList));
      // }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);


  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    clearErrors()
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...formData, role: "admin" })
      });

      const result = await response.json();
      console.log(result)

      if (!response.ok || !result.success) {
        setError("root", {
          type: "server",
          message: result?.message || "Invalid credentials"
        });
        return;
      }

      setSuccessMessage("Login successfully.")
      setTimeout(() => {
        setSuccessMessage("")
        dispatch(addNewAccount({ username: result.data.username, email: formData.email, token: result.data.token, id: result.data.id }))

        navigate("/dashboard", { replace: true })
      }, 3000)


    } catch (err) {
      console.log(err)
      setError("root", {
        type: "server",
        message: err?.message || "Something went wrong"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (

    <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ p: 4, my: 8, mx: 3 }}>
        <Box component={NavLink} to="/" sx={{ textDecoration: "none", color: "primary.main" }}>
          <Typography variant="h3" textAlign="center" mb={1}>
            LOGO
          </Typography>
        </Box>
        <Typography variant="h4" textAlign="center" mb={3}>
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>

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

          {/* Password */}
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            {...register("password", {
              required: "Password is required"
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

          {/* Server Error */}
          <Typography variant="body2" sx={{ color: "red" }}>
            {errors?.root?.message}
          </Typography>

          {/* Submit Button */}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            disabled={isSubmitting}
            sx={{ mt: 3, backgroundColor: "card.main", color: "secondary.main", py: 1.8 }}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>


          <Box sx={{ textAlign: "center" }}>
            <Button onClick={() => setOpen(true)}>
              <Typography sx={{ textTransform: "capitalize", color: "primary.main" }} variant="body1">
                Fortgot password
              </Typography>
            </Button>
          </Box>

        </Box>
      </Paper>


      {
        successMessage ? (
          <Alert sx={{ zIndex: 1000, position: "fixed", top: "2%", left: "50%", transform: "translateX(-50%)" }} onClose={() => { setSuccessMessage("") }}>
            {successMessage}
          </Alert>
        ) : ""
      }

      <ForgotPasswordDialog role={"admin"} open={open} setOpen={setOpen} />
    </Container>



  );
};

export default DashboardLogin;
