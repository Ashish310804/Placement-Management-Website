import heroImage from '../assets/hero.png'
import { Link } from 'react-router-dom'

export default function About(){
  return (
    <div className='bg-emerald-50'>
      <section className='relative overflow-hidden py-24'>
        <div className='max-w-7xl mx-auto px-6 lg:flex lg:items-center lg:gap-20'>
          <div className='lg:w-1/2'>
            <p className='text-sm uppercase tracking-[0.35em] text-emerald-950/70 mb-4'>About Placement Portal</p>
            <h1 className='text-5xl font-bold leading-tight text-emerald-950 sm:text-6xl'>Built to help students navigate campus hiring with clarity and confidence.</h1>
            <p className='mt-6 max-w-xl text-slate-700 leading-8'>We are a student-centric hiring platform that bridges the gap between academic talent and top recruiters. Our goal is to make placement drives efficient, transparent, and rewarding for every campus student.</p>

            <div className='mt-10 flex flex-col gap-4 sm:flex-row'>
              <Link to='/contact' className='inline-flex items-center justify-center rounded-full bg-emerald-950 px-8 py-4 text-white font-semibold hover:bg-emerald-800 transition'>Get in Touch</Link>
              <Link to='/students' className='inline-flex items-center justify-center rounded-full border border-emerald-950 bg-white px-8 py-4 text-emerald-950 font-semibold hover:bg-emerald-100 transition'>Explore Students</Link>
            </div>
          </div>

          <div className='mt-12 lg:mt-0 lg:w-1/2'>
            <img src={heroImage} alt='Team working on placements' className='w-full rounded-[30px] border-8 border-white shadow-2xl shadow-slate-950/10' />
          </div>
        </div>
      </section>

      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-6 grid gap-8 lg:grid-cols-3'>
          <div className='rounded-3xl bg-white p-10 shadow-lg'>
            <h2 className='text-3xl font-bold text-emerald-950'>Our Mission</h2>
            <p className='mt-4 text-slate-700'>To help every student showcase their strengths, connect with recruiters, and succeed at every stage of the placement journey.</p>
          </div>
          <div className='rounded-3xl bg-white p-10 shadow-lg'>
            <h2 className='text-3xl font-bold text-emerald-950'>Our Vision</h2>
            <p className='mt-4 text-slate-700'>A future where campus hiring is fair, fast, and accessible — with every student finding the right role and every company finding the right talent.</p>
          </div>
          <div className='rounded-3xl bg-white p-10 shadow-lg'>
            <h2 className='text-3xl font-bold text-emerald-950'>Our Values</h2>
            <ul className='mt-4 space-y-3 text-slate-700'>
              <li>Student-first design</li>
              <li>Transparent process</li>
              <li>Trustworthy placement support</li>
            </ul>
          </div>
        </div>
      </section>

      <section className='bg-emerald-950 py-20 text-white'>
        <div className='max-w-7xl mx-auto px-6 grid gap-10 lg:grid-cols-3'>
          <div className='space-y-4'>
            <p className='uppercase tracking-[0.35em] text-emerald-200/80'>Why choose us</p>
            <h2 className='text-4xl font-bold'>A seamless placement partner for students and recruiters.</h2>
          </div>
          <div className='rounded-3xl bg-white/10 p-8'>
            <h3 className='text-xl font-semibold text-white'>Dedicated student support</h3>
            <p className='mt-3 text-slate-200'>Resume feedback, mock interviews, and placement guidance designed for campus hiring.</p>
          </div>
          <div className='rounded-3xl bg-white/10 p-8'>
            <h3 className='text-xl font-semibold text-white'>Company-ready profiles</h3>
            <p className='mt-3 text-slate-200'>Students can highlight skills, projects, and academic achievements in one polished dashboard.</p>
          </div>
        </div>
      </section>

      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='grid gap-10 lg:grid-cols-3'>
            <article className='rounded-3xl bg-white p-8 shadow-lg'>
              <h3 className='text-2xl font-semibold text-emerald-950'>500+ Students Placed</h3>
              <p className='mt-3 text-slate-700'>Achievements across multiple drives and domains including engineering, IT, and analytics.</p>
            </article>
            <article className='rounded-3xl bg-white p-8 shadow-lg'>
              <h3 className='text-2xl font-semibold text-emerald-950'>150+ Company Partners</h3>
              <p className='mt-3 text-slate-700'>Strong employer relationships that bring premium placement opportunities to campus talent.</p>
            </article>
            <article className='rounded-3xl bg-white p-8 shadow-lg'>
              <h3 className='text-2xl font-semibold text-emerald-950'>Faster campus hiring</h3>
              <p className='mt-3 text-slate-700'>Streamlined workflows that reduce time-to-offer and help students prepare with confidence.</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}
