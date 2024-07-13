# Warhamster

Gestiona tus torneos de warhammer

## Descripción

Este proyecto es una aplicación para gestionar una liga de Warhammer 40K. Permite gestionar usuarios, listas de ejército, partidas y torneos.

## Características

- Gestión de usuarios
- Gestión de listas de ejército
- Gestión de partidas
- Gestión de torneos
- Autenticación de usuarios mediante JWT

## Tecnologías Utilizadas

- Node.js
- Express
- Prisma
- PostgreSQL
- TypeScript
- Joi

## Instalación

### Requisitos Previos

- Node.js v14 o superior
- PostgreSQL

### Pasos de Instalación

1. Clona el repositorio:

   ```sh
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
   ```

2. Instala las dependencias:

   ```sh
   npm install
   ```

3. Configura las variables de entorno:

   ```sh
   PORT = el puerto que quieras usar
   DATABASE_URL = postgresql://usuario:contraseña@localhost:5432/tu_basededatos
   JWT_SECRET = tu_jwt_secret
   ```

4. Ejecuta las migraciones de la base de datos:

   ```sh
   npx prisma migrate dev
   ```

5. Inicia la aplicación:

   ```sh
   npm start
   ```

# API Endpoints

## Usuarios (`UserController`)

### Obtener todos los usuarios

- **URL**: `/users`
- **Método**: `GET`
- **Descripción**: Obtiene la lista de todos los usuarios.
- **Controlador**: `getAll`

### Obtener un usuario por ID

- **URL**: `/users/:id`
- **Método**: `GET`
- **Descripción**: Obtiene un usuario específico por su ID.
- **Controlador**: `readById`

### Crear un nuevo usuario

- **URL**: `/users/register`
- **Método**: `POST`
- **Descripción**: Crea un nuevo usuario.
- **Controlador**: `create`

### Login de usuario

- **URL**: `/users/login`
- **Método**: `POST`
- **Descripción**: Autentica un usuario y devuelve un token JWT.
- **Controlador**: `login`

### Actualizar un usuario

- **URL**: `/users/:id`
- **Método**: `PATCH`
- **Descripción**: Actualiza los detalles de un usuario existente.
- **Controlador**: `update`

### Eliminar un usuario

- **URL**: `/users/:id`
- **Método**: `DELETE`
- **Descripción**: Elimina un usuario específico por su ID.
- **Controlador**: `delete`

## Listas de Ejército (`ArmyListController`)

### Obtener todas las listas de ejército

- **URL**: `/armylists`
- **Método**: `GET`
- **Descripción**: Obtiene la lista de todas las listas de ejército.
- **Controlador**: `getAll`

### Obtener una lista de ejército por ID

- **URL**: `/armylists/:id`
- **Método**: `GET`
- **Descripción**: Obtiene una lista de ejército específica por su ID.
- **Controlador**: `readById`

### Obtener listas de ejército por propietario

- **URL**: `/armylists/owner/:ownerId`
- **Método**: `GET`
- **Descripción**: Obtiene todas las listas de ejército de un propietario específico.
- **Controlador**: `readByOwner`

### Crear una nueva lista de ejército

- **URL**: `/armylists`
- **Método**: `POST`
- **Descripción**: Crea una nueva lista de ejército.
- **Controlador**: `create`

### Actualizar una lista de ejército

- **URL**: `/armylists/:id`
- **Método**: `PUT`
- **Descripción**: Actualiza los detalles de una lista de ejército existente.
- **Controlador**: `update`

### Eliminar una lista de ejército

- **URL**: `/armylists/:id`
- **Método**: `DELETE`
- **Descripción**: Elimina una lista de ejército específica por su ID.
- **Controlador**: `delete`

## Partidas (`MatchController`) EN PROGRESO

### Obtener todas las partidas

- **URL**: `/matches`
- **Método**: `GET`
- **Descripción**: Obtiene la lista de todas las partidas.
- **Controlador**: `getAll`

### Obtener una partida por ID

- **URL**: `/matches/:id`
- **Método**: `GET`
- **Descripción**: Obtiene una partida específica por su ID.
- **Controlador**: `readById`

### Crear una nueva partida

- **URL**: `/matches`
- **Método**: `POST`
- **Descripción**: Crea una nueva partida.
- **Controlador**: `create`

### Actualizar una partida

- **URL**: `/matches/:id`
- **Método**: `PUT`
- **Descripción**: Actualiza los detalles de una partida existente.
- **Controlador**: `update`

### Eliminar una partida

- **URL**: `/matches/:id`
- **Método**: `DELETE`
- **Descripción**: Elimina una partida específica por su ID.
- **Controlador**: `delete`

## Torneos (`TournamentController`) EN PROGRESO

### Obtener todos los torneos

- **URL**: `/tournaments`
- **Método**: `GET`
- **Descripción**: Obtiene la lista de todos los torneos.
- **Controlador**: `getAll`

### Obtener un torneo por ID

- **URL**: `/tournaments/:id`
- **Método**: `GET`
- **Descripción**: Obtiene un torneo específico por su ID.
- **Controlador**: `readById`

### Crear un nuevo torneo

- **URL**: `/tournaments`
- **Método**: `POST`
- **Descripción**: Crea un nuevo torneo.
- **Controlador**: `create`

### Actualizar un torneo

- **URL**: `/tournaments/:id`
- **Método**: `PUT`
- **Descripción**: Actualiza los detalles de un torneo existente.
- **Controlador**: `update`

### Eliminar un torneo

- **URL**: `/tournaments/:id`
- **Método**: `DELETE`
- **Descripción**: Elimina un torneo específico por su ID.
- **Controlador**: `delete`
