import React from 'react'
import { Box, Container, IconButton, Typography } from '@mui/material'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import { FaFacebookF } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useTheme } from '@mui/material';



const Footer = () => {

    const theme = useTheme()

    return (

        // <Box Box sx={{ mx: "", maxWidth: "1536px" }}>
            <Container maxWidth="xl" sx={{ backgroundColor: "card.main", mx: "auto", mt: 6 }}>
                <Box sx={{ color: "primary.main", py: { xs: 4, md: 6 } }}>
                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "3fr ", sm: "3fr 2fr", md: "3fr 2fr 2fr 3fr" }, gap: { xs: 4, sm: 4 } }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Typography variant="body1" sx={{ color: "secondary.main" }}>
                                Company
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                <Typography variant="body2" color="inherit">
                                    Shipping Information
                                </Typography>
                                <Typography variant="body2" color="inherit">
                                    Return & Exchange
                                </Typography>
                                <Typography variant="body2" color="inherit">
                                    Terms & Conditions
                                </Typography>
                                <Typography variant="body2" color="inherit">
                                    Private Policy
                                </Typography>
                                <Typography variant="body2" color="inherit">
                                    Customer Care & Help
                                </Typography>
                                <Typography variant="body2" color="inherit">
                                    FAQs
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Typography variant="body1" sx={{ color: "secondary.main" }}>
                                Information
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                <Typography variant="body2" color="inherit">
                                    Size Guide
                                </Typography>
                                <Typography variant="body2" color="inherit">
                                    Quality
                                </Typography>
                                <Typography variant="body2" color="inherit">
                                    About Us
                                </Typography>
                                <Typography variant="body2" color="inherit">
                                    Career
                                </Typography>
                                <Typography variant="body2" color="inherit">
                                    FAQs
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Typography variant="body1" sx={{ color: "secondary.main" }}>
                                Follow Us
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                    <IconButton sx={{ backgroundColor: "secondary.main" }}>
                                        <FaFacebookF size={20} style={{ color: `${theme.palette.primary.main}` }} />
                                    </IconButton>
                                    <Typography variant="body2" color="inherit">
                                        Facebook
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                    <IconButton sx={{ backgroundColor: "secondary.main" }}>
                                        <FaInstagramSquare size={20} style={{ color: `${theme.palette.primary.main}` }} />
                                    </IconButton>
                                    <Typography variant="body2" color="inherit">
                                        Instagram
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                    <IconButton sx={{ backgroundColor: "secondary.main" }}>
                                        <FaXTwitter size={20} style={{ color: `${theme.palette.primary.main}` }} />
                                    </IconButton>
                                    <Typography variant="body2" color="inherit">
                                        X/Twitter
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                    <IconButton sx={{ backgroundColor: "secondary.main" }}>
                                        <FaYoutube size={20} style={{ color: `${theme.palette.primary.main}` }} />
                                    </IconButton>
                                    <Typography variant="body2" color="inherit">
                                        Youtube
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Typography variant="body1" sx={{ color: "secondary.main" }}>
                                Contact Us
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                    <IconButton sx={{ backgroundColor: "secondary.main" }}>
                                        <LocalPhoneIcon fontSize='small' sx={{ color: "primary.main" }} />
                                    </IconButton>
                                    <Typography variant="body2" color="inherit">
                                        +923459812983 UAN Pakistan
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                    <IconButton sx={{ backgroundColor: "secondary.main" }}>
                                        <LocalPhoneIcon fontSize='small' sx={{ color: "primary.main" }} />
                                    </IconButton>
                                    <Typography variant="body2" color="inherit">
                                        +923459812983 UAN International
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                    <IconButton sx={{ backgroundColor: "secondary.main" }}>
                                        <LocationPinIcon fontSize='small' sx={{ color: "primary.main" }} />
                                    </IconButton>
                                    <Typography variant="body2" color="inherit">
                                        Karachi, Pakistan
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: { xs: "column", md: "row" }, gap: { xs: 1, md: 2 }, py: 2, borderTop: "1px solid white" }}>
                    <Typography variant="caption" color="inherit">
                        {`© ${new Date().getFullYear()} My Company. All rights reserved.`}
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: { xs: "1px", sm: 2 } }}>
                        <Typography variant="caption" color="inherit">
                            Terms & Condition
                        </Typography>
                        <Typography variant="caption" color="inherit">
                            Private & Policy
                        </Typography>
                        <Typography variant="caption" color="inherit">
                            Contact
                        </Typography>
                    </Box>
                </Box>
            </Container>
        // </Box>
    )
}

export default Footer
