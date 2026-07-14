import Company from '../models/company.js'
import { isDatabaseReady, fallbackCompanyStore } from '../utils/fallbackStore.js';

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

         
        const company = isDatabaseReady() ? await Company.create(req.body) : fallbackCompanyStore.create(req.body);


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
      const companies = isDatabaseReady() ? await Company.find() : fallbackCompanyStore.list();
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
     const comapany = isDatabaseReady() ? await Company.findById(req.params.id) : fallbackCompanyStore.getById(req.params.id);

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
      const comapany = isDatabaseReady()
         ? await Company.findByIdAndUpdate(req.params.id, req.body, { new: true })
         : fallbackCompanyStore.update(req.params.id, req.body);

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
      if (isDatabaseReady()) {
         await Company.findByIdAndDelete(req.params.id);
      } else {
         fallbackCompanyStore.delete(req.params.id);
      }
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