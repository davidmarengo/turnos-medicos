// js/api.js
const API_URL = "https://6af4a52255a1de7dcf04572d.mockapi.io";

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