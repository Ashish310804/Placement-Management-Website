import { useEffect, useState } from 'react'
import CompanyCard from '../components/CompanyCard'
import { apiRequest } from '../api'

export default function Companies(){
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Companies</h1>
      {loading && <p className="text-slate-700">Loading companies...</p>}
      {error && <p className="text-rose-600">{error}</p>}
      {!loading && !error && companies.length === 0 && (
        <p className="text-slate-700">No companies are available yet.</p>
      )}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {companies.map(company => (
          <CompanyCard
            key={company._id}
            name={company.companyName}
            role={company.role}
            salaryPackage={company.salaryPackage}
          />
        ))}
      </div>
    </div>
  )
}
