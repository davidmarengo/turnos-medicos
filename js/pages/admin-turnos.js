// js/pages/admin-turnos.js
import { requireRole } from "../session.js";
import { renderNavbar } from "../navbar.js";
import { getAppointments, getDoctors, getUsers, updateAppointment } from "../api.js";
import { ESTADOS } from "../turnos-utils.js"; ;

const session = requireRole("ADMIN");

const renderTurnos = (appointments, doctors, users) => {
  const tbody = document.getElementById("tabla-turnos-body");
  tbody.textContent = "";

  appointments.forEach((turno) => {
    const doctor = doctors.find((d) => d.id === turno.doctorId);
    const paciente = users.find((u) => u.id === turno.patientId);

    const fila = document.createElement("tr");

    const datos = [
      paciente ? paciente.nombre : "Paciente no encontrado",
      doctor ? doctor.nombre : "Médico no encontrado",
      turno.fecha,
      turno.hora,
      turno.estado,
    ];

    datos.forEach((dato) => {
      const celda = document.createElement("td");
      celda.textContent = dato;
      fila.appendChild(celda);
    });

    const celdaAcciones = document.createElement("td");
    const select = document.createElement("select");

    ESTADOS.forEach((estado) => {
      const opcion = document.createElement("option");
      opcion.value = estado;
      opcion.textContent = estado;
      select.appendChild(opcion);
    });

    select.value = turno.estado;

    select.addEventListener("change", async () => {
      await updateAppointment(turno.id, { ...turno, estado: select.value });
      cargarTurnos();
    });

    celdaAcciones.appendChild(select);
    fila.appendChild(celdaAcciones); 

    tbody.appendChild(fila);
  });
};

const cargarTurnos = async () => {
  const appointments = await getAppointments();
  const doctors = await getDoctors();
  const users = await getUsers();
  renderTurnos(appointments, doctors, users);
};

if (session) {
  renderNavbar();
 cargarTurnos();
}