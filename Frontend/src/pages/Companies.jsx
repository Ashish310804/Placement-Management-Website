import { useEffect, useMemo, useState } from 'react'
import CompanyCard from '../components/CompanyCard'
import { apiRequest } from '../services/api'

export default function Companies(){
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const data = await apiRequest('/company')
        setCompanies(data.companies || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadCompanies()
  }, [])

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) =>
      company.companyName?.toLowerCase().includes(query.toLowerCase()) ||
      company.role?.toLowerCase().includes(query.toLowerCase()) ||
      company.location?.toLowerCase().includes(query.toLowerCase())
    )
  }, [companies, query])

  return (
    <div className='bg-emerald-50 py-20'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='mb-10 rounded-3xl bg-white p-10 shadow-lg'>
          <h1 className='text-4xl font-bold text-emerald-950'>Companies</h1>
          <p className='mt-4 text-slate-600'>Browse companies recruiting through our placement portal and find your next opportunity.</p>
          <div className='mt-8 max-w-md'>
            <input
              type='text'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search by company, role or location'
              className='w-full rounded-3xl border border-emerald-200 px-4 py-3 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200'
            />
          </div>
        </div>

        {loading && <p className='text-slate-700'>Loading companies...</p>}
        {error && <p className='text-rose-600'>{error}</p>}
        {!loading && !error && filteredCompanies.length === 0 && (
          <p className='text-slate-700'>No companies match your search. Try another keyword.</p>
        )}

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {filteredCompanies.map((company) => (
            <CompanyCard
              key={company._id}
              name={company.companyName}
              role={company.role}
              salaryPackage={company.salaryPackage}
              location={company.location}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
