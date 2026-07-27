import { useNavigate } from 'react-router-dom'

export default function StudentCard({ student, onViewProfile }) {
  const navigate = useNavigate()
  const handleViewProfile = onViewProfile || (() => navigate('/students'))

  return (
    <div className='flex h-full flex-col rounded-3xl border border-emerald-100 bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl'>
      <div className='flex flex-col items-center text-center'>
        <img
          src={student.image}
          alt={student.name}
          className='h-24 w-24 rounded-full border-4 border-emerald-500 object-cover shadow-md'
        />
        <h2 className='mt-4 text-2xl font-bold text-emerald-950'>{student.name}</h2>
        <p className='mt-1 text-emerald-700'>{student.course}</p>
      </div>

      <div className='mt-6 space-y-3 text-sm text-slate-700'>
        <p>
          <span className='font-semibold text-emerald-950'>College:</span> {student.college}
        </p>
        {student.location && (
          <p>
            <span className='font-semibold text-emerald-950'>Location:</span> {student.location}
          </p>
        )}
      </div>

      <div className='mt-6 flex flex-wrap gap-2'>
        {String(student.skills || '')
          .split(',')
          .map((skill) => skill.trim())
          .filter(Boolean)
          .slice(0, 4)
          .map((skill) => (
            <span key={skill} className='rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700'>
              {skill}
            </span>
          ))}
      </div>

      <button
        type='button'
        onClick={handleViewProfile}
        className='mt-6 inline-flex items-center justify-center rounded-full border border-emerald-950 px-6 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-50'
      >
        View Profile
      </button>
    </div>
  )
}
