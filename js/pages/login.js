// js/pages/login.js
import { getUserByEmail } from "../api.js";
import { saveSession } from "../session.js";
import { renderNavbar } from "../navbar.js";

const form = document.getElementById("login-form");
const mensaje = document.getElementById("mensaje");

renderNavbar();

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;

  try {
    const users = await getUserByEmail(email);
    const user = users.find((u) => String(u.email).toLowerCase() === email);

    if (!user || user.password !== password) {
      mensaje.textContent = "Email o contraseña incorrectos";
      return;
    }

    saveSession(user);
    window.location.href = user.role === "ADMIN" ? "dashboard.html" : "medicos.html";
  } catch (error) {
    console.error(error);
    mensaje.textContent = "No se pudo conectar con el sistema. Revisá tu conexión e intentá de nuevo.";
  }
});
