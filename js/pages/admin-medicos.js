// js/pages/admin-medicos.js
import { renderNavbar } from "../navbar.js";
import { getSession } from "../session.js";
import { getDoctors, createDoctor, updateDoctor } from "../api.js";

const session = getSession();
if (!session || session.role !== "ADMIN") {
  window.location.href = "login.html";
}

const form = document.getElementById("form-medico");
const mensaje = document.getElementById("mensaje");
const contenedor = document.getElementById("lista-medicos");
const doctorIdInput = document.getElementById("doctor-id");
const btnSubmit = document.getElementById("btn-submit");
const btnCancelar = document.getElementById("btn-cancelar");

let medicosCache = [];

const limpiarFormulario = () => {
  form.reset();
  doctorIdInput.value = "";
  btnSubmit.textContent = "Crear médico";
  btnCancelar.hidden = true;
};

const renderMedicos = (doctors) => {
  contenedor.innerHTML = "";
  medicosCache = doctors;

  if (!doctors.length) {
    contenedor.innerHTML = "<p>No hay médicos registrados.</p>";
    return;
  }

  doctors.forEach((doc) => {
    const card = document.createElement("article");
    card.className = "card-medico";

    const foto = document.createElement("img");
    foto.src = doc.foto;
    foto.alt = `Foto de ${doc.nombre}`;
    foto.width = 80;

    const info = document.createElement("div");
    info.innerHTML = `
      <h3>${doc.nombre}</h3>
      <p><strong>Especialidad:</strong> ${doc.especialidad}</p>
      <p><strong>Días:</strong> ${(doc.diasDisponibles || []).join(", ")}</p>
    `;

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", () => cargarEnFormulario(doc));

    card.append(foto, info, btnEditar);
    contenedor.appendChild(card);
  });
};

const cargarEnFormulario = (doc) => {
  doctorIdInput.value = doc.id;
  document.getElementById("nombre").value = doc.nombre;
  document.getElementById("especialidad").value = doc.especialidad;
  document.getElementById("foto").value = doc.foto;
  document.getElementById("dias").value = (doc.diasDisponibles || []).join(", ");

  btnSubmit.textContent = "Guardar cambios";
  btnCancelar.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const cargarMedicos = async () => {
  const doctors = await getDoctors();
  renderMedicos(doctors);
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  mensaje.textContent = "";

  const dias = document
    .getElementById("dias")
    .value.split(",")
    .map((d) => d.trim())
    .filter(Boolean);

  const payload = {
    nombre: document.getElementById("nombre").value.trim(),
    especialidad: document.getElementById("especialidad").value.trim(),
    foto: document.getElementById("foto").value.trim(),
    diasDisponibles: dias,
  };

  try {
    if (doctorIdInput.value) {
      await updateDoctor(doctorIdInput.value, payload);
      mensaje.textContent = "Médico actualizado correctamente.";
    } else {
      await createDoctor(payload);
      mensaje.textContent = "Médico creado correctamente.";
    }
    limpiarFormulario();
    await cargarMedicos();
  } catch (error) {
    mensaje.textContent = "Ocurrió un error al guardar.";
    console.error(error);
  }
});

btnCancelar.addEventListener("click", limpiarFormulario);

renderNavbar();
cargarMedicos();