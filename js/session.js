// js/session.js
const SESSION_KEY = "session";

export const saveSession = (user) => {
  const session = { id: user.id, nombre: user.nombre, role: user.role };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

export const getSession = () => {
  const data = localStorage.getItem(SESSION_KEY);
  return data ? JSON.parse(data) : null;
};

export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
};

export const requireRole = (role) => {
  const session = getSession();

  if (!session || session.role !== role) {
    window.location.href = "login.html";
    return null;
  }

  return session;
};