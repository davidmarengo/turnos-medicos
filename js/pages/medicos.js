// js/pages/medicos.js
import { getSession } from "../session.js";

const session = getSession();

if (!session) {
  window.location.href = "login.html";
} else {
  document.getElementById("saludo").textContent = `Hola, ${session.nombre}`;
}