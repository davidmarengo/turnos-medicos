// js/pages/login.js
import { getUserByEmail } from "../api.js";
import { saveSession } from "../session.js";

const form = document.getElementById("login-form");
const mensaje = document.getElementById("mensaje");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const users = await getUserByEmail(email);
  const user = users.find((u) => u.email === email);

  if (!user || user.password !== password) {
    mensaje.textContent = "Email o contraseña incorrectos";
    return;
  }

  saveSession(user);
    window.location.href = user.role === "ADMIN" ? "admin-medicos.html" : "medicos.html";

});