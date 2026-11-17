// js/pages/mis-turnos.js
import { getSession } from "../session.js";
import { renderNavbar } from "../navbar.js";
import { getAppointments, getDoctors, updateAppointment } from "../api.js";

const session = getSession();

const cargarTurnos = async () => {
  const appointments = await getAppointments();
  const misTurnos = appointments.filter((a) => a.patientId === session.id);
  console.log(misTurnos);
};

if (!session || session.role !== "USUARIO") {
  window.location.href = "login.html";
} else {
  renderNavbar();
  cargarTurnos();
}