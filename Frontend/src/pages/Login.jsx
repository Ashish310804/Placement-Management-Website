import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getStoredAuth, loginLocalAccount, registerLocalAccount, saveAuth } from '../utils/auth'

export default function Login() {
  const [role, setRole] = useState('student')
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const auth = getStoredAuth()
    if (auth) {
      navigate(auth.role === 'company' ? '/companies' : '/students', { replace: true })
    }
  }, [navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!email || !password) {
      setStatus({ type: 'error', message: 'Please enter your email and password.' })
      return
    }

    if (mode === 'register' && (!name || !confirmPassword)) {
      setStatus({ type: 'error', message: 'Please complete all registration details.' })
      return
    }

    if (mode === 'register' && password !== confirmPassword) {
      setStatus({ type: 'error', message: 'Passwords do not match.' })
      return
    }

    setLoading(true)
    setStatus({ type: 'loading', message: mode === 'login' ? 'Signing you in...' : 'Creating your account...' })

    try {
      const account = mode === 'login'
        ? loginLocalAccount({ role, email, password })
        : registerLocalAccount({
            role,
            email,
            password,
            profile: role === 'student' ? { name, course: '', skills: '' } : { companyName: name },
          })

      saveAuth({
        token: account.id,
        user: {
          id: account.id,
          email: account.email,
          role,
          name: role === 'student' ? account.profile?.name || name : account.profile?.companyName || name,
          ...(account.profile || {}),
        },
        role,
      })

      setStatus({ type: 'success', message: mode === 'login' ? 'Welcome back! Redirecting...' : 'Registration complete! Redirecting...' })
      setTimeout(() => navigate(role === 'student' ? '/students' : '/companies'), 700)
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='bg-emerald-50 py-20'>
      <div className='max-w-5xl mx-auto px-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center'>
        <div className='rounded-[32px] bg-white p-10 shadow-2xl shadow-slate-900/10'>
          <div className='flex items-center gap-3 rounded-full border border-emerald-200 bg-emerald-50 p-1'>
            <button
              type='button'
              onClick={() => setRole('student')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${role === 'student' ? 'bg-emerald-950 text-white' : 'text-emerald-800'}`}
            >
              Student
            </button>
            <button
              type='button'
              onClick={() => setRole('company')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${role === 'company' ? 'bg-emerald-950 text-white' : 'text-emerald-800'}`}
            >
              Company
            </button>
          </div>

          <p className='mt-6 text-sm uppercase tracking-[0.35em] text-emerald-900/60'>
            {role === 'student' ? 'Student access' : 'Company access'}
          </p>
          <h1 className='mt-4 text-4xl font-bold text-emerald-950'>
            {mode === 'login' ? 'Log in to continue' : 'Create your account'}
          </h1>
          <p className='mt-4 max-w-xl text-slate-600 leading-7'>
            {mode === 'login'
              ? 'Sign in with your saved account and keep working without losing your profile data.'
              : 'Register once and you can sign in later anytime.'}
          </p>

          <div className='mt-8 flex items-center gap-3 rounded-full bg-slate-100 p-1'>
            <button
              type='button'
              onClick={() => setMode('login')}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${mode === 'login' ? 'bg-white text-emerald-950 shadow' : 'text-slate-600'}`}
            >
              Login
            </button>
            <button
              type='button'
              onClick={() => setMode('register')}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${mode === 'register' ? 'bg-white text-emerald-950 shadow' : 'text-slate-600'}`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className='mt-8 space-y-5'>
            {mode === 'register' && (
              <div>
                <label className='block text-sm font-medium text-slate-700'>
                  {role === 'student' ? 'Full name' : 'Company name'}
                </label>
                <input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className='mt-3 w-full rounded-3xl border border-emerald-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                  placeholder={role === 'student' ? 'Your full name' : 'Your company name'}
                />
              </div>
            )}

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
              <label className='block text-sm font-medium text-slate-700'>Password</label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='mt-3 w-full rounded-3xl border border-emerald-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                placeholder='Enter your password'
              />
            </div>

            {mode === 'register' && (
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
            )}

            <button
              type='submit'
              className='w-full rounded-full bg-emerald-950 px-6 py-4 text-white text-lg font-semibold transition hover:bg-emerald-800'
            >
              {loading ? 'Please wait...' : mode === 'login' ? 'Log in' : 'Create account'}
            </button>
          </form>

          {status && (
            <div className={`mt-6 rounded-3xl px-6 py-4 text-sm font-medium ${status.type === 'success' ? 'bg-emerald-50 text-emerald-900' : status.type === 'loading' ? 'bg-slate-100 text-slate-800' : 'bg-rose-50 text-rose-900'}`}>
              {status.message}
            </div>
          )}

          <p className='mt-8 text-sm text-slate-600'>
            {mode === 'login' ? 'New here?' : 'Already have an account?'}{' '}
            <button type='button' onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className='font-semibold text-emerald-950 underline'>
              {mode === 'login' ? 'Create an account' : 'Log in instead'}
            </button>
          </p>
        </div>

        <aside className='rounded-[32px] bg-gradient-to-br from-emerald-950 to-emerald-700 p-10 text-white shadow-2xl shadow-slate-900/20'>
          <p className='text-sm uppercase tracking-[0.35em] text-emerald-200/80'>Why this works</p>
          <h2 className='mt-4 text-3xl font-bold'>Stay signed in after your first registration.</h2>
          <div className='mt-8 space-y-6 text-slate-100'>
            <div className='rounded-3xl bg-white/10 p-6'>
              <p className='font-semibold'>Persistent session</p>
              <p className='mt-2 text-slate-200'>Your account stays available even after refreshing the page.</p>
            </div>
            <div className='rounded-3xl bg-white/10 p-6'>
              <p className='font-semibold'>Separate student and company access</p>
              <p className='mt-2 text-slate-200'>Use the same sign-in screen for both user types.</p>
            </div>
            <div className='rounded-3xl bg-white/10 p-6'>
              <p className='font-semibold'>No profile loss</p>
              <p className='mt-2 text-slate-200'>Your details remain saved locally until you log out.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
