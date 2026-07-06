import CompanyCard from '../components/CompanyCard'
import StudentCard from '../components/StudentCard'
import heroImage from '../assets/hero.png'

export const Home = () => {
  const companies=[
    {
      id:1,
      name:"Google",
      role:"Full Stack Engineer",
      salaryPackage:"24 LPA"
    },
    {
      id:2,
      name:"Microsoft",
      role:"Frontend Developer",
      salaryPackage:"20 LPA"
    },
    {
      id:3,
      name:"Amazon",
      role:"Cloud Solutions Engineer",
      salaryPackage:"22 LPA"
    },
    {
      id:4,
      name:"Adobe",
      role:"UI/UX Engineer",
      salaryPackage:"18 LPA"
    },
    {
      id:5,
      name:"Cisco",
      role:"Network Automation Engineer",
      salaryPackage:"16.5 LPA"
    }
  ]

  const students=[
     {
      id:1,
      name:"Sneha Patel",
      course:"B.Tech CSE",
      skills:"React,Node.js,TypeScript",
      college:"IIT Delhi",
      image:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
     },
     {
      id:2,
      name:"Rohan Verma",
      course:"B.Tech ECE",
      skills:"Python,Django,AWS",
      college:"NIT Trichy",
      image:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
     },
     {
      id:3,
      name:"Priya Singh",
      course:"B.Tech IT",
      skills:"Machine Learning,Data Science,SQL",
      college:"IIIT Hyderabad",
      image:"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
     }
  ]
  return (
    <>
       {/* Hero Section  */}
       <section className='relative overflow-hidden bg-gradient-to-br from-emerald-200 via-emerald-400 to-emerald-900 py-24 text-slate-950'>
         <div className='absolute -right-32 top-10 h-72 w-72 rounded-full bg-gradient-to-br from-emerald-300 via-lime-300 to-emerald-600 opacity-80 blur-3xl'></div>
         <div className='absolute -left-28 top-48 h-96 w-96 rounded-full bg-gradient-to-br from-lime-200 via-emerald-300 to-emerald-500 opacity-70 blur-3xl'></div>

         <div className='relative max-w-7xl mx-auto px-6 lg:flex lg:items-center lg:gap-16'>
           <div className='lg:w-1/2'>
             <p className='text-sm uppercase tracking-[0.3em] text-emerald-950/70 mb-4'>Empowering placement success</p>
             <h1 className='text-5xl font-extrabold leading-tight sm:text-6xl'>Launch your career with top companies and premium placement support.</h1>
             <p className='mt-6 text-lg text-emerald-950/80 max-w-2xl'>Join our portal to discover hiring drives, showcase your skills, and get matched with roles tailored to your academic strengths and career goals.</p>

             <div className='mt-10 flex flex-col gap-4 sm:flex-row sm:items-center'>
               <button className='inline-flex items-center justify-center rounded-full bg-emerald-950 px-8 py-4 text-white font-semibold shadow-lg shadow-emerald-950/20 transition hover:bg-emerald-800'>Get Started</button>
               <button className='inline-flex items-center justify-center rounded-full bg-emerald-600 px-8 py-4 text-white font-semibold shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500'>Explore Companies</button>
             </div>

             <div className='mt-10 grid gap-4 sm:grid-cols-3'>
               <div className='rounded-3xl bg-white/20 p-6 backdrop-blur-sm'>
                 <p className='text-3xl font-bold text-emerald-950'>500+</p>
                 <p className='mt-2 text-sm text-emerald-950/80'>Students Placed</p>
               </div>
               <div className='rounded-3xl bg-white/20 p-6 backdrop-blur-sm'>
                 <p className='text-3xl font-bold text-emerald-950'>150+</p>
                 <p className='mt-2 text-sm text-emerald-950/80'>Company Partners</p>
               </div>
               <div className='rounded-3xl bg-white/20 p-6 backdrop-blur-sm'>
                 <p className='text-3xl font-bold text-emerald-950'>25 LPA</p>
                 <p className='mt-2 text-sm text-emerald-950/80'>Top Package</p>
               </div>
             </div>
           </div>

           <div className='mt-12 lg:mt-0 lg:w-1/2'>
             <div className='relative mx-auto max-w-2xl'>
               <img src={heroImage} alt='Students celebrating placement success' className='w-full rounded-[40px] border-8 border-white/20 shadow-2xl shadow-slate-950/20' />
               <div className='absolute -bottom-8 left-8 rounded-3xl bg-white/90 p-5 shadow-xl shadow-slate-950/10'>
                 <p className='text-sm text-slate-600'>Remote interview scheduled with</p>
                 <p className='mt-2 font-semibold text-slate-900'>Google, Microsoft, Amazon</p>
               </div>
             </div>
           </div>
         </div>
       </section>

       {/* Top Hiring Companies  */}
       <section className='bg-emerald-50 py-16'>
        <div className='max-w-7xl mx-auto px-6'>
          <h2 className='text-3xl font-bold text-center mb-10 text-emerald-950'>Top Hiring Companies</h2>
          <div className='grid md:grid-cols-3 gap-6'>
            {companies.map((cur)=>{
               return <CompanyCard key={cur.id} name={cur.name} role={cur.role} salaryPackage={cur.salaryPackage}/>
            })}
          </div>

        </div>
       </section>

       {/* StudentCard  */}
      <section>
        <h2 className='text-3xl font-bold text-center mb-10 mt-4'>Featured Students</h2>

        <div className='grid md:grid-cols-3 gap-6'>
            {
              students.map((student)=>(
                <StudentCard key={student.id} student={student}/>
              ))
            }
        </div>
       </section>
    </>
  )
}