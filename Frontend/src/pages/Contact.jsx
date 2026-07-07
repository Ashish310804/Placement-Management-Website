import { useState } from 'react'

export default function Contact(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus({ type: 'success', message: 'Thank you! Your message has been received.' })
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className='bg-emerald-50 py-20'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='grid gap-10 lg:grid-cols-2'>
          <div className='rounded-3xl bg-white p-10 shadow-lg'>
            <p className='text-sm uppercase tracking-[0.35em] text-emerald-950/70'>Contact Us</p>
            <h1 className='mt-4 text-4xl font-bold text-emerald-950'>We are here to help you succeed.</h1>
            <p className='mt-6 text-slate-700 leading-8'>Reach out for placement support, company partnership enquiries, or to report an issue on the platform.</p>

            <div className='mt-10 space-y-6'>
              <div>
                <p className='text-sm font-semibold text-emerald-950'>Email</p>
                <p className='text-slate-600'>placementportal@gmail.com</p>
              </div>
              <div>
                <p className='text-sm font-semibold text-emerald-950'>Phone</p>
                <p className='text-slate-600'>+91 6389187143</p>
              </div>
              <div>
                <p className='text-sm font-semibold text-emerald-950'>Address</p>
                <p className='text-slate-600'>New Delhi, India</p>
              </div>
            </div>
          </div>

          <div className='rounded-3xl bg-white p-10 shadow-lg'>
            <h2 className='text-3xl font-bold text-emerald-950'>Send a message</h2>
            <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
              <div>
                <label className='block text-sm font-medium text-slate-700'>Full name</label>
                <input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className='mt-2 w-full rounded-3xl border border-emerald-200 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-slate-700'>Email address</label>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='mt-2 w-full rounded-3xl border border-emerald-200 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-slate-700'>Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  className='mt-2 w-full rounded-3xl border border-emerald-200 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200'
                />
              </div>
              <button type='submit' className='inline-flex items-center justify-center rounded-full bg-emerald-950 px-8 py-4 text-white font-semibold hover:bg-emerald-800 transition'>Send Message</button>
            </form>
            {status && (
              <div className='mt-6 rounded-3xl bg-emerald-50 p-4 text-emerald-950'>
                {status.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
