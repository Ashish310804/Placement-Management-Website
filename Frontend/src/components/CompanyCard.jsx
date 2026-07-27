import { useNavigate } from 'react-router-dom'

export default function CompanyCard({
  name,
  role,
  salaryPackage,
  location,
  about,
  perks = [],
  onViewDetails,
}) {
  const navigate = useNavigate()
  const handleViewDetails = onViewDetails || (() => navigate('/companies'))

  return (
    <div className='flex h-full flex-col rounded-3xl border border-emerald-100 bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600'>Hiring now</p>
          <h2 className='mt-2 text-2xl font-bold text-emerald-950'>{name}</h2>
        </div>
        <span className='rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800'>Open role</span>
      </div>

      <p className='mt-4 text-sm text-slate-600'>{about || role}</p>

      <div className='mt-6 grid grid-cols-2 gap-3 text-sm'>
        <div className='rounded-2xl bg-slate-50 p-4'>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>Role</p>
          <p className='mt-1 font-semibold text-slate-900'>{role}</p>
        </div>
        <div className='rounded-2xl bg-slate-50 p-4'>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>Package</p>
          <p className='mt-1 font-semibold text-slate-900'>{salaryPackage}</p>
        </div>
      </div>

      <div className='mt-4 flex flex-wrap gap-2 text-xs font-semibold text-emerald-900'>
        {location && <span className='rounded-full bg-emerald-50 px-3 py-1'>{location}</span>}
        {perks.slice(0, 3).map((perk) => (
          <span key={perk} className='rounded-full bg-slate-100 px-3 py-1 text-slate-700'>
            {perk}
          </span>
        ))}
      </div>

      <button
        type='button'
        onClick={handleViewDetails}
        className='mt-6 inline-flex items-center justify-center rounded-full bg-emerald-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800'
      >
        View Details
      </button>
    </div>
  )
}
