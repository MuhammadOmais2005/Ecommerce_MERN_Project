import React, { useState } from 'react'
import { Box, Drawer, Paper, IconButton, Container, Typography } from '@mui/material'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { NavLink } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../../redux/themeSlice'

const DashboardDrawer = ({ open, setOpen }) => {
  const { mode } = useSelector((state) => {
    return state.theme
  })
  const dispatch = useDispatch()

  return (
    <Drawer elevation={8} open={open} onClose={() => setOpen(false)} sx={{ overflow: "hidden" }} >
      <Box sx={{ width: "300px", position: "relative", backgroundColor: "", height: "100%", overflow: "hidden", py: { xs: 3, lg: 4 }, display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>


        <Box sx={{display: "flex", alignItems: "center", justifyContent: "flex-end", gap: {xs: 1}, px: { xs: 2, lg: 3 }, mb: {xs: 3, sm: 4, lg: 5}}}>
          <IconButton sx={{display: {xs: "block", sm: "none"}}}>
            <PersonIcon sx={{ color: "primary.main" }} />
          </IconButton>

          <IconButton sx={{display: {xs: "block", sm: "none"}}} onClick={() => dispatch(toggleTheme())}>
            {mode ? <DarkModeIcon sx={{ color: "primary.main" }} /> : <LightModeIcon sx={{ "&.active": { color: "nav.main" }, color: "primary.main" }} />}
          </IconButton>

          
          <IconButton>
            <CloseIcon onClick={()=>setOpen(false)} sx={{ color: "primary.main" }} />
          </IconButton>


        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>


          <Box to="" onClick={()=>setOpen(close)} sx={{ textDecoration: "none", px: { xs: 2, lg: 3 }, py: { xs: 1, lg: 2 }, "&:hover": { backgroundColor: "card.main" }, "&.active": { backgroundColor: "card.main" } }} component={NavLink} end={true}>
            <Typography variant="h6" sx={{ color: "primary.main" }}>
              Overview
            </Typography>
          </Box>
          <Box to="products-management" onClick={()=>setOpen(close)}  sx={{ textDecoration: "none", px: { xs: 2, lg: 3 }, py: { xs: 1, lg: 2 }, "&:hover": { backgroundColor: "card.main" }, "&.active": { backgroundColor: "card.main" } }} component={NavLink}>
            <Typography variant="h6" sx={{ color: "primary.main" }}>
              Proudcts
            </Typography>
          </Box>
          <Box to="orders-management" onClick={()=>setOpen(close)}  sx={{ textDecoration: "none", px: { xs: 2, lg: 3 }, py: { xs: 1, lg: 2 }, "&:hover": { backgroundColor: "card.main" }, "&.active": { backgroundColor: "card.main" } }} component={NavLink}>
            <Typography variant="h6" sx={{ color: "primary.main" }}>
              Orders
            </Typography>
          </Box>
          <Box to="analytics" onClick={()=>setOpen(close)}  sx={{ textDecoration: "none", px: { xs: 2, lg: 3 }, py: { xs: 1, lg: 2 }, "&:hover": { backgroundColor: "card.main" }, "&.active": { backgroundColor: "card.main" } }} component={NavLink}>
            <Typography variant="h6" sx={{ color: "primary.main" }}>
              Analytics
            </Typography>
          </Box>

        </Box>

      </Box>

    </Drawer>
  )
}

export default DashboardDrawer
