import { useState } from 'react'
import { getStoredAuth } from '../utils/auth'

export default function CompanyDashboard() {
  const auth = getStoredAuth()
  const [activeTab, setActiveTab] = useState('overview')

  const companyProfile = auth?.user || {}

  const mockJobPostings = [
    { id: 1, title: 'Senior Frontend Developer', applicants: 24, posted: '5 days ago', status: 'Open' },
    { id: 2, title: 'Full Stack Engineer', applicants: 18, posted: '3 days ago', status: 'Open' },
    { id: 3, title: 'Backend Developer', applicants: 12, posted: '10 days ago', status: 'Closed' },
  ]

  const mockStats = {
    activeJobs: 2,
    totalApplicants: 54,
    hiredCandidates: 8,
    viewsThisMonth: 1240,
    acceptanceRate: 67,
    avgTimeToHire: '18 days',
  }

  const mockCandidates = [
    { id: 1, name: 'Ananya Sharma', role: 'Frontend Developer', status: 'Reviewing', rating: 4.5 },
    { id: 2, name: 'Rahul Patel', role: 'Full Stack Engineer', status: 'Interview', rating: 4.8 },
    { id: 3, name: 'Priya Singh', role: 'Backend Developer', status: 'Offered', rating: 4.7 },
  ]

  return (
    <div className='bg-slate-50 py-10'>
      <div className='max-w-7xl mx-auto px-6'>
        {/* Header */}
        <div className='rounded-[24px] bg-white p-10 shadow-lg mb-8'>
          <div className='flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between'>
            <div className='flex gap-6'>
              <div className='w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-4xl font-bold shadow-lg'>
                {companyProfile.name?.charAt(0) || 'C'}
              </div>
              <div>
                <h1 className='text-4xl font-bold text-emerald-950'>{companyProfile.name}</h1>
                <p className='mt-2 text-lg text-slate-600'>Recruitment Partner</p>
                <p className='mt-1 text-sm text-slate-500'>📧 {companyProfile.email}</p>
              </div>
            </div>

            <div className='flex flex-wrap gap-3'>
              <button className='rounded-full border-2 border-emerald-950 px-6 py-3 font-semibold text-emerald-950 transition hover:bg-emerald-50'>
                Edit Profile
              </button>
              <button className='rounded-full bg-emerald-950 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800'>
                Post New Job
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className='rounded-t-[24px] bg-white border-b border-slate-200'>
          <div className='flex overflow-x-auto px-10'>
            {['overview', 'jobs', 'candidates', 'analytics'].map((tab) => (
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
              <div className='rounded-2xl bg-emerald-50 p-6 border border-emerald-100'>
                <p className='text-sm font-semibold text-emerald-900'>Active Jobs</p>
                <p className='mt-2 text-3xl font-bold text-emerald-950'>{mockStats.activeJobs}</p>
              </div>
              <div className='rounded-2xl bg-blue-50 p-6 border border-blue-100'>
                <p className='text-sm font-semibold text-blue-900'>Total Applicants</p>
                <p className='mt-2 text-3xl font-bold text-blue-950'>{mockStats.totalApplicants}</p>
              </div>
              <div className='rounded-2xl bg-purple-50 p-6 border border-purple-100'>
                <p className='text-sm font-semibold text-purple-900'>Hired Candidates</p>
                <p className='mt-2 text-3xl font-bold text-purple-950'>{mockStats.hiredCandidates}</p>
              </div>
              <div className='rounded-2xl bg-amber-50 p-6 border border-amber-100'>
                <p className='text-sm font-semibold text-amber-900'>Avg. Time to Hire</p>
                <p className='mt-2 text-3xl font-bold text-amber-950'>{mockStats.avgTimeToHire}</p>
              </div>
            </div>

            {/* Active Job Postings */}
            <div className='mb-10'>
              <h2 className='text-2xl font-bold text-emerald-950 mb-6'>Active Job Postings</h2>
              <div className='space-y-4'>
                {mockJobPostings
                  .filter((job) => job.status === 'Open')
                  .map((job) => (
                    <div key={job.id} className='rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 p-6 border border-slate-200 hover:shadow-md transition flex items-center justify-between'>
                      <div>
                        <h3 className='text-lg font-semibold text-emerald-950'>{job.title}</h3>
                        <p className='mt-1 text-slate-600'>{job.applicants} applicants • Posted {job.posted}</p>
                      </div>
                      <button className='rounded-full bg-emerald-950 px-6 py-2 font-semibold text-white text-sm transition hover:bg-emerald-800'>
                        View Details
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            {/* Recent Candidates */}
            <div>
              <h2 className='text-2xl font-bold text-emerald-950 mb-6'>Recent Candidates</h2>
              <div className='space-y-4'>
                {mockCandidates.map((candidate) => (
                  <div key={candidate.id} className='rounded-2xl bg-slate-50 p-6 border border-slate-200 hover:shadow-md transition flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                      <div className='w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold'>
                        {candidate.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className='font-semibold text-emerald-950'>{candidate.name}</h3>
                        <p className='text-sm text-slate-600'>{candidate.role}</p>
                      </div>
                    </div>
                    <div className='flex items-center gap-4'>
                      <div className='text-right'>
                        <p className='text-sm font-semibold text-slate-900'>Rating: {candidate.rating}/5</p>
                        <p className={`text-xs font-semibold rounded-full px-3 py-1 ${
                          candidate.status === 'Offered'
                            ? 'bg-green-100 text-green-900'
                            : candidate.status === 'Interview'
                            ? 'bg-blue-100 text-blue-900'
                            : 'bg-amber-100 text-amber-900'
                        }`}>
                          {candidate.status}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className='rounded-b-[24px] bg-white p-10 shadow-lg'>
            <h2 className='text-2xl font-bold text-emerald-950 mb-6'>All Job Postings</h2>
            <div className='space-y-4'>
              {mockJobPostings.map((job) => (
                <div key={job.id} className='rounded-2xl bg-slate-50 p-6 border border-slate-200 hover:shadow-md transition'>
                  <div className='flex items-center justify-between mb-3'>
                    <h3 className='text-lg font-semibold text-emerald-950'>{job.title}</h3>
                    <span className={`rounded-full px-4 py-1 text-xs font-semibold ${
                      job.status === 'Open' ? 'bg-green-100 text-green-900' : 'bg-slate-200 text-slate-900'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                  <p className='text-slate-600'>{job.applicants} applications received</p>
                  <p className='mt-2 text-sm text-slate-500'>Posted {job.posted}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Candidates Tab */}
        {activeTab === 'candidates' && (
          <div className='rounded-b-[24px] bg-white p-10 shadow-lg'>
            <h2 className='text-2xl font-bold text-emerald-950 mb-6'>All Candidates</h2>
            <div className='grid gap-6 lg:grid-cols-2'>
              {mockCandidates.map((candidate) => (
                <div key={candidate.id} className='rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-8 border border-slate-200 hover:shadow-lg transition'>
                  <div className='flex items-start justify-between mb-4'>
                    <div className='flex items-center gap-4'>
                      <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold'>
                        {candidate.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className='text-lg font-semibold text-emerald-950'>{candidate.name}</h3>
                        <p className='text-slate-600'>{candidate.role}</p>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center justify-between mb-4'>
                    <span className='text-sm text-slate-600'>Rating: {candidate.rating}/5 ⭐</span>
                    <span className={`text-xs font-semibold rounded-full px-3 py-1 ${
                      candidate.status === 'Offered'
                        ? 'bg-green-100 text-green-900'
                        : candidate.status === 'Interview'
                        ? 'bg-blue-100 text-blue-900'
                        : 'bg-amber-100 text-amber-900'
                    }`}>
                      {candidate.status}
                    </span>
                  </div>
                  <button className='w-full rounded-full border border-emerald-950 px-4 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-50'>
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className='rounded-b-[24px] bg-white p-10 shadow-lg'>
            <h2 className='text-2xl font-bold text-emerald-950 mb-8'>Recruitment Analytics</h2>
            <div className='grid gap-8 lg:grid-cols-2'>
              <div className='rounded-2xl bg-slate-50 p-8 border border-slate-200'>
                <p className='text-sm font-semibold text-slate-700 mb-4'>Profile Views</p>
                <p className='text-4xl font-bold text-emerald-950'>{mockStats.viewsThisMonth}</p>
                <p className='mt-2 text-sm text-slate-600'>This month</p>
              </div>
              <div className='rounded-2xl bg-slate-50 p-8 border border-slate-200'>
                <p className='text-sm font-semibold text-slate-700 mb-4'>Acceptance Rate</p>
                <p className='text-4xl font-bold text-emerald-950'>{mockStats.acceptanceRate}%</p>
                <div className='mt-4 h-2 rounded-full bg-slate-300'>
                  <div className='h-full rounded-full bg-emerald-950' style={{ width: `${mockStats.acceptanceRate}%` }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
