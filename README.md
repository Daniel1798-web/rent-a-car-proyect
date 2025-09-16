# Rent-a-Car API

<p align="center">
  <b>Backend API para gestión de autos, reservas y descuentos</b>
</p>

<p align="center">
  <a href="https://nestjs.com/" target="_blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" /></a>
</p>

---

## Badges

![Node.js](https://img.shields.io/badge/Node.js-18+-green)  
![NestJS](https://img.shields.io/badge/NestJS-Framework-orange)  
![Prisma](https://img.shields.io/badge/Prisma-ORM-blue)  
![Tests](https://img.shields.io/badge/Tests-passing-brightgreen)  

---

## Tabla de contenido

- [Descripción](#descripción)  
- [Requisitos](#requisitos)  
- [Configuración del proyecto](#configuración-del-proyecto)  
- [Base de datos](#base-de-datos)  
- [Ejecución](#ejecución)  
- [Tests](#tests)  
- [Endpoints principales](#endpoints-principales)  
- [Notas importantes](#notas-importantes)  

---

## Descripción

API construida con **NestJS**, **PostgreSQL** y **Prisma** que permite:

- Gestionar autos y sucursales.  
- Crear y listar reservas para clientes.  
- Aplicar descuentos automáticamente.  
- Gestión de empleados (CRUD de descuentos, autos y reservas).  

---

## Requisitos

- Node.js >= 18  
- npm >= 9  
- Docker & Docker Compose (opcional)  
- PostgreSQL (si no usás Docker)  

---

## Configuración del proyecto

1. Clonar el repositorio:

git clone <https://github.com/Daniel1798-web/rent-a-car-proyect>
cd rent-a-car-proyect


2.Instalar dependencias:
npm install

3.Crear archivo .env en la raíz con tus variables:
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/rentacar
JWT_SECRET=supersecretkey
PORT=3000

Base de datos con Docker:
docker-compose up -d

Migraciones con Prisma:
npx prisma migrate dev --name init

Prisma Studio  (Abre una interfaz web para explorar y editar datos directamente.):
npx prisma studio

Ejecución

Modo Dev:
npm run start:dev

Modo Prod:
npm run build
npm run start:prod

Tests

Unitarios:
npm run test

End-to-end (E2E):
npm run test:e2e


Endpoints principales
Auth (Usuarios)
Método	Endpoint	Descripción
POST	/auth/register	Registrar un nuevo usuario
POST	/auth/login	Iniciar sesión
Cars
Método	Endpoint	Descripción
GET	/cars	Listar todos los autos
GET	/cars/{id}	Obtener detalle de un auto específico
Reservations (Clientes)
Método	Endpoint	Descripción
POST	/reservations	Crear una reserva para el cliente autenticado
GET	/reservations/me	Listar reservas del cliente autenticado
DELETE	/reservations/{id}	Cancelar una reserva si cumple condiciones
Admin Inventory
Método	Endpoint	Descripción
POST	/admin/inventory	Agregar o actualizar inventario de un modelo
GET	/admin/inventory/availability	Consultar disponibilidad de autos
Admin Auth
Método	Endpoint	Descripción
POST	/admin/auth/login	Login de empleado/admin
Admin Cars
Método	Endpoint	Descripción
POST	/admin/cars	Crear un nuevo modelo de auto
PUT	/admin/cars/{id}	Actualizar un modelo de auto existente
Admin Discounts
Método	Endpoint	Descripción
POST	/admin/discounts	Crear un descuento para un cliente
Admin Reservations
Método	Endpoint	Descripción
GET	/admin/reservations	Listar todas las reservas


Notas importantes

Asegurate de iniciar Prisma y la base de datos antes de levantar la app.

Para cualquier cambio en modelos de Prisma, correr siempre:
npx prisma migrate dev

Las credenciales de prueba para tests y login están definidas en los seeds.

Swagger para documentación interactiva:
http://localhost:3000/api

