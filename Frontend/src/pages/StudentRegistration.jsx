import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../services/api'

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

    if (!name || !email || !password || !confirmPassword || !course || !skills) {
      return setStatus({ type: 'error', message: 'Please complete all fields before submitting.' })
    }

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
    <div className='bg-emerald-50 py-20'>
      <div className='max-w-5xl mx-auto px-6'>
        <div className='rounded-[32px] bg-white p-10 shadow-2xl shadow-slate-900/10'>
          <p className='text-sm uppercase tracking-[0.35em] text-emerald-900/60'>Student Registration</p>
          <h1 className='mt-4 text-4xl font-bold text-emerald-950'>Create your placement profile</h1>
          <p className='mt-4 max-w-2xl text-slate-600 leading-7'>Register to share your course, skills, and contact details with recruiting companies.</p>

          <form onSubmit={handleSubmit} className='mt-10 grid gap-6'>
            <div>
              <label className='block text-sm font-medium text-slate-700'>Full Name</label>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className='mt-3 w-full rounded-3xl border border-emerald-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                placeholder='Your full name'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-slate-700'>Email address</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='mt-3 w-full rounded-3xl border border-emerald-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                placeholder='you@example.com'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-slate-700'>Course</label>
              <input
                type='text'
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
                className='mt-3 w-full rounded-3xl border border-emerald-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                placeholder='Your current course or major'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-slate-700'>Skills</label>
              <input
                type='text'
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                required
                className='mt-3 w-full rounded-3xl border border-emerald-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                placeholder='e.g. JavaScript, React, SQL'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-slate-700'>Password</label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='mt-3 w-full rounded-3xl border border-emerald-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                placeholder='Create a password'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-slate-700'>Confirm password</label>
              <input
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className='mt-3 w-full rounded-3xl border border-emerald-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                placeholder='Repeat your password'
              />
            </div>

            <button
              type='submit'
              className='w-full rounded-full bg-emerald-950 px-6 py-4 text-white text-lg font-semibold transition hover:bg-emerald-800'
            >
              Register
            </button>
          </form>

          {status && (
            <div className={`mt-6 rounded-3xl px-6 py-4 text-sm font-medium ${status.type === 'success' ? 'bg-emerald-50 text-emerald-900' : status.type === 'loading' ? 'bg-slate-100 text-slate-800' : 'bg-rose-50 text-rose-900'}`}>
              {status.message}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
