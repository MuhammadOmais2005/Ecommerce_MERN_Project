import { Container, Box } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';

const HeroSection = () => {

    const heroImages = [
        {
            md: "https://www.mariab.pk/cdn/shop/files/SF_web_banner_2880X1620_a1fc9a58-b349-46ae-ad42-5c3bfb662f48.jpg?v=1770785267&width=1500",
            xs: "https://www.mariab.pk/cdn/shop/files/SF_Modern_archives_Mob_Banner_752X1540_262bdf1a-ad95-424e-860a-d9c3127ea406.jpg?v=1770706333&width=600"
        },
        {
            md: "https://www.mariab.pk/cdn/shop/files/Silk_prints_web_banner_2880X1620_35dc68ba-87e2-4b31-a309-23ca57073ec7.jpg?v=1770706349&width=1500",
            xs: "https://www.mariab.pk/cdn/shop/files/Mprints_Mob_Banner_752X1540_36e4126d-322a-420a-af99-5000b9f5000b.jpg?v=1770785285&width=800"
        },
        {
            md: "https://www.mariab.pk/cdn/shop/files/Statment_SF_web_banner_2880X1620_8832acf3-e3a4-4887-93c2-03f39e3ce56e.jpg?v=1769680515&width=1500",
            xs: "https://www.mariab.pk/cdn/shop/files/M.Classics_SF_Mob_Banner_752X1540_e2cd7bfe-ffee-4cd4-b7b8-d08070578331.jpg?v=1770706389&width=600"
        }

    ]
    return (
        <Box sx={{ maxWidth: "1536px", mx: "auto", mb: 12 }}>
            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {
                    heroImages?.map((item) => {
                        return (
                            <SwiperSlide>
                                <Box component="img" src={item.md} sx={{ width: "100%", height: "auto", display: { xs: "none", md: "block" } }}></Box>

                                <Box sx={{ display: { xs: "block", md: "none" }, width: "100%", height: "650px", }}>
                                    <Box component="img" src={item.xs} sx={{ objectFit: "cover", width: "100%", height: "100%", objectPosition: "center", display: { xs: "block", md: "none" } }}></Box>
                                </Box>
                            </SwiperSlide>
                        )
                    })
                }
                <SwiperSlide>
                                <Box sx={{ height: 'calc(100vh - 50px)'}}>
                                    <Box
                                        component="video"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            objectPosition: 'center 80%'
                                        }}
                                    >
                    
                                        <Box component={"source"} src="//www.mariab.pk/cdn/shop/videos/c/vp/bcd5d13c1e98478cb6efb8b99a77bcb1/bcd5d13c1e98478cb6efb8b99a77bcb1.HD-1080p-7.2Mbps-75276688.mp4?v=0" type="video/mp4" sx={{ width: "100%", height: "100%" }} />
                                    </Box>
                                </Box>
                    
                </SwiperSlide>
            </Swiper>
        </Box>
    )
}

export default HeroSection
