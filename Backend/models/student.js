import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
      default: null,
    },
    course: {
      type: String,
      required: true,
    },
    skills: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'student',
    },
    googleId: {
      type: String,
      default: null,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    authProvider: {
      type: String,
      enum: ['local', 'google'],
      default: 'local',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Student', studentSchema);