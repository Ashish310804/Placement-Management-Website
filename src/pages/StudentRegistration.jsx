

import { useState } from 'react'

export default function StudentRegistration() {
        const[name,setName]=useState("");
        const[email,setEmail]=useState("");
        const[course,setCourse]=useState("");
        // console.log(name)

  return (
    <>
       <h1>Student Registration Form</h1>
        {/* <form action=""> */}
        <input type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={
            (e) => setName(e.target.value)
          }
        /> <br /><br />

        <input type="email"
          placeholder='Enter your Email'
          value={email}
          onChange={
            (e) => setEmail(e.target.value)
          }
        /> <br /><br />

        <input type="text"
          placeholder="enter course"
          value={course}
           onChange={
            (e) => setCourse(e.target.value)
          }
        />

      {/* </form> */}

      <h2>Preview Form</h2>
      <p>Name:{name}</p>
      <p>Email:{email}</p>
      <p>Course:{course}</p>
    </>
  )
}