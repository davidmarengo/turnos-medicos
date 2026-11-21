// js/pages/admin-turnos.js
import { requireRole } from "../session.js";
import { renderNavbar } from "../navbar.js";

const session = requireRole("ADMIN");

if (session) {
  renderNavbar();
  // Acá empieza tu parte
}