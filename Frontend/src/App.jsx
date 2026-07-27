import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Home } from "./pages/Home"
import StudentRegistration from "./pages/StudentRegistration"
import Companies from "./pages/Companies"
import Students from "./pages/Students"
import StudentDashboard from "./pages/StudentDashboard"
import CompanyDashboard from "./pages/CompanyDashboard"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import { Navigate, Routes, Route } from 'react-router-dom'
import { getStoredAuth } from './utils/auth'

function ProtectedRoute({ children, requireRole }) {
  const auth = getStoredAuth()
  if (!auth) return <Navigate to='/login' replace />
  if (requireRole && auth.role !== requireRole) return <Navigate to='/' replace />
  return children
}

function App() {
  return(
    <>
      <Navbar/>
      <main className="min-h-[calc(100vh-200px)] bg-slate-50">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/companies' element={<Companies/>} />
          <Route path='/students' element={<Students/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/register' element={<StudentRegistration/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/dashboard/student' element={<ProtectedRoute requireRole="student"><StudentDashboard/></ProtectedRoute>} />
          <Route path='/dashboard/company' element={<ProtectedRoute requireRole="company"><CompanyDashboard/></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer/>
    </>
  )
}


export default App
