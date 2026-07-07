

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../api'

export default function StudentRegistration() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [course, setCourse] = useState('')
  const [skills, setSkills] = useState('')
  const [status, setStatus] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      return setStatus({ type: 'error', message: 'Passwords do not match.' })
    }

    setStatus({ type: 'loading', message: 'Registering your profile...' })

    try {
      await apiRequest('/student/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, course, skills }),
      })
      setStatus({ type: 'success', message: 'Registration successful! Redirecting to login.' })
      setTimeout(() => navigate('/login'), 1200)
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    }
  }

  return (
    <>
       <h1>Student Registration Form</h1>
        {/* <form action=""> */}
        <input type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={
            (e) => setName(e.target.value)
          }
        /> <br /><br />

        <input type="email"
          placeholder='Enter your Email'
          value={email}
          onChange={
            (e) => setEmail(e.target.value)
          }
        /> <br /><br />

        <input type="text"
          placeholder="enter course"
          value={course}
           onChange={
            (e) => setCourse(e.target.value)
          }
        />

      {/* </form> */}

      <h2>Preview Form</h2>
      <p>Name:{name}</p>
      <p>Email:{email}</p>
      <p>Course:{course}</p>
    </>
  )
}