import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'placement-secret';

export const createAuthToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role || 'student',
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const sanitizeUser = (user) => {
  if (!user) return null;

  const plainUser = user.toObject ? user.toObject() : user;
  const { password, __v, ...safeUser } = plainUser;
  return safeUser;
};

export const validateEmail = (email) => {
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
};

export const validatePassword = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
};
