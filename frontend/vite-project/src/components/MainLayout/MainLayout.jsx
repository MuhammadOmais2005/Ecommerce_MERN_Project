import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import { Box } from '@mui/material'
import Footer from '../Footer/Footer'
import { ScrollRestoration } from 'react-router-dom'



const MainLayout = () => {
  return (
    <>
      <ScrollRestoration />
      <Box sx={{ backgroundColor: "background.default", display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <Box sx={{flexGrow: 1}}>
        <Outlet />
        </Box>
        <Footer />
      </Box>
    </>
  )
}

export default MainLayout
