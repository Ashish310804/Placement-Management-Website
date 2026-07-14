import mongoose from 'mongoose';

const fallbackStudents = [];
const fallbackCompanies = [];

export const isDatabaseReady = () => mongoose.connection.readyState === 1;

export const fallbackStudentStore = {
  list: () => [...fallbackStudents],
  getByEmail: (email) => fallbackStudents.find((student) => student.email === email),
  getById: (id) => fallbackStudents.find((student) => student._id === id),
  create: (student) => {
    const createdStudent = {
      ...student,
      _id: `${Date.now()}-${fallbackStudents.length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    fallbackStudents.push(createdStudent);
    return createdStudent;
  },
};

export const fallbackCompanyStore = {
  list: () => [...fallbackCompanies],
  getById: (id) => fallbackCompanies.find((company) => company._id === id),
  create: (company) => {
    const createdCompany = {
      ...company,
      _id: `${Date.now()}-${fallbackCompanies.length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    fallbackCompanies.push(createdCompany);
    return createdCompany;
  },
  update: (id, updates) => {
    const index = fallbackCompanies.findIndex((company) => company._id === id);
    if (index === -1) return null;

    const updatedCompany = {
      ...fallbackCompanies[index],
      ...updates,
      _id: id,
      updatedAt: new Date().toISOString(),
    };
    fallbackCompanies[index] = updatedCompany;
    return updatedCompany;
  },
  delete: (id) => {
    const index = fallbackCompanies.findIndex((company) => company._id === id);
    if (index === -1) return false;
    fallbackCompanies.splice(index, 1);
    return true;
  },
};
