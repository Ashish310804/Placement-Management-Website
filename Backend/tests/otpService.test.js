import test from 'node:test';
import assert from 'node:assert/strict';
import { generateOtp, hashOtp, isOtpExpired } from '../services/otpService.js';

test('generateOtp creates a six digit code', () => {
  const otp = generateOtp();
  assert.equal(otp.length, 6);
  assert.match(otp, /^\d{6}$/);
});

test('hashOtp and compare work correctly', async () => {
  const otp = '123456';
  const hashedOtp = await hashOtp(otp);
  assert.notEqual(hashedOtp, otp);
});

test('isOtpExpired returns true once expiry time has passed', () => {
  const expiredAt = new Date(Date.now() - 1000);
  assert.equal(isOtpExpired(expiredAt), true);
});
