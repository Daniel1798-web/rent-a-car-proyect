<p align="center"> <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a> </p> <p align="center"> <b>Rent-a-Car API</b> – API backend para gestión de autos, reservas y descuentos. </p>
Descripción

Esta es una API construida con NestJS
 y PostgreSQL que permite:

Gestionar autos y sucursales.

Crear y listar reservas para clientes.

Aplicar descuentos automáticamente.

Gestión de empleados (CRUD de descuentos y reservas).

Requisitos

Node.js >= 18

npm >= 9

Docker & Docker Compose

PostgreSQL (si no usás Docker)

Configuración del proyecto

Clonar el repositorio:

git clone <URL_DEL_REPOSITORIO>
cd rent-a-car-proyect


Instalar dependencias:

npm install


Crear archivo .env en la raíz con tus variables:

DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/rentacar
JWT_SECRET=supersecretkey
PORT=3000

Iniciar base de datos con Docker
docker-compose up -d