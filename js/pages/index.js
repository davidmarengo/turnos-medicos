// js/pages/index.js
import { getSession } from "../session.js";
import { renderNavbar } from "../navbar.js";

const session = getSession();

renderNavbar();

if (session) {
  document.getElementById("saludo").textContent = `Hola, ${session.nombre}`;
}