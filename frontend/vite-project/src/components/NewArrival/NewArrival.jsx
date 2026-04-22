import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const NewArrival = () => {
    return (
        <Container maxWidth="lg" sx={{ mb: 12 }}>
            <Typography variant="h4" sx={{ color: "primary.main", textAlign: "center", mb: 4, fontWeight: 400 }}>
                TOP PICKS FOR YOU
            </Typography>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "5fr 6fr" },
                    gap: { xs: 2, md: 3 }
                }}
            >

                <Box component={NavLink} to="/men" sx={{ width: "100%", height: { xs: "450px", sm: "500px", md: "550px", lg: "600px"}, position: "relative", overflow: "hidden", cursor: "pointer", borderRadius: 6 }}>
                    <Box
                        component="img"
                        src="https://www.mariab.pk/cdn/shop/files/MBM2P-SS26-05AirforceBlueFront_A.jpg?v=1772202471"
                        sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 2, objectPosition: "top", transitionDuration: "0.7s", "&:hover": { transform: "scale(1.05)" } }}
                    />
                    <Typography sx={{ position: "absolute", bottom: "5%", textAlign: "center", width: "100%", backgroundColor: "rgba(255,255,255,0.3)", backdropFilter: "blur(30px)", py: 1, color: "black" }} variant="h5">MEN</Typography>
                </Box>

                <Box sx={{ width: "100%", height: { xs: "450px", sm: "500px", md: "550px", lg: "600px" }, display: "grid", gridTemplateRows: { xs: "8fr 9fr" }, gap: { xs: 1 } }}>
                    < Box component={NavLink} to="/women" sx={{ width: "100%", height: "100%", overflow: "hidden", position: "relative", overflow: "hidden", cursor: "pointer", borderRadius: 6}}>
                        <Box
                            component="img"
                            src="https://www.mariab.pk/cdn/shop/files/Pret_web_banner_2880X1620_f61d3ea3-71e6-40ce-b47e-dbece8c2e69a.jpg?v=1771565227&width=1500"
                            sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 2, objectPosition: "center 3%", transitionDuration: "0.7s", "&:hover": { transform: "scale(1.05)" }  }}
                        />
                        <Typography sx={{ position: "absolute", bottom: "5%", textAlign: "center", width: "100%", backgroundColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(30px)", py: 1, color: "black" }} variant="h6">WOMEN</Typography>
                    </Box>
                    <Box sx={{
                        display: "grid", gridTemplateColumns: "1fr 1fr", gap: {
                            xs: 1, md: 3

                        }, width: "100%", height: "100%",
                    }}>
                        <Box component={NavLink} to="/kids" sx={{ position: "relative", overflow: "hidden", cursor: "pointer", borderRadius: 6 }}>
                            <Box
                                component="img"
                                src="https://www.mariab.pk/cdn/shop/files/Kids_New_In_1050X1200_3244c4fe-1f24-4aa9-b0e8-de17cbc24c98.jpg?v=1769418485&width=1500"
                                sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 2, transitionDuration: "0.7s",  "&:hover": { transform: "scale(1.05)" } }}
                            />
                            <Typography sx={{ position: "absolute", bottom: "5%", textAlign: "center", width: "100%", backgroundColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(30px)", py: 1, color: "black" }} variant="h6">KIDS</Typography>
                        </Box>
                        <Box component={NavLink} to="/" sx={{ position: "relative", overflow: "hidden", cursor: "pointer", borderRadius: 6}}>
                            <Box
                                component="img"
                                src="https://www.mariab.pk/cdn/shop/files/Perfume_New_In_1050X1200_45fafa3f-afe9-4b31-9917-8c1ca6246340.jpg?v=1768384230&width=1500"
                                sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 2, transitionDuration: "0.7s", "&:hover": { transform: "scale(1.05)" }  }}
                            />
                            <Typography sx={{ position: "absolute", bottom: "5%", textAlign: "center", width: "100%", backgroundColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(30px)", py: 1, color: "black" }} variant="h6">PERFUMES</Typography>
                        </Box>
                    </Box>
                </Box>

            </Box>




        </Container>
    );
};

export default NewArrival;