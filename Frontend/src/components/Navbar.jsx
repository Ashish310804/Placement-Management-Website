import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { clearAuth, getStoredAuth } from '../utils/auth'

function Navbar(){
    const [auth, setAuth] = useState(getStoredAuth())

    useEffect(() => {
        const syncAuth = () => setAuth(getStoredAuth())
        window.addEventListener('placement-auth-changed', syncAuth)
        window.addEventListener('storage', syncAuth)

        return () => {
            window.removeEventListener('placement-auth-changed', syncAuth)
            window.removeEventListener('storage', syncAuth)
        }
    }, [])

    const handleLogout = () => {
        clearAuth()
        setAuth(null)
    }

    return(
        <>
          <nav className="bg-emerald-950 text-white shadow-xl shadow-emerald-950/20">
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center justify-between gap-6">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Placement Portal</h1>
                  <p className="text-sm text-emerald-200">Campus hiring made simple</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
                <ul className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-emerald-200">
                  <li className="cursor-pointer transition hover:text-white"><Link to="/">Home</Link></li>
                  <li className="cursor-pointer transition hover:text-white"><Link to="/companies">Companies</Link></li>
                  <li className="cursor-pointer transition hover:text-white"><Link to="/students">Students</Link></li>
                  <li className="cursor-pointer transition hover:text-white"><Link to="/about">About</Link></li>
                  <li className="cursor-pointer transition hover:text-white"><Link to="/contact">Contact</Link></li>
                </ul>

                <div className="flex flex-wrap items-center gap-3">
                  {auth ? (
                    <>
                      <span className="rounded-full border border-emerald-200/20 bg-emerald-950/10 px-4 py-2 text-sm font-semibold text-emerald-100">
                        Hi, {auth.user?.name || auth.user?.companyName || auth.user?.email || 'there'}
                      </span>
                      <Link to={auth.role === 'company' ? '/dashboard/company' : '/dashboard/student'} className="rounded-full border border-emerald-200/20 bg-emerald-950/10 px-5 py-2 text-sm font-semibold text-emerald-100 transition hover:border-emerald-200 hover:bg-emerald-950/20">Dashboard</Link>
                      <button onClick={handleLogout} className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400">Logout</button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="rounded-full border border-emerald-200/20 bg-emerald-950/10 px-5 py-2 text-sm font-semibold text-emerald-100 transition hover:border-emerald-200 hover:bg-emerald-950/20">Login</Link>
                      <Link to="/register" className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400">Register</Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </>
    )
}

export default Navbar;