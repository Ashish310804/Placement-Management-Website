import { useEffect, useState } from 'react'
import { apiRequest } from '../services/api'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [status, setStatus] = useState(null)
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleRequestOtp = async () => {
    if (!email) {
      setStatus({ type: 'error', message: 'Please enter your email before requesting an OTP.' })
      return
    }

    setLoading(true)
    setStatus({ type: 'loading', message: 'Sending OTP...' })

    try {
      await apiRequest('/student/otp/request', {
        method: 'POST',
        body: JSON.stringify({ email, purpose: 'login' }),
      })
      setOtpSent(true)
      setStatus({ type: 'success', message: 'OTP sent to your email. Check your inbox.' })
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!otp) {
      setStatus({ type: 'error', message: 'Please enter the OTP received in your email.' })
      return
    }

    setLoading(true)
    setStatus({ type: 'loading', message: 'Verifying OTP...' })

    try {
      const data = await apiRequest('/student/otp/verify', {
        method: 'POST',
        body: JSON.stringify({ email, otp, purpose: 'login' }),
      })
      localStorage.setItem('placement_token', data.token)
      setStatus({ type: 'success', message: 'Login successful. Redirecting...' })
      setTimeout(() => navigate('/students'), 900)
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async (response) => {
    try {
      setStatus({ type: 'loading', message: 'Signing in with Google...' })
      const data = await apiRequest('/student/google', {
        method: 'POST',
        body: JSON.stringify({ credential: response.credential }),
      })
      localStorage.setItem('placement_token', data.token)
      setStatus({ type: 'success', message: 'Google sign-in successful. Redirecting...' })
      setTimeout(() => navigate('/students'), 900)
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    }
  }

  useEffect(() => {
    if (!window.google?.accounts?.id) return

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
      callback: handleGoogleLogin,
    })

    window.google.accounts.id.renderButton(document.getElementById('google-signin'), {
      theme: 'outline',
      size: 'large',
      width: '100%',
    })
  }, [])

  return (
    <div className='bg-emerald-50 py-20'>
      <div className='max-w-5xl mx-auto px-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center'>
        <div className='rounded-[32px] bg-white p-10 shadow-2xl shadow-slate-900/10'>
          <p className='text-sm uppercase tracking-[0.35em] text-emerald-900/60'>Student Login</p>
          <h1 className='mt-4 text-4xl font-bold text-emerald-950'>Access your placement dashboard</h1>
          <p className='mt-4 max-w-xl text-slate-600 leading-7'>Sign in to view your placements, company invites, and application progress.</p>

          <form onSubmit={handleSubmit} className='mt-10 space-y-6'>
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

            <button
              type='button'
              onClick={handleRequestOtp}
              className='w-full rounded-full border border-emerald-950 px-6 py-4 text-emerald-950 font-semibold transition hover:bg-emerald-50'
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>

            {otpSent && (
              <div>
                <label className='block text-sm font-medium text-slate-700'>Enter OTP</label>
                <input
                  type='text'
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className='mt-3 w-full rounded-3xl border border-emerald-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                  placeholder='6-digit OTP'
                />
              </div>
            )}

            <button
              type='submit'
              className='w-full rounded-full bg-emerald-950 px-6 py-4 text-white text-lg font-semibold transition hover:bg-emerald-800'
            >
              Verify OTP & Log in
            </button>
          </form>

          <div className='mt-6'>
            <div className='flex items-center gap-3 text-sm text-slate-500'>
              <span className='h-px flex-1 bg-slate-200' />
              <span>or</span>
              <span className='h-px flex-1 bg-slate-200' />
            </div>
            <div id='google-signin' className='mt-4 flex justify-center' />
          </div>

          {status && (
            <div className={`mt-6 rounded-3xl px-6 py-4 text-sm font-medium ${status.type === 'success' ? 'bg-emerald-50 text-emerald-900' : status.type === 'loading' ? 'bg-slate-100 text-slate-800' : 'bg-rose-50 text-rose-900'}`}>
              {status.message}
            </div>
          )}

          <p className='mt-8 text-sm text-slate-600'>New to Placement Portal? <Link to='/register' className='font-semibold text-emerald-950 underline'>Create an account</Link></p>
        </div>

        <aside className='rounded-[32px] bg-gradient-to-br from-emerald-950 to-emerald-700 p-10 text-white shadow-2xl shadow-slate-900/20'>
          <p className='text-sm uppercase tracking-[0.35em] text-emerald-200/80'>Why login?</p>
          <h2 className='mt-4 text-3xl font-bold'>Stay updated with every drive.</h2>
          <div className='mt-8 space-y-6 text-slate-100'>
            <div className='rounded-3xl bg-white/10 p-6'>
              <p className='font-semibold'>Application tracking</p>
              <p className='mt-2 text-slate-200'>Monitor your applications, interview dates, and company feedback.</p>
            </div>
            <div className='rounded-3xl bg-white/10 p-6'>
              <p className='font-semibold'>Profile visibility</p>
              <p className='mt-2 text-slate-200'>Allow recruiters to discover your skills and invite you to relevant roles.</p>
            </div>
            <div className='rounded-3xl bg-white/10 p-6'>
              <p className='font-semibold'>Secure access</p>
              <p className='mt-2 text-slate-200'>Your details remain safe while you explore placement opportunities.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
