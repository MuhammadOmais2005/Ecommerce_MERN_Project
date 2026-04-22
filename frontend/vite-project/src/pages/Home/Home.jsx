import React from 'react'
import Newsletter from '../../components/Newsletter/Newsletter'
import Testimonials from '../../components/Testimonials/Testimonials' 
import HeroSection from '../../components/HeroSection/HeroSection' 
import TopPicks from '../../components/TopPicks/TopPicks' 
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs'
import NewArrival from '../../components/NewArrival/NewArrival'


const Home = () => {
  return (
    <>
        <HeroSection/>  
        <NewArrival/>
        <WhyChooseUs/>
        <TopPicks/>
        <Testimonials/>
        <Newsletter/>
    </>
  )
}

export default Home
