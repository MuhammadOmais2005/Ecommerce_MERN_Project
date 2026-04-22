import { Box, Typography } from '@mui/material'
import React from 'react'

const Overview = () => {
  return (
    <Box sx={{ mt: { xs: 2, sm: 3, lg: 4 } }}>
      <Typography variant="h4" sx={{ color: "primary.main", fontWeight: "500" }}>
        OVERVIEW
      </Typography>
    </Box>
  )
}

export default Overview
