
import jwt from 'jsonwebtoken'

export const verifyToken=async(req,res,next)=>{
      try{
         const authHeader=req.headers.authorization;
        //   token=bearer dfghjkliutrfghjkl.iutdfcghjiudfhgj.ydfhhjoituyio
         if(!authHeader){
            return res.status(401).json({
                success:false,
                message:"Token Missing"
            })
         }

         const token=authHeader.split(" ")[1];

         const decodedToken=jwt.verify(
            token,
            "This is my secret key"
         )
         
        //  console.log(decodedToken);//email , _id
         req.user=decodedToken;

         next();

      }catch(error){
        res.status(500).json({message:error.message})
      }
} 