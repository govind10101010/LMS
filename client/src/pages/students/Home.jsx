import React from 'react'
import Hero from '../../components/Students/hero'
import Companies from '../../components/Students/companies'
import CourseSection from '../../components/Students/coursesection'
import Testimonials from '../../components/Students/Testimonials'
import CallToAction from '../../components/Students/CallToAction'
import Fotter from '../../components/Students/Footer'
import CoursesLists from './CoursesLists'
const Home = () => {
  return (
    <div className='flex flex-col items-center 
      space-y-7 text-center'>
      <Hero />
      <Companies />
      <CourseSection/>
      <Testimonials/>
      <CallToAction/>
      <Fotter/>
     
    </div>
  )
}

export default Home