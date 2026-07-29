import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../services/api'
import { getStoredAuth, saveAuth } from '../utils/auth'

const passwordHint = 'At least 8 characters with uppercase, lowercase, number, and special character.'

export default function Login() {
  const [role, setRole] = useState('student')
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [course, setCourse] = useState('')
  const [skills, setSkills] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const auth = getStoredAuth()
    if (auth) navigate(auth.role === 'company' ? '/dashboard/company' : '/dashboard/student', { replace: true })
  }, [navigate])

  const endpoint = (path) => `/${role}${path}`
  const resetFlow = () => {
    setOtpSent(false)
    setOtp('')
    setStatus(null)
  }

  const saveAndRedirect = (response) => {
    saveAuth({ token: response.token, user: response.user, role })
    setStatus({ type: 'success', message: 'Success! Redirecting...' })
    setTimeout(() => navigate(role === 'company' ? '/dashboard/company' : '/dashboard/student'), 700)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const isRegister = mode === 'register'
    const isReset = mode === 'reset'

    if ((isRegister || isReset) && password !== confirmPassword) {
      setStatus({ type: 'error', message: 'Passwords do not match.' })
      return
    }
    if (isRegister && (!name || (role === 'student' && (!course || !skills)))) {
      setStatus({ type: 'error', message: 'Please complete all registration details.' })
      return
    }

    setLoading(true)
    try {
      if (mode === 'login') {
        const response = await apiRequest(endpoint('/login'), { method: 'POST', body: JSON.stringify({ email, password, role }) })
        saveAndRedirect(response)
        return
      }

      const purpose = isReset ? 'password-reset' : 'signup'
      if (!otpSent) {
        const response = await apiRequest(endpoint('/otp/request'), { method: 'POST', body: JSON.stringify({ email, role, purpose }) })
        setOtpSent(true)
        setStatus({ type: 'success', message: response.message })
        return
      }

      const response = await apiRequest(endpoint('/otp/verify'), {
        method: 'POST',
        body: JSON.stringify({ email, otp, password, role, purpose, name: role === 'student' ? name : undefined, course, skills, companyName: role === 'company' ? name : undefined }),
      })
      saveAndRedirect(response)
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setLoading(false)
    }
  }

  const title = mode === 'login' ? 'Log in to continue' : mode === 'reset' ? 'Reset your password' : 'Create your account'
  const action = mode === 'login' ? 'Log in' : otpSent ? 'Verify OTP' : mode === 'reset' ? 'Send OTP' : 'Send OTP'

  return (
    <div className='bg-emerald-50 py-20'>
      <div className='mx-auto grid max-w-5xl items-center gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr]'>
        <div className='rounded-[32px] bg-white p-10 shadow-2xl shadow-slate-900/10'>
          <div className='flex gap-3 rounded-full border border-emerald-200 bg-emerald-50 p-1'>
            {['student', 'company'].map((item) => <button key={item} type='button' onClick={() => { setRole(item); resetFlow() }} className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold ${role === item ? 'bg-emerald-950 text-white' : 'text-emerald-800'}`}>{item[0].toUpperCase() + item.slice(1)}</button>)}
          </div>
          <p className='mt-6 text-sm uppercase tracking-[0.35em] text-emerald-900/60'>{role} access</p>
          <h1 className='mt-4 text-4xl font-bold text-emerald-950'>{title}</h1>
          <p className='mt-4 text-slate-600'>{otpSent ? 'Enter the six-digit OTP sent to your email.' : 'Use your verified email to securely access your account.'}</p>

          {mode !== 'reset' && <div className='mt-8 flex gap-3 rounded-full bg-slate-100 p-1'>
            {['login', 'register'].map((item) => <button key={item} type='button' onClick={() => { setMode(item); resetFlow() }} className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold ${mode === item ? 'bg-white text-emerald-950 shadow' : 'text-slate-600'}`}>{item === 'login' ? 'Login' : 'Register'}</button>)}
          </div>}

          <form onSubmit={handleSubmit} className='mt-8 space-y-5'>
            {mode === 'register' && <>
              <Field label={role === 'student' ? 'Full name' : 'Company name'} value={name} onChange={setName} />
              {role === 'student' && <><Field label='Course' value={course} onChange={setCourse} /><Field label='Skills' value={skills} onChange={setSkills} /></>}
            </>}
            <Field label='Email address' type='email' value={email} onChange={setEmail} />
            {mode !== 'login' || !otpSent ? <>
              <Field label={mode === 'reset' ? 'New password' : 'Password'} type='password' value={password} onChange={setPassword} help={mode !== 'login' ? passwordHint : undefined} />
              {mode !== 'login' && <Field label='Confirm password' type='password' value={confirmPassword} onChange={setConfirmPassword} />}
            </> : null}
            {otpSent && <Field label='Email OTP' value={otp} onChange={setOtp} inputMode='numeric' />}
            <button disabled={loading} className='w-full rounded-full bg-emerald-950 px-6 py-4 text-lg font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60'>{loading ? 'Please wait...' : action}</button>
          </form>

          {status && <div className={`mt-6 rounded-3xl px-6 py-4 text-sm font-medium ${status.type === 'success' ? 'bg-emerald-50 text-emerald-900' : 'bg-rose-50 text-rose-900'}`}>{status.message}</div>}
          <div className='mt-7 flex flex-wrap gap-4 text-sm text-slate-600'>
            {mode === 'login' ? <><button type='button' onClick={() => { setMode('reset'); resetFlow() }} className='font-semibold text-emerald-950 underline'>Forgot password?</button><button type='button' onClick={() => { setMode('register'); resetFlow() }} className='font-semibold text-emerald-950 underline'>Create an account</button></> : <button type='button' onClick={() => { setMode('login'); resetFlow() }} className='font-semibold text-emerald-950 underline'>Back to login</button>}
          </div>
        </div>
        <aside className='rounded-[32px] bg-gradient-to-br from-emerald-950 to-emerald-700 p-10 text-white shadow-2xl shadow-slate-900/20'>
          <p className='text-sm uppercase tracking-[0.35em] text-emerald-200/80'>Secure access</p>
          <h2 className='mt-4 text-3xl font-bold'>Email verification protects every new account.</h2>
          <p className='mt-6 leading-7 text-emerald-100'>Registration and password recovery require a short-lived email OTP. Your password is never stored in the browser.</p>
        </aside>
      </div>
    </div>
  )
}

function Field({ label, type = 'text', value, onChange, help, inputMode }) {
  return <label className='block text-sm font-medium text-slate-700'>{label}<input type={type} value={value} onChange={(event) => onChange(event.target.value)} required inputMode={inputMode} className='mt-3 w-full rounded-3xl border border-emerald-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200' />{help && <span className='mt-2 block text-xs font-normal text-slate-500'>{help}</span>}</label>
}
