// js/pages/dashboard.js
import { requireRole } from "../session.js";
import { renderNavbar } from "../navbar.js";
import { getAppointments } from "../api.js";

const session = requireRole("ADMIN");

if (session) {
  renderNavbar();
  getAppointments().then((appointments) => {
    const counts = appointments.reduce((acc, appointment) => {
      acc[appointment.estado] = (acc[appointment.estado] || 0) + 1;
      return acc;
    }, {});
    document.getElementById("resumen-turnos").textContent = `Total de turnos: ${appointments.length}`;
    const lista = document.getElementById("turnos-por-estado");
    lista.replaceChildren();
    ["Pendiente", "Confirmado", "Cancelado", "Atendido"].forEach((estado) => {
      const item = document.createElement("li");
      item.textContent = `${estado}: ${counts[estado] || 0}`;
      lista.appendChild(item);
    });
  }).catch((error) => {
    console.error(error);
    document.getElementById("resumen-turnos").textContent = "No se pudieron cargar los turnos. Revisá la conexión e intentá de nuevo.";
  });
}
