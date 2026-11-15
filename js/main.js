// js/main.js
import { getUsers } from "./api.js";

const mostrarUsuarios = async () => {
  const users = await getUsers();
  console.log(users);
};

mostrarUsuarios();