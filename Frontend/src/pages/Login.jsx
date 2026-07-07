import { useState } from 'react'
import { apiRequest } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus({ type: 'loading', message: 'Logging in...' })

    try {
      const data = await apiRequest('/student/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      localStorage.setItem('placement_token', data.token)
      setStatus({ type: 'success', message: 'Login successful. Redirecting...' })
      setTimeout(() => navigate('/students'), 800)
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-3xl shadow-lg border border-emerald-100">
      <h1 className="text-3xl font-bold mb-6">Student Login</h1>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          className="rounded-2xl border border-emerald-200 px-4 py-3"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="rounded-2xl border border-emerald-200 px-4 py-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="rounded-full bg-emerald-950 px-6 py-3 text-white font-semibold hover:bg-emerald-800 transition"
        >
          Login
        </button>
      </form>

      {status && (
        <div className={`mt-6 rounded-2xl p-4 ${status.type === 'success' ? 'bg-emerald-50 text-emerald-900' : ''} ${status.type === 'error' ? 'bg-rose-50 text-rose-900' : ''}`}>
          {status.message}
        </div>
      )}
    </div>
  )
}
