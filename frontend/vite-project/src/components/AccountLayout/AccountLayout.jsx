import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Typography, Container } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { ScrollRestoration } from 'react-router-dom'

const AccountLayout = () => {

  const [isAuthorized, setIsAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)
  const { accountList, currentAccount } = useSelector((state) => {
    return state.accountList
  });
  const navigate = useNavigate()
  const authorize = async (token) => {
    try {
      const response = await fetch("http://localhost:4000/protected-route", {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          setIsAuthorized(true)
          return
        }
        alert(result?.message)
        navigate("/login", { replace: true });
        return
      }
      navigate("/login", { replace: true });

    } catch (err) {
      alert(err.message)
      navigate("/login", { replace: true });
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (currentAccount?.[0]) {
      authorize(currentAccount[0]?.token)
      return
    } else {
      navigate("/login", { replace: true });
    }
  }, [accountList])
  if (loading) {
    return (
      <Box sx={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="body1" sx={{ color: "primary.main" }}>
          Loading...
        </Typography>
      </Box>
    )
  }
  if (isAuthorized) {
    return (

      <Box sx={{}}>
        <ScrollRestoration />
        <Container>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "primary.main" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 4 }}>
              <Box component={NavLink} to="/" sx={{ textDecoration: "none", "&.active": { color: "nav.main" } }} color="inherit">
                <Typography variant="h3" color="inherit">
                  LOGO
                </Typography>
              </Box>
              <Box component={NavLink} to="/account/profile" sx={{ textDecoration: "none", color: "primary.main", "&.active": { color: "nav.main" } }}>
                <Typography variant="h6" color="inherit">
                  Profile
                </Typography>
              </Box>
              <Box component={NavLink} to="/account/orders" sx={{ textDecoration: "none", "&.active": { color: "nav.main" } }} color="inherit">
                <Typography variant="h6" color="inherit">
                  Orders
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "flex-end", gap: 3 }}>
              {/* <Typography variant="h6" color="inherit">
                LogOut
              </Typography>
              <Typography variant="h6" color="inherit">
                Delete Account
              </Typography> */}
            </Box>
          </Box>
        </Container>
        <Box>
          {
            (currentAccount?.length != 0) && (<Outlet />)
          }
        </Box>
      </Box>
    )
  }
}

export default AccountLayout
