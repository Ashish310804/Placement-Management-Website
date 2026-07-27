const AUTH_KEY = 'placement_auth';
const ACCOUNTS_KEY = 'placement_accounts';
const TOKEN_KEY = 'placement_token';
const USER_KEY = 'placement_user';
const ROLE_KEY = 'placement_role';

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function getStoredAuth() {
  const stored = readJson(AUTH_KEY, null);
  if (stored?.user) {
    return stored;
  }

  const token = localStorage.getItem(TOKEN_KEY);
  const user = readJson(USER_KEY, null);
  const role = localStorage.getItem(ROLE_KEY);

  if (token && user) {
    return { token, user, role: role || 'student' };
  }

  return null;
}

export function saveAuth({ token, user, role }) {
  const auth = {
    token: token || localStorage.getItem(TOKEN_KEY) || `local-${Date.now()}`,
    user,
    role,
  };

  localStorage.setItem(TOKEN_KEY, auth.token);
  localStorage.setItem(USER_KEY, JSON.stringify(auth.user));
  localStorage.setItem(ROLE_KEY, auth.role);
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  window.dispatchEvent(new Event('placement-auth-changed'));
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(AUTH_KEY);
  window.dispatchEvent(new Event('placement-auth-changed'));
}

export function getLocalAccounts() {
  return readJson(ACCOUNTS_KEY, []);
}

export function registerLocalAccount({ role, email, password, profile }) {
  const accounts = getLocalAccounts();
  const normalizedEmail = email.toLowerCase();

  if (accounts.some((account) => account.role === role && account.email === normalizedEmail)) {
    throw new Error('An account with this email already exists.');
  }

  const account = {
    id: `${role}-${Date.now()}`,
    role,
    email: normalizedEmail,
    password,
    profile,
    createdAt: new Date().toISOString(),
  };

  accounts.push(account);
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  return account;
}

export function loginLocalAccount({ role, email, password }) {
  const accounts = getLocalAccounts();
  const account = accounts.find((item) => item.role === role && item.email === email.toLowerCase());

  if (!account) {
    throw new Error('No account found for this email.');
  }

  if (account.password !== password) {
    throw new Error('Incorrect password.');
  }

  return account;
}
