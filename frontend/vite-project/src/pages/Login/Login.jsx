import React, { useEffect, useState } from "react";
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
import { addNewAccount } from "../../redux/accountListSlice";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ForgotPasswordDialog from "../../components/ForgotPasswordDialog/ForgotPasswordDialog";
import AccountAuthProtected from "../../components/AccountAuthProtected/AccountAuthProtected";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch()
  const [searchParams, setSetSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm();



  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    clearErrors()
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...formData, role: "user" })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError("root", {
          type: "server",
          message: result?.message || "Invalid credentials"
        });
        return;
      }



      // // Example: store token
      // localStorage.setItem("MyAccountList", JSON.stringify([]) ) 
      

      setSuccessMessage("Login successful!")

      const timeout = setTimeout(() => {
        // dispatch(addNewAccount({ username: result.data.username, email: formData.email, token: result.data.token, id: result.data.id }))
        if (searchParams.get("redirect") && searchParams.get("redirect") == "checkout") {
          dispatch(addNewAccount({ username: result.data.username, email: formData.email, token: result.data.token, id: result.data.id }))
          navigate("/checkout")
          return;
        } else {
          dispatch(addNewAccount({ username: result.data.username, email: formData.email, token: result.data.token, id: result.data.id }))
          navigate("/account/profile")
        }
      }, 3000)


    } catch (err) {
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
    <AccountAuthProtected>
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

            {/* Signup Link */}
            <Typography mt={2} textAlign="center">
              Don’t have an account?{" "}
              <NavLink
                to={`/signup${searchParams.get("redirect") == "checkout" ? "/?redirect=checkout" : ""}`}
                style={{ textDecoration: "none", color: "#1976d2" }}
              >
                Sign Up
              </NavLink>
            </Typography>


            <Box sx={{ textAlign: "center" }}>
              <Button onClick={() => setOpen(true)}>
                <Typography sx={{ textTransform: "capitalize", color: "primary.main" }} variant="body1">
                  Fortgot password
                </Typography>
              </Button>
            </Box>

          </Box>
        </Paper>

        <ForgotPasswordDialog role={"user"} open={open} setOpen={setOpen} />

        {
          successMessage ? (
            <Alert sx={{ position: "fixed", top: "2%", left: "50%", transform: "translateX(-50%)" }} onClose={() => { setSuccessMessage("") }}>
              {successMessage}
            </Alert>
          ) : ""
        }
      </Container>
    </AccountAuthProtected>

  );
};

export default Login;
