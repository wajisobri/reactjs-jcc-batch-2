import React from 'react'
import { JobCard } from '../../components/landing/JobCard'
import { LandingCarousel } from '../../components/landing/LandingCarousel'
import { LandingLayout } from '../../components/landing/LandingLayout'

export const Home = () => {
  return (
    <LandingLayout>
      <div className="w-full bg-gray-800">
        <LandingCarousel />
      </div>

      <div className="w-full bg-white my-10 md:my-12 p-6 md:p-8 lg:p-12">
        <JobCard />
      </div>
    </LandingLayout>
  )
}
