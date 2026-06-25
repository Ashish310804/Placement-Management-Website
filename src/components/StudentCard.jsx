export default function StudentCard({student}) {
  return (
    <>
      <div className='bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl border border-emerald-100'>
        <img src={student.image} 
             alt={student.name} 
             className='w-24 h-24 rounded-full mx-auto mb-4 border-4 border-emerald-500'
             />
        <h2 className='text-2xl font-bold text-center text-emerald-950'>{student.name}</h2>
        <p className='text-center text-emerald-700 mb-4'>{student.course}</p>
        <div className='space-y-2'>
          <p>
            <span className='font-semibold text-emerald-950'>College:</span>
            {student.college}</p>
          <p>
             <span className='font-semibold text-emerald-950'>Skills:</span>
            {student.skills}</p>
        </div>
      </div>
    </>
  )
}