import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './pages/students/home'
import CoursesLists from './pages/students/CoursesLists'
import MyEnrollments from './pages/students/MyEnrollments'
import CourseDetails from './pages/students/CourseDetails'
import Player from './pages/students/Player'
import Loading from './components/Students/Loading'
import Educator from './pages/educators/Educator'
import AddCourses from './pages/educators/AddCourses'
import MyCourses from './pages/educators/MyCourses'
import StudentsEnrolled from './pages/educators/StudentsEnrolled'
import Dashboard from './pages/educators/Dashboard'
import Navbar from './components/Students/Navbar'
import 'quill/dist/quill.snow.css';


const App =() =>{

  const isEducatorRoute = useMatch('/educator/*')
  return (
    <div className='text-default min-h-screen bg-white'>
      {!isEducatorRoute && <Navbar/>}
      {/* <Navbar /> */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/coursesLists' element={<CoursesLists />}/>
        <Route path='/coursesLists/:input' element={<CoursesLists />}/>
        <Route path='/course/:id' element={<CourseDetails />}/>
        <Route path='/my-enrollments' element={<MyEnrollments />}/>
        <Route path='/player/:courseId' element={<Player />}/>
        <Route path='/loading/:path' element={<Loading />}/>
        <Route path='educator' element={<Educator />}> 
            <Route path='/educator' element={<Dashboard/>}/>
            <Route path='add-courses' element={<AddCourses/>}/>
            <Route path='my-courses' element={<MyCourses/>}/>
            <Route path='student-enrolled' element={<StudentsEnrolled/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App