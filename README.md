# Sistema de Turnos Médicos

Trabajo Práctico Integrador 2026 - Programación III.

Sistema web para una clínica: los pacientes consultan al cuerpo médico y piden turnos, y el administrador gestiona médicos, usuarios y turnos.

## Integrantes

- Gaitan Uriel
- Tise Maximiliano
- Marengo David

## Tecnologías

- HTML5, CSS3 y JavaScript (ES6 Modules)
- Bootstrap,
- Chart.js, para el dashboard
- MockAPI (mockapi.io) como backend simulado

## Cómo probarlo

1. Clonar el repositorio.
2. Abrir la carpeta en VS Code y ejecutar `index.html` con la extensión **Live Server**. Es necesario porque el proyecto usa ES6 Modules, que no funcionan abriendo el archivo con doble clic.
3. Iniciar sesión con alguno de los usuarios de prueba.

## Usuarios de prueba

| Rol | Email | Contraseña |
|---|---|---|
| ADMIN | email@1 | admin123 |
| USUARIO (paciente) | email@2 | paciente123 |

## Funcionalidades

**Paciente (USUARIO):** registro e inicio de sesión, ver médicos, sacar turno, ver y cancelar sus turnos, editar su perfil y cambiar la contraseña.

**Administrador (ADMIN):** gestión de médicos, gestión de usuarios (alta y cambio de contraseña), lista de todos los turnos con cambio de estado y reprogramación, y dashboard con un gráfico de turnos por estado.

## Reglas de negocio

- El email es único. El registro público siempre crea usuarios con rol USUARIO.
- Todo turno nuevo se crea en estado Pendiente. Estados posibles: Pendiente, Confirmado, Cancelado y Atendido.
- No se pueden sacar ni reprogramar turnos en fechas pasadas.
- Solo se pueden sacar turnos en los días en que atiende el médico.
- Los horarios son cada 30 minutos, de 8:00 a 15:30.
- Un médico no puede tener dos turnos en la misma fecha y hora (los cancelados no cuentan).
- Un paciente solo ve y cancela sus propios turnos.
- Cada página verifica la sesión y el rol al cargar, y el menú se arma según el rol.

## Estructura del proyecto

- `*.html`: una página por pantalla (login, register, medicos, reservar, mis-turnos, perfil y las páginas de administración).
- `js/api.js`: toda la comunicación con MockAPI.
- `js/session.js`: sesión (localStorage) y protección de páginas por rol.
- `js/navbar.js`: menú según el rol.
- `js/turnos-utils.js`: reglas de los turnos (horarios, días, fechas y horarios ocupados).
- `js/pages/`: un archivo JavaScript por página.
- `css/`: estilos.

## Backend simulado (MockAPI)

Las entidades son `users`, `doctors` y `appointments`. Como el plan gratuito de MockAPI limita la cantidad de recursos por proyecto, los datos están repartidos en **dos proyectos**: `users` y `doctors` en uno, y `appointments` en otro. Las dos direcciones están definidas en `js/api.js`.

MockAPI no valida contraseñas ni tiene relaciones entre entidades, por eso el login, la protección de páginas y el cruce de datos se resuelven en el cliente con JavaScript.
