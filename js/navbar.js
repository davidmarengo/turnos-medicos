// js/navbar.js
import { getSession, clearSession } from "./session.js";

const MENUS = {
  GUEST: [
    { texto: "Iniciar sesión", href: "login.html" },
    { texto: "Registrarse", href: "register.html" },
  ],
  USUARIO: [
    { texto: "Médicos", href: "medicos.html" },
    { texto: "Mis turnos", href: "mis-turnos.html" },
    { texto: "Mi perfil", href: "perfil.html" },
  ],
  ADMIN: [
    { texto: "Médicos", href: "admin-medicos.html" },
    { texto: "Turnos", href: "admin-turnos.html" },
    { texto: "Usuarios", href: "admin-usuarios.html" },
    { texto: "Dashboard", href: "dashboard.html" },
  ],
};

export const renderNavbar = () => {
  const nav = document.getElementById("navbar");
  const session = getSession();
  const rol = session ? session.role : "GUEST";
  const items = MENUS[rol] || MENUS.GUEST;

  items.forEach((item) => {
    const link = document.createElement("a");
    link.textContent = item.texto;
    link.href = item.href;
    nav.appendChild(link);
  });

  if (session) {
    const logout = document.createElement("a");
    logout.textContent = "Cerrar sesión";
    logout.href = "#";
    logout.addEventListener("click", (event) => {
      event.preventDefault();
      clearSession();
      window.location.href = "login.html";
    });
    nav.appendChild(logout);
  }
};