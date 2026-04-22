import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../../redux/themeSlice'
import { Icon, IconButton, useTheme } from '@mui/material'
import { Typography, AppBar, Toolbar, Box, Button } from '@mui/material'
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { NavLink } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import totalItem from '../../utils/TotalItem'
import HeaderDrawer from '../HeaderDrawer/HeaderDrawer'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Header = () => {


  const [open, setOpen] = useState(false)
  const onClose = () => {
    setOpen(false)
  }

  const { mode } = useSelector((state) => {
    return state.theme
  })

  const { cartList } = useSelector((state) => {
    return state.cartList
  })

  const dispatch = useDispatch()
  const theme = useTheme()


  return (
    <>
      <AppBar position="sticky" elevation={0}  sx={{ color: "primary.main", backgroundColor: "card.main", boxShadow: `0px 4px 12px ${theme.palette.primary.main}`, maxWidth: "1536px", mx: "auto" }}>
        <Toolbar sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 2fr 1fr" }, backgroundColor: "transparent" }}>
          <Typography variant="h3" component="h1">
            LOGO
          </Typography>
          <Box sx={{ justifyContent: "center", gap: { md: "10px", lg: 4 }, color: "primary.main", display: { xs: "none", md: "flex" } }}>
            <Box to="/" sx={{ textDecoration: "none", "&.active": { color: "nav.main" }, "&.active": { color: "nav.main" }, color: "primary.main" }} component={NavLink}>
              <Typography variant='h6' component="h2" sx={{ fontWeight: "inherit", color: "inherit" }}>
                HOME
              </Typography>
            </Box>
            <Box to="/about" sx={{ textDecoration: "none", "&.active": { color: "nav.main" }, color: "primary.main" }} component={NavLink}>
              <Typography variant='h6' component="h2" sx={{ color: "inherit" }}>
                ABOUT
              </Typography>
            </Box>
            <Box to="/men" sx={{ textDecoration: "none", "&.active": { color: "nav.main" }, color: "primary.main" }} component={NavLink}>
              <Typography variant='h6' component="h2" sx={{ color: "inherit" }}>
                MEN
              </Typography>
            </Box>
            <Box to="/women" sx={{ textDecoration: "none", "&.active": { color: "nav.main" }, "&.active": { color: "nav.main" }, color: "primary.main" }} component={NavLink}>
              <Typography variant='h6' component="h2" sx={{ color: "inherit" }}>
                WOMEN
              </Typography>
            </Box>
            <Box to="/kids" sx={{ textDecoration: "none", "&.active": { color: "nav.main" }, color: "primary.main" }} component={NavLink}>
              <Typography variant='h6' component="h2" sx={{ color: "inherit" }}>
                KIDS
              </Typography>
            </Box>


          </Box>
          <Box sx={{ display: "flex", justifyContent: "end", alignItems: "center", gap: { md: 0, lg: 1 }, color: "primary.main" }}>
            <Box component={NavLink} to="/cart" sx={{ "&.active": { color: "nav.main" }, color: "primary.main" }} >
              <Badge sx={{ color: "inherit", display: { xs: "none", sm: "block" } }} badgeContent={totalItem(cartList)} showZero>
                <ShoppingCartIcon sx={{ color: "inherit" }} />
              </Badge>
            </Box>
            <Box component={NavLink} to="/account/profile" sx={{ "&.active": { color: "nav.main" }, color: "primary.main" }} >
              <IconButton sx={{ display: { xs: "none", sm: "block", color: "inherit" } }}>
                <PersonIcon sx={{ color: "inherit" }} />
              </IconButton>
            </Box>
            <IconButton sx={{ display: { xs: "none", sm: "block" } }} onClick={() => dispatch(toggleTheme())}>
              {mode ? <DarkModeIcon sx={{ color: "primary.main" }} /> : <LightModeIcon sx={{ "&.active": { color: "nav.main" }, color: "primary.main" }} />}
            </IconButton>
            <IconButton sx={{ display: { xs: "none", sm: "block" } }}>
              <Box component={NavLink} to="/wish-list" sx={{ justifyItems: "center", alignItems: "center", "&.active": { color: "nav.main" }, color: "primary.main"  }}>
                <FavoriteIcon sx={{ color: "inherit" }} />
              </Box>
            </IconButton>
            <IconButton sx={{ display: { xs: "none", sm: "block" } }}>
              <Box component={NavLink} to="/dashboard" sx={{ justifyItems: "center", alignItems: "center", "&.active": { color: "nav.main" }, color: "primary.main"  }}>
                <DashboardIcon sx={{ color: "inherit" }} />
              </Box>
            </IconButton>
            <Box>
              <IconButton sx={{ display: { xs: "block", md: "none"} }} onClick={() => setOpen(true)}>
                <MenuIcon sx={{ color: "primary.main"}} />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <HeaderDrawer onClose={onClose} open={open} setOpen={setOpen} ></HeaderDrawer>
    </>
  )
}

export default Header








