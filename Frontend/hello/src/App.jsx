import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import StudentDashboard from './Pages/StudentDashboard'
import TeacherDashboard from './Pages/TeacherDashboard'
import ForgotPassword from "./Pages/ForgotPassword"
import VerifyOTP from "./Pages/VerifyOTP"
import ResetPassword from "./Pages/ResetPassword"
import ProtectedRoute from './Pages/ProtectedRoute'
import Profile from './Pages/Profile'
import EditProfile from './Pages/EditProfile'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
       <Route path='/studentdashboard' element={<ProtectedRoute allowedRole="Student"><StudentDashboard/></ProtectedRoute>}/>
         <Route path='/teacherdashboard' element={<ProtectedRoute allowedRole="Teacher"><TeacherDashboard/></ProtectedRoute>}/> 
         <Route path="/forgot-password" element={<ForgotPassword />}/>
         <Route path="/verify-otp" element={<VerifyOTP/>}/>
         <Route path="/reset-password" element={<ResetPassword />} />
         <Route path='/profile' element={<Profile/>}/>
         <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App






