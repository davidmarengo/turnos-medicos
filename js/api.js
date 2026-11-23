// js/api.js
const API_URL = "https://6af4a52255a1de7dcf04572d.mockapi.io";
const API_URL_CITAS = "https://6afbac0e892984c4494a071b.mockapi.io";

export const getUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  const data = await response.json();
  return data;
};

export const getUserByEmail = async (email) => {
  const response = await fetch(`${API_URL}/users?email=${encodeURIComponent(email)}`);

  if (response.status === 404) {
    return [];
  }

  const data = await response.json();
  return data;
};

export const createUser = async (user) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
};

export const getDoctors = async () => {
  const response = await fetch(`${API_URL}/doctors`);
  const data = await response.json();
  return data;
};

export const getAppointments = async () => {
  const response = await fetch(`${API_URL_CITAS}/appointments`);
  const data = await response.json();
  return data;
};    

export const updateAppointment = async (id, data) => {
  const response = await fetch(`${API_URL_CITAS}/appointments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};

export const createDoctor = async (doctor) => {
  const response = await fetch(`${API_URL}/doctors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(doctor),
  });
  const data = await response.json();
  return data;
};

export const updateDoctor = async (id, doctor) => {
  const response = await fetch(`${API_URL}/doctors/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(doctor),
  });
  const data = await response.json();
  return data;
};

export const deleteDoctor = async (id) => {
  const response = await fetch(`${API_URL}/doctors/${id}`, {
    method: "DELETE",
  });
  return response.ok;
};

export const updateUser = async (id, user) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
};

export const deleteUser = async (id) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
  });
  return response.ok;
};

export const createAppointment = async (appointment) => {
  const response = await fetch(`${API_URL_CITAS}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appointment),
  });
  const data = await response.json();
  return data;
};