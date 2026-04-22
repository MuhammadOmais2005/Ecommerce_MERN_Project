import React, { useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { Box, Container } from '@mui/material'

const About = () => {
  return (
    <Container sx={{mt: 6}}>
        <Box>
        <Typography variant="h3" sx={{color: "primary.main", textAlign: "center"}}>
            About
        </Typography>
        <Typography variant="h6" sx={{color: "primary.main", textAlign: "center", width: {lg: "70%"}, mx: "auto", mt: 3}}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque cupiditate dignissimos dolorem porro cumque harum non id! Ipsam, enim soluta quos saepe voluptate nihil nisi explicabo architecto! Veritatis, reprehenderit hic.
        </Typography>
    </Box>
    </Container>
  )
}

export default About
