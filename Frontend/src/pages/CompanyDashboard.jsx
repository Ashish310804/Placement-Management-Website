import { useMemo, useState } from 'react'
import { getStoredAuth, updateStoredUser } from '../utils/auth'

const initialJobPostings = [
  { id: 1, title: 'Senior Frontend Developer', applicants: 24, posted: '5 days ago', status: 'Open', location: 'Bengaluru' },
  { id: 2, title: 'Full Stack Engineer', applicants: 18, posted: '3 days ago', status: 'Open', location: 'Hyderabad' },
  { id: 3, title: 'Backend Developer', applicants: 12, posted: '10 days ago', status: 'Closed', location: 'Pune' },
]

const mockCandidates = [
  { id: 1, name: 'Ananya Sharma', role: 'Frontend Developer', status: 'Reviewing', rating: 4.5, skills: 'React, UI, CSS' },
  { id: 2, name: 'Rahul Patel', role: 'Full Stack Engineer', status: 'Interview', rating: 4.8, skills: 'Node, React, APIs' },
  { id: 3, name: 'Priya Singh', role: 'Backend Developer', status: 'Offered', rating: 4.7, skills: 'Java, Spring Boot, SQL' },
  { id: 4, name: 'Kabir Mehta', role: 'UI Engineer', status: 'Reviewing', rating: 4.4, skills: 'Design systems, Figma, CSS' },
]

function buildCompanyProfile(user = {}) {
  const companyName = user.companyName || user.name || 'Company'

  return {
    id: user.id || 'company',
    companyName,
    name: companyName,
    email: user.email || '',
    location: user.location || 'Recruiting across India',
    industry: user.industry || 'Technology',
    about:
      user.about || 'We build products and grow talent through thoughtful campus hiring and modern engineering practices.',
  }
}

