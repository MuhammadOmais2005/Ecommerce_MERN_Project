import { Box, Container, Typography } from '@mui/material'
import { useSelector } from 'react-redux';

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTheme } from '@mui/material';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

const Testimonials = () => {

    const theme = useTheme()

    const { mode } = useSelector((state) => {
        return state.theme
    })

    const testimonials = [
        {
            name: "Ayesha Khan",
            designation: "Fashion Blogger",
            image: "https://wion-reactjs-rktheme.vercel.app/assets/images/testimonial/t2.png",
            message:
                "I absolutely love the quality and comfort of this brand. The fabric feels premium, stitching is flawless, and every outfit fits perfectly. I’ve styled their pieces multiple times, and they always look elegant and modern. Highly recommended for everyday wear."
        },
        {
            name: "Usman Ali",
            designation: "Entrepreneur",
            message:
                "I absolutely love the quality and comfort of this brand. The fabric feels premium, stitching is flawless, and every outfit fits perfectly. I’ve styled their pieces multiple times, and they always look elegant and modern. Highly recommended for everyday wear.",
            image: "https://wion-reactjs-rktheme.vercel.app/assets/images/testimonial/t1.png",
        },
        {
            name: "Sara Ahmed",
            designation: "Content Creator",
            message:
                "I absolutely love the quality and comfort of this brand. The fabric feels premium, stitching is flawless, and every outfit fits perfectly. I’ve styled their pieces multiple times, and they always look elegant and modern. Highly recommended for everyday wear.",
            image: "https://wion-reactjs-rktheme.vercel.app/assets/images/testimonial/t2.png",
        },
        {
            name: "Hassan Raza",
            designation: "Marketing Manager",
            message:
                "I absolutely love the quality and comfort of this brand. The fabric feels premium, stitching is flawless, and every outfit fits perfectly. I’ve styled their pieces multiple times, and they always look elegant and modern. Highly recommended for everyday wear.",
            image: "https://wion-reactjs-rktheme.vercel.app/assets/images/testimonial/t1.png",
        }
    ];

    return (
        <Container sx={{ mb: 12, display: "flex", flexDirection: "column", gap: 4 }}>
            <Box>
                <Typography variant="h4" sx={{ color: "primary.main", textAlign: "center", fontWeight: 400, mb: 4 }}>
                    TESTIMONAILS
                </Typography>
            </Box>
            <Box>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 0,
                        },
                        300: {
                            slidesPerView: 1,
                            spaceBetween: 0,
                        },
                        600: {
                            slidesPerView: 2,
                            spaceBetween: 0,
                        },
                        1200: {
                            slidesPerView: 3,
                            spaceBetween: 0,
                        },
                        1536: {
                            slidesPerView: 3,
                            spaceBetween: 0,
                        },
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                    style={{ alignItems: 'stretch', paddingBottom: "50px"}}
                >
                    {
                        testimonials?.map((item) => {
                            return (
                                <SwiperSlide>

                                        <Box sx={{width: "100%", aspectRatio: "", p: "20px" }}>
                                    <Box sx={{ display: "flex",  display: "flex", py: "50px", backgroundColor: theme.palette.card.main,  alignItems: "center", flexDirection: "column", justifyContent: "center", width: "calc(100% - 40px)", height: "100%", gap: 2, position: 'relative',  boxShadow: mode ? "0px 4px 20px rgba(0,0,0,0.3)" : "0px 4px 20px rgba(255,255,255,0.5)" }}>
                                            <Box sx={{ width: "24%", borderRadius: "100%", }} component="img" src={item.image}>
                                            </Box>
                                            <Box>
                                                <Typography variant="body1" sx={{ textAlign: "center", color: "secondary.main" }}>
                                                    {item.name}
                                                </Typography>
                                                <Typography variant="body1" sx={{ textAlign: "center", color: "secondary.main" }}>
                                                    {item.designation}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body1" sx={{ textAlign: "center", color: "primary.main", px: 2 }}>
                                                "{item.message}"
                                            </Typography>
                                            <Box sx={{ width: "130px", height: "auto", position: "absolute", top: "20%", right: "20%" }} src={item.image}></Box>

                                    </Box>
                                        </Box>

                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>

                {/* {
                    testimonials?.map((item)=>{
                        return (
                            <Typography variant="body1" color="initial" sx={{textAlign: "center"}}>
                                {item.message}
                            </Typography>
                        )
                    })
                } */}
            </Box>
        </Container >
    )
}

export default Testimonials
