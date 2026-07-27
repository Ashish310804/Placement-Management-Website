import { useMemo, useState } from 'react'
import { getStoredAuth, updateStoredUser } from '../utils/auth'

const mockApplications = [
  { id: 1, company: 'Tech Solutions Inc', role: 'Frontend Developer', status: 'Accepted', daysAgo: 3 },
  { id: 2, company: 'Innovation Labs', role: 'React Developer', status: 'Pending', daysAgo: 5 },
  { id: 3, company: 'StartUp Hub', role: 'Full Stack Developer', status: 'Rejected', daysAgo: 7 },
  { id: 4, company: 'CloudWorks', role: 'UI Engineer', status: 'Pending', daysAgo: 9 },
]

const improvementAreas = [
  { area: 'Technical Skills', score: 78 },
  { area: 'Communication', score: 85 },
  { area: 'Problem Solving', score: 72 },
]

function buildStudentProfile(user = {}) {
  return {
    id: user.id || 'student',
    name: user.name || 'Student Name',
    email: user.email || '',
    course: user.course || 'Course not specified',
    college: user.college || 'Campus College',
    skills: user.skills || 'React, Node.js, TypeScript',
    summary:
      user.summary || 'Focused on building practical projects, improving interview readiness, and landing a strong campus placement.',
    headline: user.headline || 'Placement-ready student',
  }
}

