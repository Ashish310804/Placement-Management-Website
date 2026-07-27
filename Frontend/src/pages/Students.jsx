import { useEffect, useMemo, useState } from 'react'
import StudentCard from '../components/StudentCard'
import { featuredStudents } from '../data/showcase'
import { apiRequest } from '../services/api'

function normalizeStudent(student, index) {
  return {
    id: student._id || student.id || `student-${index}`,
    name: student.name || 'Student',
    course: student.course || 'Course not provided',
    skills: student.skills || 'Not provided',
    college: student.college || 'Unknown College',
    location: student.location || 'Campus',
    image:
      student.image ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name || 'Student')}&background=2F855A&color=fff`,
    summary: student.summary || student.about || '',
  }
}

function mergeStudents(remoteStudents) {
  const combined = [...featuredStudents, ...remoteStudents.map(normalizeStudent)]
  const seen = new Set()

  return combined.filter((student) => {
    const key = student.id || `${student.name}-${student.course}-${student.college}`
    if (seen.has(key)) {
      return false
    }
    seen.add(key)
    return true
  })
}

export default function Students() {
  const [students, setStudents] = useState(featuredStudents)
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [selectedStudent, setSelectedStudent] = useState(null)

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await apiRequest('/student')
        const remoteStudents = Array.isArray(data.student) ? data.student : []
        setStudents(mergeStudents(remoteStudents))
      } catch {
        setStudents(featuredStudents)
      } finally {
        setLoading(false)
      }
    }

    loadStudents()
  }, [])

  const filteredStudents = useMemo(() => {
    return students.filter((student) =>
      [student.name, student.course, student.skills, student.college, student.location, student.summary]
        .join(' ')
        .toLowerCase()
        .includes(query.toLowerCase()),
    )
  }, [students, query])

  const placementReady = filteredStudents.length

  return (
    <div className='bg-white py-16 sm:py-20'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6'>
        <div className='rounded-[32px] bg-gradient-to-r from-emerald-50 via-white to-emerald-50 p-6 shadow-xl shadow-emerald-900/5 sm:p-10'>
          <div className='flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
            <div className='max-w-2xl'>
              <p className='text-xs font-semibold uppercase tracking-[0.35em] text-emerald-950/60 sm:text-sm'>Student Directory</p>
              <h1 className='mt-4 text-3xl font-bold text-emerald-950 sm:text-4xl'>Discover student profiles across courses and campuses.</h1>
              <p className='mt-4 text-slate-600 leading-7'>
                Browse the talent pool, filter by skills, and click any profile to see a richer placement summary.
              </p>
            </div>

            <div className='grid gap-3 sm:grid-cols-3 lg:min-w-[420px]'>
              <div className='rounded-3xl bg-emerald-50 p-4'>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700'>Profiles</p>
                <p className='mt-2 text-2xl font-bold text-emerald-950'>{filteredStudents.length}</p>
              </div>
              <div className='rounded-3xl bg-blue-50 p-4'>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-blue-700'>Skills</p>
                <p className='mt-2 text-2xl font-bold text-blue-950'>15+</p>
              </div>
              <div className='rounded-3xl bg-amber-50 p-4'>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-amber-700'>Ready to place</p>
                <p className='mt-2 text-2xl font-bold text-amber-950'>{placementReady}</p>
              </div>
            </div>
          </div>

          <div className='mt-8 max-w-2xl'>
            <input
              type='text'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search by name, course, college or skills'
              className='w-full rounded-full border border-emerald-200 bg-white px-5 py-4 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
            />
          </div>
        </div>

        {loading && <p className='mt-8 text-slate-700'>Loading students...</p>}

        {!loading && filteredStudents.length === 0 && (
          <p className='mt-8 text-slate-700'>No student profiles match your search. Try another keyword.</p>
        )}

        <div className='mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
          {filteredStudents.map((student) => (
            <StudentCard key={student.id} student={student} onViewProfile={() => setSelectedStudent(student)} />
          ))}
        </div>
      </div>

      {selectedStudent && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm'>
          <div className='w-full max-w-2xl rounded-[32px] bg-white p-6 shadow-2xl sm:p-8'>
            <div className='flex items-start justify-between gap-4'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700'>Student Profile</p>
                <h2 className='mt-3 text-3xl font-bold text-emerald-950'>{selectedStudent.name}</h2>
              </div>
              <button
                type='button'
                onClick={() => setSelectedStudent(null)}
                className='rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200'
              >
                Close
              </button>
            </div>

            <div className='mt-6 grid gap-4 sm:grid-cols-2'>
              <div className='rounded-3xl bg-emerald-50 p-5'>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700'>Course</p>
                <p className='mt-2 text-lg font-semibold text-emerald-950'>{selectedStudent.course}</p>
              </div>
              <div className='rounded-3xl bg-blue-50 p-5'>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-blue-700'>College</p>
                <p className='mt-2 text-lg font-semibold text-blue-950'>{selectedStudent.college}</p>
              </div>
              <div className='rounded-3xl bg-amber-50 p-5'>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-amber-700'>Location</p>
                <p className='mt-2 text-lg font-semibold text-amber-950'>{selectedStudent.location}</p>
              </div>
              <div className='rounded-3xl bg-slate-50 p-5'>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-700'>Strengths</p>
                <p className='mt-2 text-lg font-semibold text-slate-950'>Interview ready and project focused</p>
              </div>
            </div>

            <div className='mt-6 flex items-center gap-4'>
              <img
                src={selectedStudent.image}
                alt={selectedStudent.name}
                className='h-20 w-20 rounded-2xl border-4 border-emerald-500 object-cover'
              />
              <p className='text-slate-600 leading-7'>{selectedStudent.summary || 'This profile highlights a ready-to-place student with curated skills and experience.'}</p>
            </div>

            <div className='mt-6 flex flex-wrap gap-2'>
              {String(selectedStudent.skills || '')
                .split(',')
                .map((skill) => skill.trim())
                .filter(Boolean)
                .map((skill) => (
                  <span key={skill} className='rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700'>
                    {skill}
                  </span>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
