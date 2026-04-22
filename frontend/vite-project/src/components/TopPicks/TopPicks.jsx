import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Box, Typography } from '@mui/material';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';

const TopPicks = () => {

    const { mode } = useSelector((state) => {
        return state.theme
    })

    const topPicksImages = [
        "https://www.mariab.pk/cdn/shop/files/MBMWC-SS26-18ConcreteCloseup_D.jpg?v=1772101384",
        "https://www.mariab.pk/cdn/shop/files/MBK2PSS26-24NightBlackFront_A.jpg?v=1772292023",
        "https://www.mariab.pk/cdn/shop/files/MB-CS25-62.jpg?v=1741593905",
        "https://www.mariab.pk/cdn/shop/files/MKDEF2647BlackFront_A.jpg?v=1770982434&width=3200",
        "https://www.mariab.pk/cdn/shop/files/MKSEF2605TealFront_A.jpg?v=1773830347",
        "https://www.mariab.pk/cdn/shop/files/MSTEF2611SkinCloseup_E.jpg?v=1771476868",
        "https://www.mariab.pk/cdn/shop/files/MBM-2PW25-10RustFront_A.jpg?v=1761993410",
    ];
    return (
        <Container sx={{ mb: 12 }}>
            <Typography variant="h4" sx={{ color: "primary.main", textAlign: "center", mb: 4, fontWeight: 400 }}>
                TOP PICKS FOR YOU
            </Typography>
            <Swiper
                slidesPerView={2}
                spaceBetween={3}
                breakpoints={{
                    0: {
                        slidesPerView: 2,
                        spaceBetween: 0,
                    },
                    300: {
                        slidesPerView: 2,
                        spaceBetween: 0,
                    },
                    600: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1536: {
                        slidesPerView: 5,
                        spaceBetween: 25,
                    },
                }}
                pagination={{
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
                style={{ paddingBottom: "" }}
            >
                {
                    topPicksImages?.map((item) => {
                        return (
                            <SwiperSlide style={{ paddingBottom: "50px" }}>
                                <Box sx={{ overflow: "hidden", borderRadius: 8, mx: 2, aspectRatio: "2/3", boxShadow: mode ? "0px 4px 20px rgba(0,0,0,0.3)" : "0px 4px 20px rgba(255,255,255,0.5)" }}>
                                    <Box sx={{
                                        width: "100%", height: "100%", objectFit: "cover", transitionDuration: "1.5s", "&: hover": {
                                            transform: "scale(1.05)"
                                        }
                                    }} component="img" src={item}></Box>
                                </Box>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </Container>
    )
}

export default TopPicks
