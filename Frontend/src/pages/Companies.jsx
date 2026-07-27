import { useEffect, useMemo, useState } from 'react'
import CompanyCard from '../components/CompanyCard'
import { featuredCompanies } from '../data/showcase'
import { apiRequest } from '../services/api'

function normalizeCompany(company, index) {
  return {
    id: company._id || company.id || `company-${index}`,
    companyName: company.companyName || company.name || 'Company',
    role: company.role || 'Open Role',
    salaryPackage: company.salaryPackage || company.package || 'Negotiable',
    location: company.location || 'Remote',
    about: company.about || company.description || '',
    perks: Array.isArray(company.perks) ? company.perks : [],
  }
}

function mergeCompanies(remoteCompanies) {
  const combined = [...featuredCompanies, ...remoteCompanies.map(normalizeCompany)]
  const seen = new Set()

  return combined.filter((company) => {
    const key = company.id || `${company.companyName}-${company.role}-${company.location}`
    if (seen.has(key)) {
      return false
    }
    seen.add(key)
    return true
  })
}

export default function Companies() {
  const [companies, setCompanies] = useState(featuredCompanies)
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [selectedCompany, setSelectedCompany] = useState(null)

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const data = await apiRequest('/company')
        const remoteCompanies = Array.isArray(data.companies) ? data.companies : []
        setCompanies(mergeCompanies(remoteCompanies))
      } catch {
        setCompanies(featuredCompanies)
      } finally {
        setLoading(false)
      }
    }

    loadCompanies()
  }, [])

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) =>
      [company.companyName, company.role, company.location, company.about, ...(company.perks || [])]
        .join(' ')
        .toLowerCase()
        .includes(query.toLowerCase()),
    )
  }, [companies, query])

  const openRoles = filteredCompanies.filter((company) => company.role).length

  return (
    <div className='bg-gradient-to-b from-emerald-50 via-white to-emerald-50 py-16 sm:py-20'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6'>
        <div className='rounded-[32px] bg-white p-6 shadow-xl shadow-emerald-900/5 sm:p-10'>
          <div className='flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
            <div className='max-w-2xl'>
              <p className='text-xs font-semibold uppercase tracking-[0.35em] text-emerald-950/60 sm:text-sm'>Company Directory</p>
              <h1 className='mt-4 text-3xl font-bold text-emerald-950 sm:text-4xl'>Browse companies recruiting through the placement portal.</h1>
              <p className='mt-4 text-slate-600 leading-7'>
                Search by company, role, package, or location. Click any card to see a fuller recruitment snapshot.
              </p>
            </div>

            <div className='grid gap-3 sm:grid-cols-3 lg:min-w-[420px]'>
              <div className='rounded-3xl bg-emerald-50 p-4'>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700'>Companies</p>
                <p className='mt-2 text-2xl font-bold text-emerald-950'>{filteredCompanies.length}</p>
              </div>
              <div className='rounded-3xl bg-blue-50 p-4'>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-blue-700'>Open Roles</p>
                <p className='mt-2 text-2xl font-bold text-blue-950'>{openRoles}</p>
              </div>
              <div className='rounded-3xl bg-amber-50 p-4'>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-amber-700'>Package Range</p>
                <p className='mt-2 text-lg font-bold text-amber-950'>7.5 - 24 LPA</p>
              </div>
            </div>
          </div>

          <div className='mt-8 max-w-2xl'>
            <input
              type='text'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search by company, role, package or location'
              className='w-full rounded-full border border-emerald-200 bg-slate-50 px-5 py-4 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
            />
          </div>
        </div>

        {loading && <p className='mt-8 text-slate-700'>Loading companies...</p>}

        {!loading && filteredCompanies.length === 0 && (
          <p className='mt-8 text-slate-700'>No companies match your search. Try another keyword.</p>
        )}

        <div className='mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
          {filteredCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              name={company.companyName}
              role={company.role}
              salaryPackage={company.salaryPackage}
              location={company.location}
              about={company.about}
              perks={company.perks}
              onViewDetails={() => setSelectedCompany(company)}
            />
          ))}
        </div>
      </div>

      {selectedCompany && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm'>
          <div className='w-full max-w-2xl rounded-[32px] bg-white p-6 shadow-2xl sm:p-8'>
            <div className='flex items-start justify-between gap-4'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700'>Company Profile</p>
                <h2 className='mt-3 text-3xl font-bold text-emerald-950'>{selectedCompany.companyName}</h2>
              </div>
              <button
                type='button'
                onClick={() => setSelectedCompany(null)}
                className='rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200'
              >
                Close
              </button>
            </div>

            <div className='mt-6 grid gap-4 sm:grid-cols-2'>
              <div className='rounded-3xl bg-emerald-50 p-5'>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700'>Role</p>
                <p className='mt-2 text-lg font-semibold text-emerald-950'>{selectedCompany.role}</p>
              </div>
              <div className='rounded-3xl bg-blue-50 p-5'>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-blue-700'>Package</p>
                <p className='mt-2 text-lg font-semibold text-blue-950'>{selectedCompany.salaryPackage}</p>
              </div>
              <div className='rounded-3xl bg-amber-50 p-5'>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-amber-700'>Location</p>
                <p className='mt-2 text-lg font-semibold text-amber-950'>{selectedCompany.location}</p>
              </div>
              <div className='rounded-3xl bg-slate-50 p-5'>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-700'>Focus</p>
                <p className='mt-2 text-lg font-semibold text-slate-950'>Product, platform and hiring growth</p>
              </div>
            </div>

            <p className='mt-6 text-slate-600 leading-7'>
              {selectedCompany.about || 'This company profile highlights a curated placement opportunity with practical recruiter-ready details.'}
            </p>

            <div className='mt-6 flex flex-wrap gap-2'>
              {(selectedCompany.perks || []).map((perk) => (
                <span key={perk} className='rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700'>
                  {perk}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
