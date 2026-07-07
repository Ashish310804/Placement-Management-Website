import Student from "../models/student.js"

export const isAdmin=async(req,res,next)=>{
   try{
         let email=req.user.email;
        console.log(req.user)
        const student=await Student.findOne({email});
        // console.log(student);
        if(student.role!=="admin"){
            return res.status(403).json({
                success:false,
                message:"Access Denied"
            })
        }
        console.log("admin route")
        next();
   }catch(error){
      res.status(500).json({
         success:false,
         message:error.message
      })
   }
}