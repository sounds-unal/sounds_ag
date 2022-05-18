# sounds_ag
Sounds API gateway.
* `puerto 4000`.
* Añadir puertos de respectivos microservicios: `sounds_ag/src/sounds/categories/server.js`.

1. Build image.
2. Run container.

        docker build -t sounds_ag .
        docker run -p 5000:5000 --add-host=host.docker.internal:host-gateway sounds_ag

3. Ejecución de las peticiones HTTP sobre la API-GraphQL del API Gateway: http://localhost:5000/graphiql. Posibles errores corriendo _graphiql_ se debe a no coincidencia de _id_. Corregir desde la base de datos respectiva (ej. phpmyadmin).







query de auth: 

mutation{
  createUser(usuario: {
    Email: "als@lol.com",
    Password:"123000"
  }){
    ID
    Nombre
    Apellidos
    FechaNacimiento
    Email
    Password
    Avatar
    Ubicacion
    SitioWeb
  }
}