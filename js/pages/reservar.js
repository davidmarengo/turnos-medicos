// js/pages/reservar.js
import { requireRole } from "../session.js";
import { renderNavbar } from "../navbar.js";
import { getDoctors, getAppointments, createAppointment } from "../api.js";
import { HORARIOS, getNombreDia, esFechaPasada, estaOcupado, atiendeEseDia } from "../turnos-utils.js";
const session = requireRole("USUARIO");
let medico = null;

const cargarMedico = async () => {
  const params = new URLSearchParams(window.location.search);
  const doctorId = params.get("doctorId");

  const doctors = await getDoctors();
  const doctor = doctors.find((d) => d.id === doctorId);
  const contenedor = document.getElementById("datos-medico");

  if (!doctor) {
    contenedor.textContent = "No se encontró el médico.";
    return;
  }

  medico = doctor;

  const nombre = document.createElement("h2");
  nombre.textContent = doctor.nombre;

  const especialidad = document.createElement("p");
  especialidad.textContent = doctor.especialidad;

  const dias = document.createElement("p");
  dias.textContent = `Días: ${(doctor.diasDisponibles || []).join(", ")}`;

  contenedor.append(nombre, especialidad, dias);
};

const iniciarFormulario = () => {
  const selectHora = document.getElementById("hora");

  HORARIOS.forEach((hora) => {
    const opcion = document.createElement("option");
    opcion.value = hora;
    opcion.textContent = hora;
    selectHora.appendChild(opcion);
  });

  const form = document.getElementById("reserva-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const fecha = document.getElementById("fecha").value;
    const hora = selectHora.value;
    const mensaje = document.getElementById("mensaje");

    if (!medico) {
      mensaje.textContent = "Todavía se está cargando el médico, probá de nuevo";
      return;
    }

    if (esFechaPasada(fecha)) {
      mensaje.textContent = "No se pueden sacar turnos en fechas pasadas";
      return;
    }

    const dia = getNombreDia(fecha);
    if (!atiendeEseDia(medico, dia)) {
      mensaje.textContent = `El médico no atiende el día ${dia}. Atiende: ${(medico.diasDisponibles || []).join(", ")}`;
      return;
    }

    const appointments = await getAppointments();
    if (estaOcupado(appointments, medico.id, fecha, hora)) {
      mensaje.textContent = "Ese horario ya está ocupado, elegí otro";
      return;
    }

    try {
      await createAppointment({
      patientId: session.id,
      doctorId: medico.id,
      fecha,
      hora,
      estado: "Pendiente",
      });
    } catch (error) {
      console.error(error);
      mensaje.textContent = "No se pudo guardar el turno. Revisá la conexión e intentá de nuevo.";
      return;
    }

    mensaje.textContent = "Turno solicitado correctamente";
    setTimeout(() => {
      window.location.href = "mis-turnos.html";
    }, 1500);
  });
};

if (session) {
  renderNavbar();
  cargarMedico().catch((error) => {
    console.error(error);
    document.getElementById("datos-medico").textContent = "No se pudieron cargar los médicos. Revisá la conexión e intentá de nuevo.";
  });
  iniciarFormulario(); 
}
