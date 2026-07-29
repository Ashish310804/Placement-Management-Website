import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../services/api'
import { saveAuth } from '../utils/auth'

export default function StudentRegistration() {
  const [form, setForm] = useState({ name: '', email: '', course: '', skills: '', password: '', confirmPassword: '', otp: '' })
  const [otpSent, setOtpSent] = useState(false)
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }))

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (form.password !== form.confirmPassword) return setStatus({ type: 'error', message: 'Passwords do not match.' })
    setLoading(true)
    try {
      if (!otpSent) {
        const response = await apiRequest('/student/otp/request', { method: 'POST', body: JSON.stringify({ email: form.email, role: 'student', purpose: 'signup' }) })
        setOtpSent(true)
        setStatus({ type: 'success', message: response.message })
      } else {
        const response = await apiRequest('/student/otp/verify', { method: 'POST', body: JSON.stringify({ ...form, role: 'student', purpose: 'signup' }) })
        saveAuth({ token: response.token, user: response.user, role: 'student' })
        setStatus({ type: 'success', message: 'Account verified. Redirecting...' })
        setTimeout(() => navigate('/dashboard/student'), 700)
      }
    } catch (error) { setStatus({ type: 'error', message: error.message }) } finally { setLoading(false) }
  }

  return <div className='bg-emerald-50 py-20'><div className='mx-auto max-w-3xl px-6'><div className='rounded-[32px] bg-white p-10 shadow-2xl shadow-slate-900/10'>
    <p className='text-sm uppercase tracking-[0.35em] text-emerald-900/60'>Student Registration</p><h1 className='mt-4 text-4xl font-bold text-emerald-950'>{otpSent ? 'Verify your email' : 'Create your placement profile'}</h1>
    <form onSubmit={handleSubmit} className='mt-10 grid gap-6'>{[['name', 'Full name', 'text'], ['email', 'Email address', 'email'], ['course', 'Course', 'text'], ['skills', 'Skills', 'text'], ['password', 'Password', 'password'], ['confirmPassword', 'Confirm password', 'password']].map(([field, label, type]) => !otpSent && <label key={field} className='block text-sm font-medium text-slate-700'>{label}<input type={type} value={form[field]} onChange={update(field)} required className='mt-3 w-full rounded-3xl border border-emerald-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200' />{field === 'password' && <span className='mt-2 block text-xs font-normal text-slate-500'>Use 8+ characters with uppercase, lowercase, number, and special character.</span>}</label>)}
      {otpSent && <label className='block text-sm font-medium text-slate-700'>Email OTP<input value={form.otp} onChange={update('otp')} required inputMode='numeric' className='mt-3 w-full rounded-3xl border border-emerald-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200' /></label>}
      <button disabled={loading} className='w-full rounded-full bg-emerald-950 px-6 py-4 text-lg font-semibold text-white disabled:opacity-60'>{loading ? 'Please wait...' : otpSent ? 'Verify OTP and register' : 'Send verification OTP'}</button></form>
    {status && <div className={`mt-6 rounded-3xl px-6 py-4 text-sm font-medium ${status.type === 'success' ? 'bg-emerald-50 text-emerald-900' : 'bg-rose-50 text-rose-900'}`}>{status.message}</div>}
  </div></div></div>
}
