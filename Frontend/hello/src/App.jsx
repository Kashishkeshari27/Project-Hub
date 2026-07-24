import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import StudentDashboard from './Pages/StudentDashboard'
import TeacherDashboard from './Pages/TeacherDashboard'
import ForgotPassword from "./Pages/ForgotPassword";

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
       <Route path='/studentdashboard' element={<StudentDashboard/>}/>
         <Route path='/teacherdashboard' element={<TeacherDashboard/>}/> 
         <Route path="/forgot-password" element={<ForgotPassword />}
/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App






