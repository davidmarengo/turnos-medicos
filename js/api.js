// js/api.js
const API_URL = "https://6af4a52255a1de7dcf04572d.mockapi.io";
const API_URL_CITAS = "https://6afbac0e892984c4494a071b.mockapi.io";

const request = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Error del servidor (${response.status})`);
  }
  return response.json();
};

export const getUsers = async () => {
  return request(`${API_URL}/users`);
};

export const getUserByEmail = async (email) => {
  const response = await fetch(`${API_URL}/users?email=${encodeURIComponent(email)}`);
  // MockAPI puede responder 404 cuando el filtro no encuentra coincidencias.
  if (response.status === 404) return [];
  if (!response.ok) throw new Error(`Error del servidor (${response.status})`);
  return response.json();
};

export const createUser = async (user) => {
  return request(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
};

export const getDoctors = async () => {
  return request(`${API_URL}/doctors`);
};

export const getAppointments = async () => {
  return request(`${API_URL_CITAS}/appointments`);
};    

export const createAppointment = async (appointment) =>
  request(`${API_URL_CITAS}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appointment),
  });

export const updateAppointment = async (id, data) => {
  return request(`${API_URL_CITAS}/appointments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};


// ---------- MÉDICOS ----------
export const createDoctor = async (doctor) => {
  return request(`${API_URL}/doctors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(doctor),
  });
};

export const updateDoctor = async (id, data) => {
  return request(`${API_URL}/doctors/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const getDoctorById = async (id) => {
  return request(`${API_URL}/doctors/${id}`);
};

// ---------- USUARIOS (admin) ----------
export const getUsersFull = async () => {
  return request(`${API_URL}/users`);
};

export const updateUser = async (id, data) => {
  return request(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};
