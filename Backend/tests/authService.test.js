import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeUser, validateEmail, validatePassword } from '../services/authService.js';

test('validateEmail accepts valid addresses', () => {
  assert.equal(validateEmail('student@example.com'), true);
  assert.equal(validateEmail('student+test@college.edu.in'), true);
});

test('validateEmail rejects invalid addresses', () => {
  assert.equal(validateEmail('student@'), false);
  assert.equal(validateEmail('student.example.com'), false);
});

test('validatePassword enforces strong password rules', () => {
  assert.equal(validatePassword('Password1!'), true);
  assert.equal(validatePassword('password1!'), false);
  assert.equal(validatePassword('Password!'), false);
});

test('sanitizeUser removes password and version fields', () => {
  const inputUser = {
    _id: '123',
    name: 'Asha',
    email: 'asha@example.com',
    password: 'secret',
    __v: 0,
  };

  const sanitized = sanitizeUser(inputUser);
  assert.deepEqual(sanitized, { _id: '123', name: 'Asha', email: 'asha@example.com' });
});
