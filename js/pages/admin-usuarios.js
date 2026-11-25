// js/pages/admin-usuarios.js
import { renderNavbar } from "../navbar.js";
import { getSession } from "../session.js";
import {
  getUsersFull,
  createUser,
  getUserByEmail,
  updateUser,
} from "../api.js";

const session = getSession();
if (!session || session.role !== "ADMIN") {
  window.location.href = "login.html";
}

const form = document.getElementById("form-usuario");
const mensajeCrear = document.getElementById("mensaje-crear");
const contenedor = document.getElementById("lista-usuarios");
const botonCrear = form.querySelector('button[type="submit"]');

const renderUsuarios = (users) => {
  contenedor.innerHTML = "";

  if (!users.length) {
    contenedor.innerHTML = "<p>No hay usuarios.</p>";
    return;
  }

  users.forEach((u) => {
    const card = document.createElement("article");
    card.className = "card-usuario";

    card.innerHTML = `
      <h3>${u.nombre}</h3>
      <p><strong>Email:</strong> ${u.email}</p>
      <p><strong>Rol:</strong> ${u.role}</p>
    `;

    const btnPass = document.createElement("button");
    btnPass.textContent = "Cambiar contraseña";
    btnPass.addEventListener("click", () => cambiarPassword(u));
    card.appendChild(btnPass);

    contenedor.appendChild(card);
  });
};

const cargarUsuarios = async () => {
  const users = await getUsersFull();
  renderUsuarios(users);
};

const cambiarPassword = async (user) => {
  const nueva = prompt(`Nueva contraseña para ${user.email}:`);
  if (nueva === null) return;
  if (nueva.length < 6) {
    alert("La contraseña debe tener al menos 6 caracteres.");
    return;
  }

  // MockAPI con PUT requiere el objeto completo
  const actualizado = { ...user, password: nueva };
  try {
    await updateUser(user.id, actualizado);
    alert("Contraseña actualizada correctamente.");
  } catch (error) {
    alert("Error al actualizar la contraseña.");
    console.error(error);
  }
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  mensajeCrear.textContent = "";

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  botonCrear.disabled = true;
  botonCrear.textContent = "Creando…";
  try {
    const existentes = await getUserByEmail(email);
    if (existentes.find((u) => String(u.email).trim().toLowerCase() === email)) {
      mensajeCrear.textContent = "Ese email ya está registrado.";
      return;
    }

    await createUser({ nombre, email, password, role });
    mensajeCrear.textContent = "Usuario creado correctamente.";
    form.reset();
    try {
      await cargarUsuarios();
    } catch (error) {
      console.error(error);
      mensajeCrear.textContent = "Usuario creado, pero no se pudo actualizar la lista. Recargá la página.";
    }
  } catch (error) {
    mensajeCrear.textContent = `No se pudo crear el usuario. ${error.message || "Revisá la conexión y los datos."}`;
    console.error(error);
  } finally {
    botonCrear.disabled = false;
    botonCrear.textContent = "Crear usuario";
  }
});

renderNavbar();
cargarUsuarios().catch((error) => {
  console.error(error);
  contenedor.textContent = "No se pudo cargar la lista de usuarios. Revisá la conexión e intentá recargar.";
});
