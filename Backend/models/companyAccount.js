import mongoose from 'mongoose';

const companyAccountSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'company',
      immutable: true,
    },
  },
  { timestamps: true }
);


export default mongoose.model('CompanyAccount', companyAccountSchema);
