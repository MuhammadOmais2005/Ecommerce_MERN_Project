import React from 'react'
import { Box, Typography, Paper, Container, IconButton } from '@mui/material'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useState } from 'react';
import DashboardDrawer from '../DashboardDrawer/DashboardDrawer'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../../redux/themeSlice'
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';

const DashboardHeader = () => {
  const [open, setOpen] = useState(false
    
  );
  const onClose = () => {
    setOpen(false)
  }
  const { mode } = useSelector((state) => {
    return state.theme
  })
  const dispatch = useDispatch()
  return (
    <Box sx={{ position: "sticky", top: 0, left: 0, mx: "auto", width: "100%", zIndex: "100", maxWidth: "1550px", mx: "auto" }}>
      {/* <Container maxWidth="xl" > */}
      <Paper elevation={8} sx={{ width: "100%", px: 4, position: "", top: 0 }}>
        <Box sx={{ height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0, lg: 2 } }}>


            <Box component={NavLink} to="/">
              <IconButton>
                <ExitToAppIcon sx={{ color: "primary.main" }} />
              </IconButton>
            </Box>
            <Box component={NavLink} to="/dashboard" sx={{textDecoration: "none"}}>
              <Typography variant="h4" sx={{ color: "primary.main" }}>
              LOGO
            </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: { xs: 0, lg: 2 }, alignItems: "center" }}>
            <IconButton sx={{display: {xs: "none", sm: "block"}}} onClick={() => dispatch(toggleTheme())}>
              {mode ? <DarkModeIcon sx={{ color: "primary.main" }} /> : <LightModeIcon sx={{ "&.active": { color: "nav.main" }, color: "primary.main" }} />}
            </IconButton>


            <Box component={NavLink} to="/dashboard/profile">
              <IconButton sx={{display: {xs: "none", sm: "block"}}}>
              <PersonIcon sx={{ color: "primary.main" }} />
            </IconButton>
            </Box>


            <IconButton onClick={() => setOpen(true)}>
              <MenuIcon sx={{ color: "primary.main" }} />
            </IconButton>


          </Box>
        </Box>



      </Paper>
      {/* </Container> */}
      <DashboardDrawer open={open} setOpen={setOpen} />
      <IconButton onClick={() => setOpen((prev) => (!prev))} sx={{ position: "fixed", top: 0, transitionDuration: "2s", left: open ? "300px" : "-100px", zIndex: 1000, background: "" }}>
        {
          !open ? <ExitToAppIcon sx={{ color: "white", zIndex: 100 }} /> : <ExitToAppIcon sx={{ transform: "rotate(180deg)", color: "white", zIndex: 10000 }} />
        }
      </IconButton>
    </Box>
  )
}

export default DashboardHeader
