import { useEffect, useState } from 'react'
import StudentCard from '../components/StudentCard'
import { apiRequest } from '../api'

export default function Students(){
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Students</h1>
      {loading && <p className="text-slate-700">Loading students...</p>}
      {error && <p className="text-rose-600">{error}</p>}
      {!loading && !error && students.length === 0 && (
        <p className="text-slate-700">No student profiles are available yet.</p>
      )}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {students.map((student) => (
          <StudentCard key={student._id} student={student} />
        ))}
      </div>
    </div>
  )
}
