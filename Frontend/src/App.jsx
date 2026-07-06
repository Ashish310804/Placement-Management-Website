import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Home } from "./pages/Home"
import StudentRegistration from "./pages/StudentRegistration"
import Companies from "./pages/Companies"
import Students from "./pages/Students"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import { Routes, Route } from 'react-router-dom'

function App() {
  return(
    <>
      <Navbar/>
      <main className="min-h-[calc(100vh-200px)]">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/companies' element={<Companies/>} />
          <Route path='/students' element={<Students/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/register' element={<StudentRegistration/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </main>
      <Footer/>
    </>
  )
}


export default App