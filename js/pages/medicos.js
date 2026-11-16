// js/pages/medicos.js
import { renderNavbar } from "../navbar.js";
import { getSession } from "../session.js";
import { getDoctors } from "../api.js"; 

const session = getSession();

const renderMedicos = (doctors) => {
  const contenedor = document.getElementById("lista-medicos");

  doctors.forEach((doctor) => {
    const card = document.createElement("article");

    const foto = document.createElement("img");
    foto.src = doctor.foto;
    foto.alt = `Foto de ${doctor.nombre}`;

    const nombre = document.createElement("h2");
    nombre.textContent = doctor.nombre;

    const especialidad = document.createElement("p");
    especialidad.textContent = doctor.especialidad;

    const dias = document.createElement("p");
    dias.textContent = `Días: ${doctor.diasDisponibles.join(", ")}`;

    card.append(foto, nombre, especialidad, dias);
    contenedor.appendChild(card);
  });
};

const cargarMedicos = async () => {             
  const doctors = await getDoctors();
  renderMedicos(doctors);
};

if (!session) {
  window.location.href = "login.html";
} else {
  document.getElementById("saludo").textContent = `Hola, ${session.nombre}`;
  renderNavbar();
  cargarMedicos();
  }