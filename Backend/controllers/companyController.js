import Company from '../models/company.js'

export const addCompany=async (req,res)=> {
     try{
        console.log(req.body)
        const{companyName,role,salaryPackage,location}=req.body;

         if(companyName==""){
            return res.status(400).send("please provide comapnay name");
         }

         if(role==""){
            return res.status(400).send("please provide comapnay name");
         }

         
        const company=await Company.create(req.body);


        res.status(201).json({
            success:true,
            message:"Comapnay added successfully",
            company
        })
        
     }catch(error){
        console.log(error)
     }
}

export const getCompany=async(req,res)=>{
   try{
      const companies=await Company.find();
      if(companies.length==0){
         return res.status(404).json({
            success:false,
            message:"Companies not found"
         })
      }
   res.status(200).json({
      success:true,
      companies:companies
   })
   }catch(error){
      res.status(500).json({
         success:false,
         message:error.message
      })
   }
}

export const getCompanyById=async(req,res)=>{
   try{
     console.log(req.params.id);
     const comapany=await Company.findById(req.params.id);

     if(!comapany) return res.status(404).json({success:false,message:"Company not found"})
     res.status(200).json({
      success:true,
      message:"Company received successfully...",
      comapnay:comapany
     })
   }catch(error){
      res.status(500).json({
         success:false,
         message:error.message
      })
   }
}

export const updateCompany=async(req,res)=>{
   try{
      const comapany=await Company.findByIdAndUpdate(
         req.params.id,
         req.body,
         {new:true}
      )

      res.status(200).json({
         success:true,
         message:"Company updated successfuly",
         comapany:comapany
      })
   }catch(error){
      res.status(500).json({
         success:false,
         message:error.message
      })
   }
}

export const deleteCompany=async(req,res)=>{
   try{
      await Company.findByIdAndDelete(req.params.id)
      res.status(200).json({
         success:true,
         message:"Company Deleted Successfully"
      })

   }catch(error){
      res.status(500).json({
         success:false,
         message:error.message
      })
   }
}