export default function CompanyDashboard() {
  const auth = getStoredAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [profile, setProfile] = useState(() => buildCompanyProfile(auth?.user))
  const [isEditing, setIsEditing] = useState(false)
  const [isPostingJob, setIsPostingJob] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [jobs, setJobs] = useState(initialJobPostings)
  const [jobForm, setJobForm] = useState({
    title: '',
    applicants: '',
    location: '',
    status: 'Open',
    description: '',
  })
  const [message, setMessage] = useState(null)

  const openJobs = useMemo(() => jobs.filter((job) => job.status === 'Open'), [jobs])

  const mockStats = {
    activeJobs: openJobs.length,
    totalApplicants: jobs.reduce((total, job) => total + Number(job.applicants || 0), 0),
    hiredCandidates: mockCandidates.filter((candidate) => candidate.status === 'Offered').length,
    viewsThisMonth: 1240,
    acceptanceRate: 67,
    avgTimeToHire: '18 days',
  }

  const handleProfileChange = (field) => (event) => {
    setProfile((current) => ({ ...current, [field]: event.target.value }))
  }

  const handleJobChange = (field) => (event) => {
    setJobForm((current) => ({ ...current, [field]: event.target.value }))
  }

  const handleSaveProfile = () => {
    const savedUser = updateStoredUser({
      name: profile.companyName,
      companyName: profile.companyName,
      email: profile.email,
      location: profile.location,
      industry: profile.industry,
      about: profile.about,
    })

    setProfile(buildCompanyProfile(savedUser))
    setIsEditing(false)
    setMessage({ type: 'success', text: 'Company profile updated successfully.' })
  }

  const handlePostJob = () => {
    if (!jobForm.title.trim()) {
      setMessage({ type: 'error', text: 'Please add a job title before posting.' })
      return
    }

    setJobs((currentJobs) => [
      {
        id: Date.now(),
        title: jobForm.title.trim(),
        applicants: Number(jobForm.applicants) || 0,
        posted: 'Just now',
        status: jobForm.status,
        location: jobForm.location || 'Remote',
        description: jobForm.description || 'New campus opportunity',
      },
      ...currentJobs,
    ])

    setJobForm({
      title: '',
      applicants: '',
      location: '',
      status: 'Open',
      description: '',
    })
    setIsPostingJob(false)
    setMessage({ type: 'success', text: 'New job posted successfully.' })
  }

  const companyName = profile.companyName || 'Company'

  return (
    <div className='bg-slate-50 py-6 sm:py-10'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6'>
        <div className='mb-6 rounded-[28px] bg-white p-5 shadow-lg sm:mb-8 sm:p-8 lg:p-10'>
          <div className='flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between'>
            <div className='flex flex-col gap-5 sm:flex-row sm:items-center'>
              <div className='flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-3xl font-bold text-white shadow-lg sm:h-24 sm:w-24 sm:text-4xl'>
                {companyName.charAt(0) || 'C'}
              </div>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.35em] text-emerald-700'>Company Dashboard</p>
                <h1 className='mt-2 text-3xl font-bold text-emerald-950 sm:text-4xl'>{companyName}</h1>
                <p className='mt-2 text-base text-slate-600 sm:text-lg'>{profile.industry}</p>
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
                onClick={() => setIsPostingJob(true)}
                className='rounded-full bg-emerald-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 sm:px-6'
              >
                Post New Job
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
            {['overview', 'jobs', 'candidates', 'analytics'].map((tab) => (
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
              <div className='rounded-2xl border border-emerald-100 bg-emerald-50 p-6'>
                <p className='text-sm font-semibold text-emerald-900'>Active Jobs</p>
                <p className='mt-2 text-3xl font-bold text-emerald-950'>{mockStats.activeJobs}</p>
              </div>
              <div className='rounded-2xl border border-blue-100 bg-blue-50 p-6'>
                <p className='text-sm font-semibold text-blue-900'>Total Applicants</p>
                <p className='mt-2 text-3xl font-bold text-blue-950'>{mockStats.totalApplicants}</p>
              </div>
              <div className='rounded-2xl border border-purple-100 bg-purple-50 p-6'>
                <p className='text-sm font-semibold text-purple-900'>Hired Candidates</p>
                <p className='mt-2 text-3xl font-bold text-purple-950'>{mockStats.hiredCandidates}</p>
              </div>
              <div className='rounded-2xl border border-amber-100 bg-amber-50 p-6'>
                <p className='text-sm font-semibold text-amber-900'>Avg. Time to Hire</p>
                <p className='mt-2 text-3xl font-bold text-amber-950'>{mockStats.avgTimeToHire}</p>
              </div>
            </div>

            <div className='mb-10'>
              <h2 className='mb-6 text-2xl font-bold text-emerald-950'>Active Job Postings</h2>
              <div className='space-y-4'>
                {openJobs.map((job) => (
                  <div
                    key={job.id}
                    className='flex flex-col gap-4 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 p-5 transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-6'
                  >
                    <div>
                      <h3 className='text-lg font-semibold text-emerald-950'>{job.title}</h3>
                      <p className='mt-1 text-slate-600'>
                        {job.applicants} applicants · Posted {job.posted}
                      </p>
                    </div>
                    <button
                      type='button'
                      onClick={() => setSelectedJob(job)}
                      className='rounded-full bg-emerald-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800'
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className='mb-6 text-2xl font-bold text-emerald-950'>Recent Candidates</h2>
              <div className='space-y-4'>
                {mockCandidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className='flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-6'
                  >
                    <div className='flex items-center gap-4'>
                      <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 font-bold text-white'>
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
                        <p
                          className={`mt-2 w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                            candidate.status === 'Offered'
                              ? 'bg-green-100 text-green-900'
                              : candidate.status === 'Interview'
                              ? 'bg-blue-100 text-blue-900'
                              : 'bg-amber-100 text-amber-900'
                          }`}
                        >
                          {candidate.status}
                        </p>
                      </div>
                      <button
                        type='button'
                        onClick={() => setSelectedCandidate(candidate)}
                        className='rounded-full border border-emerald-950 px-4 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-50'
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className='rounded-b-[24px] bg-white p-5 shadow-lg sm:p-8 lg:p-10'>
            <h2 className='mb-6 text-2xl font-bold text-emerald-950'>All Job Postings</h2>
            <div className='space-y-4'>
              {jobs.map((job) => (
                <div key={job.id} className='rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:shadow-md sm:p-6'>
                  <div className='mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                    <h3 className='text-lg font-semibold text-emerald-950'>{job.title}</h3>
                    <span
                      className={`w-fit rounded-full px-4 py-1 text-xs font-semibold ${
                        job.status === 'Open' ? 'bg-green-100 text-green-900' : 'bg-slate-200 text-slate-900'
                      }`}
                    >
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

        {activeTab === 'candidates' && (
          <div className='rounded-b-[24px] bg-white p-5 shadow-lg sm:p-8 lg:p-10'>
            <h2 className='mb-6 text-2xl font-bold text-emerald-950'>All Candidates</h2>
            <div className='grid gap-6 xl:grid-cols-2'>
              {mockCandidates.map((candidate) => (
                <div key={candidate.id} className='rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-6 transition hover:shadow-lg sm:p-8'>
                  <div className='flex items-start justify-between gap-4 mb-4'>
                    <div className='flex items-center gap-4'>
                      <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-2xl font-bold text-white'>
                        {candidate.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className='text-lg font-semibold text-emerald-950'>{candidate.name}</h3>
                        <p className='text-slate-600'>{candidate.role}</p>
                      </div>
                    </div>
                  </div>
                  <div className='mb-4 flex items-center justify-between gap-4'>
                    <span className='text-sm text-slate-600'>Rating: {candidate.rating}/5 ⭐</span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        candidate.status === 'Offered'
                          ? 'bg-green-100 text-green-900'
                          : candidate.status === 'Interview'
                          ? 'bg-blue-100 text-blue-900'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {candidate.status}
                    </span>
                  </div>
                  <p className='mb-5 text-sm text-slate-600'>{candidate.skills}</p>
                  <button
                    type='button'
                    onClick={() => setSelectedCandidate(candidate)}
                    className='w-full rounded-full border border-emerald-950 px-4 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-50'
                  >
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className='rounded-b-[24px] bg-white p-5 shadow-lg sm:p-8 lg:p-10'>
            <h2 className='mb-8 text-2xl font-bold text-emerald-950'>Recruitment Analytics</h2>
            <div className='grid gap-8 lg:grid-cols-2'>
              <div className='rounded-2xl border border-slate-200 bg-slate-50 p-8'>
                <p className='mb-4 text-sm font-semibold text-slate-700'>Profile Views</p>
                <p className='text-4xl font-bold text-emerald-950'>{mockStats.viewsThisMonth}</p>
                <p className='mt-2 text-sm text-slate-600'>This month</p>
              </div>
              <div className='rounded-2xl border border-slate-200 bg-slate-50 p-8'>
                <p className='mb-4 text-sm font-semibold text-slate-700'>Acceptance Rate</p>
                <p className='text-4xl font-bold text-emerald-950'>{mockStats.acceptanceRate}%</p>
                <div className='mt-4 h-2 rounded-full bg-slate-300'>
                  <div className='h-full rounded-full bg-emerald-950' style={{ width: `${mockStats.acceptanceRate}%` }} />
                </div>
              </div>
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
                <h2 className='mt-3 text-3xl font-bold text-emerald-950'>Update your company details</h2>
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
                <span className='text-sm font-medium text-slate-700'>Company name</span>
                <input
                  type='text'
                  value={profile.companyName}
                  onChange={handleProfileChange('companyName')}
                  className='mt-2 w-full rounded-3xl border border-emerald-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                />
              </label>
              <label className='block'>
                <span className='text-sm font-medium text-slate-700'>Email</span>
                <input
                  type='email'
                  value={profile.email}
                  onChange={handleProfileChange('email')}
                  className='mt-2 w-full rounded-3xl border border-emerald-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                />
              </label>
              <label className='block'>
                <span className='text-sm font-medium text-slate-700'>Location</span>
                <input
                  type='text'
                  value={profile.location}
                  onChange={handleProfileChange('location')}
                  className='mt-2 w-full rounded-3xl border border-emerald-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                />
              </label>
              <label className='block'>
                <span className='text-sm font-medium text-slate-700'>Industry</span>
                <input
                  type='text'
                  value={profile.industry}
                  onChange={handleProfileChange('industry')}
                  className='mt-2 w-full rounded-3xl border border-emerald-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                />
              </label>
            </div>

            <label className='mt-4 block'>
              <span className='text-sm font-medium text-slate-700'>About</span>
              <textarea
                rows='4'
                value={profile.about}
                onChange={handleProfileChange('about')}
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

      {isPostingJob && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm'>
          <div className='max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[32px] bg-white p-6 shadow-2xl sm:p-8'>
            <div className='flex items-start justify-between gap-4'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700'>Post New Job</p>
                <h2 className='mt-3 text-3xl font-bold text-emerald-950'>Create a fresh campus opening</h2>
              </div>
              <button
                type='button'
                onClick={() => setIsPostingJob(false)}
                className='rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200'
              >
                Close
              </button>
            </div>

            <div className='mt-6 grid gap-4 sm:grid-cols-2'>
              <label className='block sm:col-span-2'>
                <span className='text-sm font-medium text-slate-700'>Job title</span>
                <input
                  type='text'
                  value={jobForm.title}
                  onChange={handleJobChange('title')}
                  className='mt-2 w-full rounded-3xl border border-emerald-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                />
              </label>
              <label className='block'>
                <span className='text-sm font-medium text-slate-700'>Applicants</span>
                <input
                  type='number'
                  value={jobForm.applicants}
                  onChange={handleJobChange('applicants')}
                  className='mt-2 w-full rounded-3xl border border-emerald-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                />
              </label>
              <label className='block'>
                <span className='text-sm font-medium text-slate-700'>Location</span>
                <input
                  type='text'
                  value={jobForm.location}
                  onChange={handleJobChange('location')}
                  className='mt-2 w-full rounded-3xl border border-emerald-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                />
              </label>
              <label className='block sm:col-span-2'>
                <span className='text-sm font-medium text-slate-700'>Status</span>
                <select
                  value={jobForm.status}
                  onChange={handleJobChange('status')}
                  className='mt-2 w-full rounded-3xl border border-emerald-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                >
                  <option value='Open'>Open</option>
                  <option value='Closed'>Closed</option>
                </select>
              </label>
            </div>

            <label className='mt-4 block'>
              <span className='text-sm font-medium text-slate-700'>Description</span>
              <textarea
                rows='4'
                value={jobForm.description}
                onChange={handleJobChange('description')}
                className='mt-2 w-full rounded-3xl border border-emerald-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
              />
            </label>

            <div className='mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end'>
              <button
                type='button'
                onClick={() => setIsPostingJob(false)}
                className='rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50'
              >
                Cancel
              </button>
              <button
                type='button'
                onClick={handlePostJob}
                className='rounded-full bg-emerald-950 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800'
              >
                Publish job
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedJob && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm'>
          <div className='w-full max-w-xl rounded-[32px] bg-white p-6 shadow-2xl sm:p-8'>
            <div className='flex items-start justify-between gap-4'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700'>Job Details</p>
                <h2 className='mt-3 text-3xl font-bold text-emerald-950'>{selectedJob.title}</h2>
              </div>
              <button
                type='button'
                onClick={() => setSelectedJob(null)}
                className='rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200'
              >
                Close
              </button>
            </div>

            <div className='mt-6 grid gap-4 sm:grid-cols-2'>
              <div className='rounded-3xl bg-emerald-50 p-5'>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700'>Applicants</p>
                <p className='mt-2 text-lg font-semibold text-emerald-950'>{selectedJob.applicants}</p>
              </div>
              <div className='rounded-3xl bg-blue-50 p-5'>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-blue-700'>Location</p>
                <p className='mt-2 text-lg font-semibold text-blue-950'>{selectedJob.location}</p>
              </div>
            </div>

            <p className='mt-6 text-slate-600 leading-7'>{selectedJob.description || 'This opening is available for qualified campus candidates.'}</p>
          </div>
        </div>
      )}

      {selectedCandidate && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm'>
          <div className='w-full max-w-xl rounded-[32px] bg-white p-6 shadow-2xl sm:p-8'>
            <div className='flex items-start justify-between gap-4'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700'>Candidate Profile</p>
                <h2 className='mt-3 text-3xl font-bold text-emerald-950'>{selectedCandidate.name}</h2>
              </div>
              <button
                type='button'
                onClick={() => setSelectedCandidate(null)}
                className='rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200'
              >
                Close
              </button>
            </div>

            <div className='mt-6 grid gap-4 sm:grid-cols-2'>
              <div className='rounded-3xl bg-emerald-50 p-5'>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700'>Role</p>
                <p className='mt-2 text-lg font-semibold text-emerald-950'>{selectedCandidate.role}</p>
              </div>
              <div className='rounded-3xl bg-blue-50 p-5'>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-blue-700'>Rating</p>
                <p className='mt-2 text-lg font-semibold text-blue-950'>{selectedCandidate.rating}/5</p>
              </div>
            </div>

            <p className='mt-6 text-slate-600 leading-7'>{selectedCandidate.skills}</p>
          </div>
        </div>
      )}
    </div>
  )
}
