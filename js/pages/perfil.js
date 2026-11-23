// js/pages/perfil.js
import { requireRole, saveSession } from "../session.js";
import { renderNavbar } from "../navbar.js";
import { getUsers, updateUser } from "../api.js";

const session = requireRole("USUARIO");
let usuario = null;

const cargarPerfil = async () => {
  const users = await getUsers();
  usuario = users.find((u) => u.id === session.id);

  if (!usuario) {
    document.getElementById("mensaje").textContent = "No se encontró tu usuario";
    return;
  }

  document.getElementById("email").value = usuario.email;
  document.getElementById("nombre").value = usuario.nombre;
};

const iniciarFormulario = () => {
  const form = document.getElementById("perfil-form");
  const mensaje = document.getElementById("mensaje");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!usuario) {
      return;
    }

    const nombre = document.getElementById("nombre").value.trim();

    if (nombre.length < 3) {
      mensaje.textContent = "El nombre debe tener al menos 3 caracteres";
      return;
    }

    const actualizado = await updateUser(usuario.id, { ...usuario, nombre });
    usuario = actualizado;
    saveSession(actualizado);
    mensaje.textContent = "Perfil actualizado correctamente";
  });
};

if (session) {
  renderNavbar();
  iniciarFormulario();
  cargarPerfil();
}