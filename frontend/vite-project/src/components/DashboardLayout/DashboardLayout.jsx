import React, { useState } from 'react'
import { Box, Container, IconButton } from '@mui/material'
import DashboardHeader from '../DashboardHeader/DashboardHeader'
import { Outlet } from 'react-router-dom'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const DashboardLayout = () => {

  return (
    <Box>
      <DashboardHeader />
      <Container maxWidth="xl">
        <Box>
          <Outlet />
        </Box>
      </Container>
    </Box>

  )
}

export default DashboardLayout
