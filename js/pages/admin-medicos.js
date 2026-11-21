// js/pages/admin-medicos.js
import { requireRole } from "../session.js";
import { renderNavbar } from "../navbar.js";

const session = requireRole("ADMIN");

if (session) {
  renderNavbar();
  // Acá empieza tu parte
}