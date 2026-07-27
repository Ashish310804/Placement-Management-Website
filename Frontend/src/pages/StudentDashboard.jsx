import { useState } from 'react'
import { getStoredAuth } from '../utils/auth'

export default function StudentDashboard() {
  const auth = getStoredAuth()
  const [activeTab, setActiveTab] = useState('overview')

  const studentProfile = auth?.user || {}

  const mockApplications = [
    { id: 1, company: 'Tech Solutions Inc', role: 'Frontend Developer', status: 'Accepted', daysAgo: 3 },
    { id: 2, company: 'Innovation Labs', role: 'React Developer', status: 'Pending', daysAgo: 5 },
    { id: 3, company: 'StartUp Hub', role: 'Full Stack Developer', status: 'Rejected', daysAgo: 7 },
  ]

  const mockStats = {
    jobOffers: 2,
    activeApplications: 4,
    totalApplications: 12,
    profileCompletion: 85,
    hoursSpent: 24,
    lastLogin: '2 hours ago',
  }

  const improvementAreas = [
    { area: 'Technical Skills', score: 78 },
    { area: 'Communication', score: 85 },
    { area: 'Problem Solving', score: 72 },
  ]

  return (
    <div className='bg-slate-50 py-10'>
      <div className='max-w-7xl mx-auto px-6'>
        {/* Header */}
        <div className='rounded-[24px] bg-white p-10 shadow-lg mb-8'>
          <div className='flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between'>
            <div className='flex gap-6'>
              <div className='w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-4xl font-bold shadow-lg'>
                {studentProfile.name?.charAt(0) || 'S'}
              </div>
              <div>
                <h1 className='text-4xl font-bold text-emerald-950'>{studentProfile.name}</h1>
                <p className='mt-2 text-lg text-slate-600'>{studentProfile.course || 'Course not specified'}</p>
                <p className='mt-1 text-sm text-slate-500'>📧 {studentProfile.email}</p>
              </div>
            </div>

            <div className='flex flex-wrap gap-3'>
              <button className='rounded-full border-2 border-emerald-950 px-6 py-3 font-semibold text-emerald-950 transition hover:bg-emerald-50'>
                Edit Profile
              </button>
              <button className='rounded-full bg-emerald-950 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800'>
                Download Resume
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className='rounded-t-[24px] bg-white border-b border-slate-200'>
          <div className='flex overflow-x-auto px-10'>
            {['overview', 'education', 'applications', 'skills'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-semibold capitalize transition border-b-2 ${
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

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className='rounded-b-[24px] bg-white p-10 shadow-lg'>
            {/* Statistics */}
            <div className='grid gap-6 lg:grid-cols-4 mb-10'>
              <div className='rounded-2xl bg-blue-50 p-6 border border-blue-100'>
                <p className='text-sm font-semibold text-blue-900'>Job Offers</p>
                <p className='mt-2 text-3xl font-bold text-blue-950'>{mockStats.jobOffers}</p>
              </div>
              <div className='rounded-2xl bg-purple-50 p-6 border border-purple-100'>
                <p className='text-sm font-semibold text-purple-900'>Active Applications</p>
                <p className='mt-2 text-3xl font-bold text-purple-950'>{mockStats.activeApplications}</p>
              </div>
              <div className='rounded-2xl bg-amber-50 p-6 border border-amber-100'>
                <p className='text-sm font-semibold text-amber-900'>Total Applications</p>
                <p className='mt-2 text-3xl font-bold text-amber-950'>{mockStats.totalApplications}</p>
              </div>
              <div className='rounded-2xl bg-green-50 p-6 border border-green-100'>
                <p className='text-sm font-semibold text-green-900'>Profile Completion</p>
                <p className='mt-2 text-3xl font-bold text-green-950'>{mockStats.profileCompletion}%</p>
              </div>
            </div>

            {/* Applications */}
            <div className='mb-10'>
              <h2 className='text-2xl font-bold text-emerald-950 mb-6'>Recent Applications</h2>
              <div className='space-y-4'>
                {mockApplications.map((app) => (
                  <div key={app.id} className='rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 p-6 border border-slate-200 hover:shadow-md transition flex items-center justify-between'>
                    <div>
                      <h3 className='text-lg font-semibold text-emerald-950'>{app.company}</h3>
                      <p className='text-slate-600'>{app.role}</p>
                      <p className='mt-2 text-xs text-slate-500'>Posted {app.daysAgo} days ago</p>
                    </div>
                    <div className={`rounded-full px-6 py-2 font-semibold text-sm ${
                      app.status === 'Accepted'
                        ? 'bg-green-100 text-green-900'
                        : app.status === 'Pending'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-red-100 text-red-900'
                    }`}>
                      {app.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity */}
            <div className='grid gap-6 lg:grid-cols-3'>
              <div className='rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-8 border border-blue-200'>
                <p className='text-sm font-semibold text-blue-900'>Profile Completion</p>
                <p className='mt-3 text-4xl font-bold text-blue-950'>{mockStats.profileCompletion}%</p>
                <div className='mt-4 h-2 rounded-full bg-blue-200'>
                  <div className='h-full rounded-full bg-blue-950' style={{ width: `${mockStats.profileCompletion}%` }} />
                </div>
              </div>
              <div className='rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 p-8 border border-purple-200'>
                <p className='text-sm font-semibold text-purple-900'>Hours Spent</p>
                <p className='mt-3 text-4xl font-bold text-purple-950'>{mockStats.hoursSpent}h</p>
                <p className='mt-4 text-sm text-purple-800'>This week</p>
              </div>
              <div className='rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 border border-emerald-200'>
                <p className='text-sm font-semibold text-emerald-900'>Last Login</p>
                <p className='mt-3 text-4xl font-bold text-emerald-950'>{mockStats.lastLogin}</p>
                <p className='mt-4 text-sm text-emerald-800'>Stay active</p>
              </div>
            </div>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <div className='rounded-b-[24px] bg-white p-10 shadow-lg'>
            <div className='space-y-6'>
              <div className='rounded-2xl border-l-4 border-emerald-950 bg-slate-50 p-8'>
                <h3 className='text-xl font-bold text-emerald-950'>Bachelor of Technology</h3>
                <p className='mt-2 text-slate-600'>Computer Science & Engineering</p>
                <p className='mt-1 text-sm text-slate-500'>Expected Graduation: May 2025</p>
              </div>
              <div className='rounded-2xl border-l-4 border-blue-500 bg-slate-50 p-8'>
                <h3 className='text-xl font-bold text-slate-900'>Core Courses</h3>
                <p className='mt-2 text-slate-600'>Data Structures, Web Development, Database Systems, Software Engineering</p>
              </div>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className='rounded-b-[24px] bg-white p-10 shadow-lg'>
            <h2 className='text-2xl font-bold text-emerald-950 mb-6'>All Applications</h2>
            <div className='space-y-4'>
              {mockApplications.map((app) => (
                <div key={app.id} className='rounded-2xl bg-slate-50 p-6 border border-slate-200 hover:shadow-md transition'>
                  <div className='flex items-center justify-between mb-3'>
                    <h3 className='text-lg font-semibold text-emerald-950'>{app.company}</h3>
                    <span className={`rounded-full px-4 py-1 text-xs font-semibold ${
                      app.status === 'Accepted'
                        ? 'bg-green-100 text-green-900'
                        : app.status === 'Pending'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-red-100 text-red-900'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                  <p className='text-slate-600'>{app.role}</p>
                  <p className='mt-3 text-sm text-slate-500'>Applied {app.daysAgo} days ago</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className='rounded-b-[24px] bg-white p-10 shadow-lg'>
            <div className='grid gap-6 lg:grid-cols-2'>
              {improvementAreas.map((item, idx) => (
                <div key={idx} className='rounded-2xl bg-slate-50 p-8 border border-slate-200'>
                  <div className='flex items-center justify-between mb-3'>
                    <p className='font-semibold text-slate-900'>{item.area}</p>
                    <span className='text-xl font-bold text-emerald-950'>{item.score}%</span>
                  </div>
                  <div className='h-3 rounded-full bg-slate-200'>
                    <div
                      className='h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 transition-all'
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
