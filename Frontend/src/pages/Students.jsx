import { useEffect, useMemo, useState } from 'react'
import StudentCard from '../components/StudentCard'
import { apiRequest } from '../api'

export default function Students(){
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await apiRequest('/student')
        const normalized = (data.student || []).map((student) => ({
          ...student,
          image: student.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=2F855A&color=fff`,
          college: student.college || 'Unknown College',
          skills: student.skills || 'Not provided',
        }))
        setStudents(normalized)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadStudents()
  }, [])

  const filteredStudents = useMemo(() => {
    return students.filter((student) =>
      student.name?.toLowerCase().includes(query.toLowerCase()) ||
      student.course?.toLowerCase().includes(query.toLowerCase()) ||
      student.skills?.toLowerCase().includes(query.toLowerCase())
    )
  }, [students, query])

  return (
    <div className='bg-white py-20'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='mb-10 rounded-3xl bg-emerald-50 p-10 shadow-lg'>
          <h1 className='text-4xl font-bold text-emerald-950'>Students</h1>
          <p className='mt-4 text-slate-600'>View student profiles created through the placement portal and discover talent across courses.</p>
          <div className='mt-8 max-w-md'>
            <input
              type='text'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search by name, course, or skills'
              className='w-full rounded-3xl border border-emerald-200 px-4 py-3 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200'
            />
          </div>
        </div>

        {loading && <p className='text-slate-700'>Loading students...</p>}
        {error && <p className='text-rose-600'>{error}</p>}
        {!loading && !error && filteredStudents.length === 0 && (
          <p className='text-slate-700'>No student profiles match your search. Try another keyword.</p>
        )}

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {filteredStudents.map((student) => (
            <StudentCard key={student._id} student={student} />
          ))}
        </div>
      </div>
    </div>
  )
}
