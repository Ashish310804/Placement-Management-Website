import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    otpHash: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    lastSentAt: {
      type: Date,
      default: null,
    },
    purpose: {
      type: String,
      enum: ['signup', 'password-reset'],
      default: 'signup',
    },
    role: {
      type: String,
      enum: ['student', 'company'],
      required: true,
    },
  },
  { timestamps: true }
);

otpSchema.index({ email: 1, purpose: 1 }, { unique: true });

export default mongoose.model('Otp', otpSchema);
