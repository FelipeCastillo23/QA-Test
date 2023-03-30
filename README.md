

## Descripción

Prueba para QA.

## Installación

```bash
$ npm install
```

## Ejecutar la aplicación

Copie el archivo .env.example y renombre la copia por .env, cambie los valores de acuerdo a la configuración de su pc.

```bash
PORT = '3000'
TYPE = 'postgres'
HOST = '127.0.0.1'
PORT_DB = '5432'
USERNAME_DB = 'root'
PASSWORD_DB = 'root'
DATABASE = 'defaultdb'
AUTOLOADENTITIES = 'true'
SYNCHRONIZE = 'true'
```

Ejecute el docker compose para crear la base de datos

```bash
$ docker-compose up
```

Luego ejecute la aplicación para poder hacer uso de los endpoints

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## endpoints

```bash
# Auth
Descripción: Registra un usuario
POST /auth/signup
body:
    username: obligatorio, unico, texto
    email: obligatorio, unico, email, texto
    password: obligatorio, tamaño minimo 8, seguro, texto
    fullname: obligatorio, texto
respuesta:
    Objeto del usuario creado con id, fecha de creación y fecha de actualización

Descripción: Autentica un usuario
POST /auth/login
body:
    username: obligatorio si no hay email, texto
    email: obligatorio si no hay username, unico, email, texto
    password: obligatorio, texto
resuesta:
    Objeto con access_token
Observación: Es posible iniciar sesión con username o email

#Post
Descripción: Crea un post con el usuario que este autenticado, ruta protegida
POST /post
body:
    title: obligatorio, texto
    content: obligatorio, texto
resuesta:
    Objeto con el post que se creó y el usuario

Descripción: lista todos los posts creados, ruta protegida
GET /post
resuesta:
    Lista de objetos de tipo post

Descripción: lista el post solicitado, ruta protegida
GET /post/:id
resuesta:
    Objeto de tipo post

Descripción: actualiza el post con la información enviada, ruta protegida
PATCH /post/:id
body:
    title: opcional, texto
    content: opcional, texto
resuesta:
    Objeto de tipo post actualizado

Descripción: elimina el post, ruta protegida
DELETE /post/:id
resuesta:
    Objeto de tipo post con el campo deletedAt con la fecha de eliminación (soft delete)

#Comment
Descripción: Crea un comentario a un post relacionado al usuario autenticado, ruta protegida
POST /comment
body:
    post: obligatorio, texto, id del post
    content: obligatorio, texto
resuesta:
    Objeto con el comentario que se creó, el post relacionado y el usuario

Descripción: Actualiza un comentario, ruta protegida
PATCH /comment/:id
body:
    content: obligatorio, texto
resuesta:
    Objeto con el comentario que se actualizó, el post relacionado y el usuario
Observación: No debe permitir cambiar el usuario o el post

Descripción: Elimina un comentario, ruta protegida
DELETE /comment/:id
resuesta:
    Objeto con el comentario que se eliminó con el campo deletedAt con la fecha de eliminación (soft delete)
```
## Postman

Debe crear un archivo postman donde se evidencie todos los posibles escenarios a probar basado en cada uno de los endpoints.

## Swagger

Es posible revisar y probar los endpoints solicitados via swagger, para esto es necesario ingresar a http://127.0.0.1:3000/api autenticarse en Autenticación -> /auth/login con usuario y contraseña, copiar el token y pegarlo en Authorize.

## Documentación

Debe generar un documento donde exponga los hallazgos encontrados lo mas detallado posible.

## Adicional

Se dará puntuación adicional si crea una prueba automatizada a un sitio web, con las pruebas que quiera, siéntase libre de elegir la tecnología y el sitio web que desee, sea creeativo y muéstrenos su potencial.