# Tic Tac SHAKE!

## Tecnologías utilizadas

### Frontend

- Angular 9

### Backend

- Node.js
- Express.js
- Nodemon
- Jest
- Supertest

## Instalación

Para la instalación, lo primero que se debe hacer es clonar el proyecto:

    $ git clone https://github.com/ylagef/tic-tac-shake.git
    $ cd tic-tac-shake/

### Backend

En primer lugar instalaremos el backend y sus dependencias:

    $ cd backend/
    $ npm i

Posteriormente, lo lanzaremos con nodemon:

    $ nodemon

> Esto servirá el backend en la ip del cliente, puerto 3000. Por ejemplo, sea la ip del cliente 192.168.2.26, el servidor estará sirviendo en 192.168.2.26:3000.

### Frontend

En segundo lugar instalaremos el frontend y sus dependencias:

    $ cd ../frontend/
    $ npm i

Posteriormente, lo lanzaremos con el cli de Angular:

    $ ng s --host 0.0.0.0

> Esto servirá el frontend en la ip del cliente, puerto 4200 (o localhost). Por ejemplo, sea la ip del cliente 192.168.2.26, el frontend estará sirviendo en 192.168.2.26:4200.

## Ejecución

Una vez tengamos el proyecto instalado y lanzado, bastará con acceder desde el navegador a donde está servido el frontend (por ejemplo localhost:4200) y seguir las instrucciones para iniciar el juego.
