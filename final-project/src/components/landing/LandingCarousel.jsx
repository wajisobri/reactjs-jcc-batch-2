import React from 'react'
import { Carousel } from 'antd';
import bg from '../../assets/img/home-bg.svg'
import bg2 from '../../assets/img/bg1.jpg'
import bg3 from '../../assets/img/bg2.jpg'

export const LandingCarousel = () => {
  return (
    <Carousel autoplay>
      <div className="overflow-hidden relative h-56 rounded-lg sm:h-64 lg:h-96">
        <img src={bg} alt="Carousel 1" className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="overflow-hidden relative h-56 rounded-lg sm:h-64 lg:h-96">
        <img src={bg2} alt="Carousel 2" className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="overflow-hidden relative h-56 rounded-lg sm:h-64 lg:h-96">
        <img src={bg3} alt="Carousel 3" className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2" />
      </div>
    </Carousel>
  )
}
