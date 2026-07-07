import mongoose from "mongoose";

const companySchema=new mongoose.Schema({
    companyName:{
        type:String,
        reqruired:true
    },
    role:{
        type:String,
        required:true
    },
    salaryPackage:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
},{timestamps:true})


export default mongoose.model("Company",companySchema);