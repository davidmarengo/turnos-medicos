// js/pages/admin-turnos.js
import { requireRole } from "../session.js";
import { renderNavbar } from "../navbar.js";
import { getAppointments, getDoctors, getUsers, updateAppointment } from "../api.js";
import { ESTADOS, HORARIOS } from "../turnos-utils.js"; ;

const session = requireRole("ADMIN");

let turnoActual = null;
const formReprogramar = document.getElementById("reprogramar-form");

const abrirReprogramar = (turno, doctor, paciente) => {
  turnoActual = turno;

  const nombrePaciente = paciente ? paciente.nombre : "Paciente";
  const nombreMedico = doctor ? doctor.nombre : "Médico";
  document.getElementById("reprogramar-info").textContent =
    `${nombrePaciente} con ${nombreMedico} (actual: ${turno.fecha} ${turno.hora})`;

  document.getElementById("nueva-fecha").value = turno.fecha;
  document.getElementById("nueva-hora").value = turno.hora;
  formReprogramar.hidden = false;
};                              

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

    const botonReprogramar = document.createElement("button");
    botonReprogramar.textContent = "Reprogramar";
    botonReprogramar.addEventListener("click", () => abrirReprogramar(turno, doctor, paciente));

    celdaAcciones.append(select, botonReprogramar);                
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

const iniciarFormulario = () => {
  const selectHora = document.getElementById("nueva-hora");

  HORARIOS.forEach((hora) => {
    const opcion = document.createElement("option");
    opcion.value = hora;
    opcion.textContent = hora;
    selectHora.appendChild(opcion);
  });

  document.getElementById("cancelar-reprogramar").addEventListener("click", () => {
    formReprogramar.hidden = true;
    turnoActual = null;
  });
};

if (session) {
 renderNavbar();
 iniciarFormulario();
 cargarTurnos();
}