function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export default function StudentDashboard() {
  const auth = getStoredAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [profile, setProfile] = useState(() => buildStudentProfile(auth?.user))
  const [isEditing, setIsEditing] = useState(false)
  const [message, setMessage] = useState(null)

  const profileCompletion = useMemo(() => {
    const fields = [profile.name, profile.email, profile.course, profile.college, profile.skills, profile.summary]
    return Math.round((fields.filter(Boolean).length / fields.length) * 100)
  }, [profile])

  const handleChange = (field) => (event) => {
    setProfile((current) => ({ ...current, [field]: event.target.value }))
  }

  const handleSaveProfile = () => {
    const savedUser = updateStoredUser({
      name: profile.name,
      email: profile.email,
      course: profile.course,
      college: profile.college,
      skills: profile.skills,
      summary: profile.summary,
      headline: profile.headline,
    })

    setProfile(buildStudentProfile(savedUser))
    setIsEditing(false)
    setMessage({ type: 'success', text: 'Profile updated successfully.' })
  }

  const handleDownloadResume = () => {
    const resume = [
      `${profile.name}`,
      profile.headline,
      '',
      `Email: ${profile.email}`,
      `College: ${profile.college}`,
      `Course: ${profile.course}`,
      '',
      'Summary',
      profile.summary,
      '',
      'Skills',
      profile.skills,
      '',
      'Recent applications',
      ...mockApplications.map((application) => `${application.company} - ${application.role} (${application.status})`),
    ].join('\n')

    downloadTextFile(`${profile.name.toLowerCase().replace(/\s+/g, '-')}-resume.txt`, resume)
    setMessage({ type: 'success', text: 'Resume downloaded.' })
  }

  const studentName = profile.name || 'Student'

  return (
    <div className='bg-slate-50 py-6 sm:py-10'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6'>
        <div className='mb-6 rounded-[28px] bg-white p-5 shadow-lg sm:mb-8 sm:p-8 lg:p-10'>
          <div className='flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between'>
            <div className='flex flex-col gap-5 sm:flex-row sm:items-center'>
              <div className='flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-3xl font-bold text-white shadow-lg sm:h-24 sm:w-24 sm:text-4xl'>
                {studentName.charAt(0) || 'S'}
              </div>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.35em] text-emerald-700'>Student Dashboard</p>
                <h1 className='mt-2 text-3xl font-bold text-emerald-950 sm:text-4xl'>{studentName}</h1>
                <p className='mt-2 text-base text-slate-600 sm:text-lg'>{profile.course}</p>
                <p className='mt-1 text-sm text-slate-500'>Email: {profile.email || 'Not provided'}</p>
              </div>
            </div>

            <div className='flex flex-wrap gap-3'>
              <button
                type='button'
                onClick={() => setIsEditing(true)}
                className='rounded-full border-2 border-emerald-950 px-5 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-50 sm:px-6'
              >
                Edit Profile
              </button>
              <button
                type='button'
                onClick={handleDownloadResume}
                className='rounded-full bg-emerald-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 sm:px-6'
              >
                Download Resume
              </button>
            </div>
          </div>

          {message && (
            <div className={`mt-6 rounded-3xl px-5 py-4 text-sm font-medium ${message.type === 'success' ? 'bg-emerald-50 text-emerald-900' : 'bg-rose-50 text-rose-900'}`}>
              {message.text}
            </div>
          )}
        </div>

        <div className='rounded-t-[24px] bg-white border-b border-slate-200'>
          <div className='flex overflow-x-auto px-4 sm:px-6 lg:px-10'>
            {['overview', 'education', 'applications', 'skills'].map((tab) => (
              <button
                key={tab}
                type='button'
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-4 text-sm font-semibold capitalize transition border-b-2 sm:px-6 ${
                  activeTab === tab
                    ? 'border-emerald-950 text-emerald-950'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className='rounded-b-[24px] bg-white p-5 shadow-lg sm:p-8 lg:p-10'>
            <div className='mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
              <div className='rounded-2xl border border-blue-100 bg-blue-50 p-6'>
                <p className='text-sm font-semibold text-blue-900'>Job Offers</p>
                <p className='mt-2 text-3xl font-bold text-blue-950'>2</p>
              </div>
              <div className='rounded-2xl border border-purple-100 bg-purple-50 p-6'>
                <p className='text-sm font-semibold text-purple-900'>Active Applications</p>
                <p className='mt-2 text-3xl font-bold text-purple-950'>4</p>
              </div>
              <div className='rounded-2xl border border-amber-100 bg-amber-50 p-6'>
                <p className='text-sm font-semibold text-amber-900'>Total Applications</p>
                <p className='mt-2 text-3xl font-bold text-amber-950'>12</p>
              </div>
              <div className='rounded-2xl border border-green-100 bg-green-50 p-6'>
                <p className='text-sm font-semibold text-green-900'>Profile Completion</p>
                <p className='mt-2 text-3xl font-bold text-green-950'>{profileCompletion}%</p>
              </div>
            </div>

            <div className='mb-10'>
              <h2 className='mb-6 text-2xl font-bold text-emerald-950'>Recent Applications</h2>
              <div className='space-y-4'>
                {mockApplications.map((application) => (
                  <div
                    key={application.id}
                    className='flex flex-col gap-4 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 p-5 transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-6'
                  >
                    <div>
                      <h3 className='text-lg font-semibold text-emerald-950'>{application.company}</h3>
                      <p className='text-slate-600'>{application.role}</p>
                      <p className='mt-2 text-xs text-slate-500'>Posted {application.daysAgo} days ago</p>
                    </div>
                    <div
                      className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${
                        application.status === 'Accepted'
                          ? 'bg-green-100 text-green-900'
                          : application.status === 'Pending'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-red-100 text-red-900'
                      }`}
                    >
                      {application.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='grid gap-6 xl:grid-cols-3'>
              <div className='rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-8'>
                <p className='text-sm font-semibold text-blue-900'>Profile Completion</p>
                <p className='mt-3 text-4xl font-bold text-blue-950'>{profileCompletion}%</p>
                <div className='mt-4 h-2 rounded-full bg-blue-200'>
                  <div className='h-full rounded-full bg-blue-950' style={{ width: `${profileCompletion}%` }} />
                </div>
              </div>
              <div className='rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-8'>
                <p className='text-sm font-semibold text-purple-900'>Hours Spent</p>
                <p className='mt-3 text-4xl font-bold text-purple-950'>24h</p>
                <p className='mt-4 text-sm text-purple-800'>This week</p>
              </div>
              <div className='rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-8'>
                <p className='text-sm font-semibold text-emerald-900'>Last Login</p>
                <p className='mt-3 text-3xl font-bold text-emerald-950'>2 hours ago</p>
                <p className='mt-4 text-sm text-emerald-800'>Stay active</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div className='rounded-b-[24px] bg-white p-5 shadow-lg sm:p-8 lg:p-10'>
            <div className='space-y-6'>
              <div className='rounded-2xl border-l-4 border-emerald-950 bg-slate-50 p-6 sm:p-8'>
                <h3 className='text-xl font-bold text-emerald-950'>Bachelor of Technology</h3>
                <p className='mt-2 text-slate-600'>Computer Science & Engineering</p>
                <p className='mt-1 text-sm text-slate-500'>Expected Graduation: May 2025</p>
              </div>
              <div className='rounded-2xl border-l-4 border-blue-500 bg-slate-50 p-6 sm:p-8'>
                <h3 className='text-xl font-bold text-slate-900'>Core Courses</h3>
                <p className='mt-2 text-slate-600'>Data Structures, Web Development, Database Systems, Software Engineering</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className='rounded-b-[24px] bg-white p-5 shadow-lg sm:p-8 lg:p-10'>
            <h2 className='mb-6 text-2xl font-bold text-emerald-950'>All Applications</h2>
            <div className='space-y-4'>
              {mockApplications.map((application) => (
                <div key={application.id} className='rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:shadow-md sm:p-6'>
                  <div className='mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                    <h3 className='text-lg font-semibold text-emerald-950'>{application.company}</h3>
                    <span
                      className={`w-fit rounded-full px-4 py-1 text-xs font-semibold ${
                        application.status === 'Accepted'
                          ? 'bg-green-100 text-green-900'
                          : application.status === 'Pending'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-red-100 text-red-900'
                      }`}
                    >
                      {application.status}
                    </span>
                  </div>
                  <p className='text-slate-600'>{application.role}</p>
                  <p className='mt-3 text-sm text-slate-500'>Applied {application.daysAgo} days ago</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className='rounded-b-[24px] bg-white p-5 shadow-lg sm:p-8 lg:p-10'>
            <div className='grid gap-6 lg:grid-cols-2'>
              {improvementAreas.map((item) => (
                <div key={item.area} className='rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8'>
                  <div className='mb-3 flex items-center justify-between gap-4'>
                    <p className='font-semibold text-slate-900'>{item.area}</p>
                    <span className='text-xl font-bold text-emerald-950'>{item.score}%</span>
                  </div>
                  <div className='h-3 rounded-full bg-slate-200'>
                    <div className='h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 transition-all' style={{ width: `${item.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {isEditing && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm'>
          <div className='max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[32px] bg-white p-6 shadow-2xl sm:p-8'>
            <div className='flex items-start justify-between gap-4'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700'>Edit Profile</p>
                <h2 className='mt-3 text-3xl font-bold text-emerald-950'>Update your placement details</h2>
              </div>
              <button
                type='button'
                onClick={() => setIsEditing(false)}
                className='rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200'
              >
                Close
              </button>
            </div>

            <div className='mt-6 grid gap-4 sm:grid-cols-2'>
              <label className='block'>
                <span className='text-sm font-medium text-slate-700'>Full name</span>
                <input
                  type='text'
                  value={profile.name}
                  onChange={handleChange('name')}
                  className='mt-2 w-full rounded-3xl border border-emerald-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                />
              </label>
              <label className='block'>
                <span className='text-sm font-medium text-slate-700'>Email</span>
                <input
                  type='email'
                  value={profile.email}
                  onChange={handleChange('email')}
                  className='mt-2 w-full rounded-3xl border border-emerald-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                />
              </label>
              <label className='block'>
                <span className='text-sm font-medium text-slate-700'>Course</span>
                <input
                  type='text'
                  value={profile.course}
                  onChange={handleChange('course')}
                  className='mt-2 w-full rounded-3xl border border-emerald-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                />
              </label>
              <label className='block'>
                <span className='text-sm font-medium text-slate-700'>College</span>
                <input
                  type='text'
                  value={profile.college}
                  onChange={handleChange('college')}
                  className='mt-2 w-full rounded-3xl border border-emerald-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                />
              </label>
            </div>

            <label className='mt-4 block'>
              <span className='text-sm font-medium text-slate-700'>Skills</span>
              <textarea
                rows='3'
                value={profile.skills}
                onChange={handleChange('skills')}
                className='mt-2 w-full rounded-3xl border border-emerald-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
              />
            </label>

            <label className='mt-4 block'>
              <span className='text-sm font-medium text-slate-700'>Summary</span>
              <textarea
                rows='4'
                value={profile.summary}
                onChange={handleChange('summary')}
                className='mt-2 w-full rounded-3xl border border-emerald-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
              />
            </label>

            <div className='mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end'>
              <button
                type='button'
                onClick={() => setIsEditing(false)}
                className='rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50'
              >
                Cancel
              </button>
              <button
                type='button'
                onClick={handleSaveProfile}
                className='rounded-full bg-emerald-950 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800'
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
