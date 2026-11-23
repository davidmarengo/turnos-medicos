// js/pages/mis-turnos.js
import { requireRole } from "../session.js";
import { renderNavbar } from "../navbar.js";
import { getAppointments, getDoctors, updateAppointment } from "../api.js";

const session = requireRole("USUARIO");;

const renderTurnos = (turnos, doctors) => {
  const contenedor = document.getElementById("lista-turnos");
  contenedor.textContent = "";

  if (turnos.length === 0) {
    contenedor.textContent = "Todavía no tenés turnos.";
    return;
  }

  turnos.forEach((turno) => {
    const doctor = doctors.find((d) => d.id === turno.doctorId);

    const card = document.createElement("article");

    const nombre = document.createElement("h2");
    nombre.textContent = doctor ? doctor.nombre : "Médico no encontrado";

    const especialidad = document.createElement("p");
    especialidad.textContent = doctor ? doctor.especialidad : "";

    const fechaHora = document.createElement("p");
    fechaHora.textContent = `${turno.fecha} - ${turno.hora}`;

    const estado = document.createElement("p");
    estado.textContent = `Estado: ${turno.estado}`;

    card.append(nombre, especialidad, fechaHora, estado);

    if (turno.estado === "Pendiente" || turno.estado === "Confirmado") {
      const boton = document.createElement("button");
      boton.textContent = "Cancelar turno";
      boton.addEventListener("click", async () => {
        if (!confirm("¿Querés cancelar este turno?")) return;
        await updateAppointment(turno.id, { ...turno, estado: "Cancelado" });
        cargarTurnos();
      });
      card.appendChild(boton);
    }

    contenedor.appendChild(card);
  });
};

const cargarTurnos = async () => {
  const appointments = await getAppointments();
  const doctors = await getDoctors();
  const misTurnos = appointments.filter((a) => a.patientId === session.id);
  renderTurnos(misTurnos, doctors);
};

if (session) {
  renderNavbar();
  cargarTurnos();
}