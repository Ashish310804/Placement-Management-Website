import { Link } from 'react-router-dom'
import CompanyCard from '../components/CompanyCard'
import StudentCard from '../components/StudentCard'
import heroImage from '../assets/hero.png'
import { featuredCompanies, featuredStudents } from '../data/showcase'

export const Home = () => {
  return (
    <>
      <section className='relative overflow-hidden bg-emerald-950 text-white'>
        <div className='absolute -right-20 top-16 h-72 w-72 rounded-full bg-emerald-500/40 blur-3xl'></div>
        <div className='absolute -left-20 top-40 h-96 w-96 rounded-full bg-lime-300/30 blur-3xl'></div>

        <div className='relative mx-auto flex max-w-7xl flex-col gap-12 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:py-24'>
          <div className='lg:w-6/12'>
            <span className='inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/90 sm:text-sm'>
              Campus hiring made simple
            </span>
            <h1 className='mt-8 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl'>
              Build your profile and land the best placement offers.
            </h1>
            <p className='mt-6 max-w-xl text-base text-slate-200/90 sm:text-lg'>
              Placement Portal helps students connect with trusted employers, practice interview-ready skills, and secure roles aligned to their strengths.
            </p>

            <div className='mt-10 flex flex-col gap-4 sm:flex-row'>
              <Link to='/register' className='inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-emerald-950 font-semibold shadow-xl shadow-black/10 transition hover:bg-slate-100'>
                Create Profile
              </Link>
              <Link to='/companies' className='inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-4 text-white font-semibold transition hover:bg-white/20'>
                Explore Drives
              </Link>
            </div>

            <div className='mt-12 grid gap-4 sm:grid-cols-3'>
              <div className='rounded-3xl bg-white/10 p-6 backdrop-blur'>
                <p className='text-3xl font-bold'>520+</p>
                <p className='mt-2 text-sm text-slate-200/80'>Students placed</p>
              </div>
              <div className='rounded-3xl bg-white/10 p-6 backdrop-blur'>
                <p className='text-3xl font-bold'>140+</p>
                <p className='mt-2 text-sm text-slate-200/80'>Recruiting companies</p>
              </div>
              <div className='rounded-3xl bg-white/10 p-6 backdrop-blur'>
                <p className='text-3xl font-bold'>26 LPA</p>
                <p className='mt-2 text-sm text-slate-200/80'>Highest package</p>
              </div>
            </div>
          </div>

          <div className='relative lg:w-5/12'>
            <img src={heroImage} alt='Students celebrating placement success' className='w-full rounded-[32px] border-4 border-white/10 shadow-2xl shadow-black/20 sm:rounded-[40px] sm:border-8' />
            <div className='absolute -bottom-8 left-4 rounded-3xl bg-white p-5 shadow-xl shadow-black/10 sm:left-8'>
              <p className='text-sm text-slate-600'>Recent campus drive scheduled</p>
              <p className='mt-2 font-semibold text-slate-950'>Companies: Google, Microsoft, Amazon</p>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-emerald-50 py-16 sm:py-20'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6'>
          <div className='grid gap-10 lg:grid-cols-2 lg:items-center'>
            <div>
              <p className='text-xs font-semibold uppercase tracking-[0.35em] text-emerald-950/70 sm:text-sm'>What we do</p>
              <h2 className='mt-4 text-3xl font-bold text-emerald-950 sm:text-4xl'>A modern placement platform for students and recruiters.</h2>
              <p className='mt-6 text-slate-700 leading-8'>
                From resume building to interview preparation, Placement Portal brings all placement work into one student-first dashboard so campus hiring stays fast, fair, and transparent.
              </p>
            </div>

            <div className='grid gap-6 sm:grid-cols-2'>
              <div className='rounded-3xl bg-white p-8 shadow-lg'>
                <h3 className='text-xl font-semibold text-emerald-950'>Profile Matching</h3>
                <p className='mt-3 text-slate-600'>Match students to roles based on skills, course, and campus requirements.</p>
              </div>
              <div className='rounded-3xl bg-white p-8 shadow-lg'>
                <h3 className='text-xl font-semibold text-emerald-950'>Interview Prep</h3>
                <p className='mt-3 text-slate-600'>Track documents, practice mock interviews, and get ready for recruiter rounds.</p>
              </div>
              <div className='rounded-3xl bg-white p-8 shadow-lg'>
                <h3 className='text-xl font-semibold text-emerald-950'>Company Insights</h3>
                <p className='mt-3 text-slate-600'>Review company drives, roles, packages, and location details before applying.</p>
              </div>
              <div className='rounded-3xl bg-white p-8 shadow-lg'>
                <h3 className='text-xl font-semibold text-emerald-950'>Secure access</h3>
                <p className='mt-3 text-slate-600'>Student login and protected data keep applications secure and compliant.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='py-16 sm:py-20'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6'>
          <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
            <div>
              <h2 className='text-3xl font-bold text-emerald-950'>Top hiring companies</h2>
              <p className='mt-3 text-slate-600'>Trusted companies that regularly recruit from our campus network.</p>
            </div>
            <Link to='/companies' className='inline-flex items-center justify-center rounded-full bg-emerald-950 px-6 py-3 text-white font-semibold transition hover:bg-emerald-800'>
              View all companies
            </Link>
          </div>

          <div className='mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
            {featuredCompanies.map((company) => (
              <CompanyCard
                key={company.id}
                name={company.companyName}
                role={company.role}
                salaryPackage={company.salaryPackage}
                location={company.location}
                about={company.about}
                perks={company.perks}
              />
            ))}
          </div>
        </div>
      </section>

      <section className='bg-emerald-50 py-16 sm:py-20'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6'>
          <div className='text-center'>
            <p className='text-xs font-semibold uppercase tracking-[0.35em] text-emerald-950/70 sm:text-sm'>Student success</p>
            <h2 className='mt-4 text-3xl font-bold text-emerald-950 sm:text-4xl'>Recent success stories</h2>
          </div>

          <div className='mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
            {featuredStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
