// js/pages/reservar.js
import { requireRole } from "../session.js";
import { renderNavbar } from "../navbar.js";
import { getDoctors } from "../api.js";

const session = requireRole("USUARIO");

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

  const nombre = document.createElement("h2");
  nombre.textContent = doctor.nombre;

  const especialidad = document.createElement("p");
  especialidad.textContent = doctor.especialidad;

  const dias = document.createElement("p");
  dias.textContent = `Días: ${doctor.diasDisponibles.join(", ")}`;

  contenedor.append(nombre, especialidad, dias);
};

if (session) {
  renderNavbar();
  cargarMedico();
}