// js/pages/register.js
import { getUserByEmail, createUser } from "../api.js";
import { renderNavbar } from "../navbar.js";

const form = document.getElementById("register-form");
const mensaje = document.getElementById("mensaje");

renderNavbar();

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;

  if (password !== password2) {
    mensaje.textContent = "Las contraseñas no coinciden";
    return;
  }

   const users = await getUserByEmail(email);
  const existe = users.find((u) => u.email === email);

  if (existe) {
    mensaje.textContent = "Ese email ya está registrado";
    return;
  }

    await createUser({ nombre, email, password, role: "USUARIO" });
  mensaje.textContent = "Cuenta creada correctamente";

    setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
});