import heroImage from '../assets/hero.png'

export default function About(){
  return (
    <div className="bg-gradient-to-b from-emerald-50 to-white">
      {/* Hero */}
      <section className="relative overflow-hidden py-28">
        <div className="max-w-7xl mx-auto px-6 lg:flex lg:items-center lg:gap-20">
          <div className="lg:w-1/2">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-900/60 mb-4">About Us</p>
            <h1 className="text-5xl font-extrabold leading-tight sm:text-6xl text-emerald-950">We connect talent with opportunity at scale</h1>
            <p className="mt-6 text-lg text-slate-700 max-w-2xl">Placement Portal is a student-focused platform that streamlines campus hiring — matching students to roles, helping companies discover talent, and supporting the entire interview lifecycle.</p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button className="inline-flex items-center justify-center rounded-full bg-emerald-950 px-8 py-4 text-white font-semibold shadow-lg shadow-emerald-950/20 transition hover:bg-emerald-800">Get Started</button>
              <button className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-8 py-4 text-white font-semibold shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500">Learn How We Work</button>
            </div>
          </div>

          <div className="mt-12 lg:mt-0 lg:w-1/2">
            <div className="relative mx-auto max-w-2xl">
              <img src={heroImage} alt="Team" className="w-full rounded-[30px] border-8 border-white/20 shadow-2xl shadow-slate-950/10" />
            </div>
          </div>
        </div>
      </section>

      {/* Features / Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          <div className="rounded-3xl bg-white p-8 shadow">
            <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
            <p className="text-slate-700">Empower students to showcase skills and help employers find the right fit quickly and fairly.</p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow flex flex-col justify-center items-start">
            <h3 className="text-2xl font-bold mb-4">Impact</h3>
            <div className="grid grid-cols-2 gap-4 w-full">
              <div>
                <p className="text-3xl font-extrabold text-emerald-950">500+</p>
                <p className="text-sm text-slate-600">Students Placed</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-emerald-950">150+</p>
                <p className="text-sm text-slate-600">Company Partners</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow">
            <h3 className="text-2xl font-bold mb-2">How We Work</h3>
            <ul className="list-disc list-inside text-slate-700 space-y-2">
              <li>Curated company drives</li>
              <li>Skill-based shortlisting</li>
              <li>Interview prep & scheduling</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">Meet the Team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow text-center">
              <div className="h-24 w-24 rounded-full bg-emerald-100 mx-auto mb-4"></div>
              <h4 className="font-semibold">Asha Kumar</h4>
              <p className="text-sm text-slate-600">Head of Partnerships</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow text-center">
              <div className="h-24 w-24 rounded-full bg-emerald-100 mx-auto mb-4"></div>
              <h4 className="font-semibold">Ravi Sharma</h4>
              <p className="text-sm text-slate-600">Product Lead</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow text-center">
              <div className="h-24 w-24 rounded-full bg-emerald-100 mx-auto mb-4"></div>
              <h4 className="font-semibold">Neha Singh</h4>
              <p className="text-sm text-slate-600">Engineering</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow text-center">
              <div className="h-24 w-24 rounded-full bg-emerald-100 mx-auto mb-4"></div>
              <h4 className="font-semibold">Karan Patel</h4>
              <p className="text-sm text-slate-600">Student Success</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
