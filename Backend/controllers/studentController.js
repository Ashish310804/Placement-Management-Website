import Student from "../models/student.js"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
// Requirements

// Minimum 8 characters
// At least one uppercase letter
// At least one lowercase letter
// At least one digit
// At least one special character


export const addStudent = async (req, res) => {
  
  try {
    const { name, email, course, skills } = req.body;

    if (!name) return res.status(400).json({ success: false, message: "Please provide name" });
    if (!email) return res.status(400).json({ success: false, message: "Please provide email" })

    if (!emailRegex.test(email)) return res.status(400).json({ success: false, message: "please provide valid email" })

    if (!course) return res.status(400).json({ success: false, message: "Please provide course" });
    if (!skills) return res.status(400).json({ success: false, message: "Please provide skills" })

    const student = await Student.create(req.body);
    res.status(201).json({
      success: true,
      message: "Student created successfully",
      student: student
    })
  } catch (error) {
    {
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  }
}

export const getStudent = async (req, res) => {
  try {
    const student = await Student.find();
    res.status(200).json({
      success: true,
      message: "Successfully reaceived the data",
      student: student
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const registerStudent = async (req, res) => {
  try {
    const { name, email, password, skills, course,role } = req.body;

    if (!name) return res.status(400).json({ success: false, message: "Please eneter name" });
    if (!email) return res.status(400).json({ success: false, message: "Please eneter email" });
    if (!password) return res.status(400).json({ success: false, message: "Please eneter password" });
    if (!skills) return res.status(400).json({ success: false, message: "Please eneter skills" });
    if (!course) return res.status(400).json({ success: false, message: "Please eneter course" });

    if (!passwordRegex.test(password)) return res.status(400).json({
      success: false,
      message: `Requirements
                Minimum 8 characters
                At least one uppercase letter
                At least one lowercase letter
                At least one digit
                At least one special character`
    });
    
    if (!emailRegex.test(email)) return res.status(400).json({ success: false, message: "please provide valid email" })

    const existUser = await Student.findOne({ email });
    // console.log(existUser);
    if (existUser) {
      res.status(400).json({
        success: false,
        message: "Student Already Registered please Login..."
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)// (password,salt)
    console.log(hashedPassword);//$2b$10$5dGT4b6/SoYVoECx6BZYuO95SmOHpNPIQ.gdVPXTqA9tip6WiK9/S

    const student=await Student.create({
      name,
      email,
      password:hashedPassword,
      course,
      skills,
      role
    })


    res.status(201).json({
      success: true,
      message: "Student Registered successfully",
      student:student
    })



  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const loginStudent = async (req, res) => {
  try{
     const{email,password}=req.body

     

     const student=await Student.findOne({email});

     // checking for existing user
     if(!student){
      return res.status(400).json({
        success:false,
        message:"Student not found register first"
      })
     }

     //password match
    let comapredPassword=await bcrypt.compare(password,student.password);

    if(!comapredPassword){
      return res.status(400).json({
         success:false,
         message:"Password is not correct",
      })
    }
     console.log("tken")
    // token generating
    let token=jwt.sign({id:student._id,email:student.email},"This is my secret key",{expiresIn:'1d'});


    res.status(200).json({
      success:true,
      message:"token generated successfully",
      token:token
    })

  }catch(error){
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}
