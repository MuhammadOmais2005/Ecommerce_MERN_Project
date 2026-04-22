import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Zoom, Navigation } from "swiper/modules"; 
import { useTheme } from "@mui/material";

import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/zoom";
import 'swiper/css/navigation';

export default function SingleProductImagesGallery({ images }) {

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const theme = useTheme()

  return (
    <>
      {/* Main Swiper */}
      <Swiper
        modules={[Thumbs, Zoom, Navigation]}
        zoom
        thumbs={{ swiper: thumbsSwiper }}
        spaceBetween={10}
        navigation={true}
        style={{ 
          marginBottom: 3,
          '--swiper-navigation-color': 'theme.palette.secondary.main',
          '--swiper-pagination-color': 'theme.palette.secondary.main',
        }}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <div className="swiper-zoom-container">
              <img src={img} alt="product" style={{ width: "100%" }} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      <Swiper
        modules={[Thumbs, Navigation]}
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img src={img} alt="thumb" style={{ width: "100%" }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}


