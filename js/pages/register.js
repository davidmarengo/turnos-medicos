// js/pages/register.js
import { getUserByEmail, createUser } from "../api.js";
import { renderNavbar } from "../navbar.js";

const form = document.getElementById("register-form");
const mensaje = document.getElementById("mensaje");

renderNavbar();

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;

  if (password !== password2) {
    mensaje.textContent = "Las contraseñas no coinciden";
    return;
  }

  try {
    const users = await getUserByEmail(email);
    const existe = users.find((u) => String(u.email).toLowerCase() === email);

    if (existe) {
      mensaje.textContent = "Ese email ya está registrado";
      return;
    }

    await createUser({ nombre, email, password, role: "USUARIO" });
    mensaje.textContent = "Cuenta creada correctamente";

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  } catch (error) {
    console.error(error);
    mensaje.textContent = "No se pudo crear la cuenta. Revisá tu conexión e intentá de nuevo.";
  }
});
