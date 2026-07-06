export default function Footer() {
  return (
    <>
      <footer className='bg-slate-950 text-slate-200 mt-10'>
        <div className='max-w-7xl mx-auto px-6 py-14'>
          <div className='grid gap-10 md:grid-cols-3'>
            <div>
              <h2 className='text-2xl font-bold text-white mb-3'>Placement Portal</h2>
              <p className='text-slate-400 leading-7'>
                Connecting ambitious students with leading employers through smart placement services, career guidance, and interview support.
              </p>
            </div>

            <div>
              <h3 className='text-xl font-semibold text-white mb-4'>Quick Links</h3>
              <ul className='space-y-3 text-slate-400'>
                <li className='cursor-pointer transition hover:text-white'>Home</li>
                <li className='cursor-pointer transition hover:text-white'>Companies</li>
                <li className='cursor-pointer transition hover:text-white'>Students</li>
                <li className='cursor-pointer transition hover:text-white'>About</li>
                <li className='cursor-pointer transition hover:text-white'>Contact</li>
              </ul>
            </div>

            <div>
              <h3 className='text-xl font-semibold text-white mb-4'>Contact Us</h3>
              <p className='text-slate-400'>Email: placementportal@gmail.com</p>
              <p className='text-slate-400 mt-2'>Phone: +91 6389187143</p>
              <p className='text-slate-400 mt-2'>Address: New Delhi, India</p>
            </div>
          </div>

          <div className='mt-12 border-t border-slate-800 pt-5 text-center text-sm text-slate-500'>
            <p>@ 2026 Placement Portal. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
