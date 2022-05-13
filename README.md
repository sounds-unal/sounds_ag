# sounds_ag
Sounds API gateway.
* Puerto: `5000`.
1. Seguir instrucciones para desplegar `sounds_ag`.
2. Configurar `sounds_ag` como sigue:
* Para crear mutations y queries seguir ejemplo de: `sounds_ag/src/sounds/categories`.
* Poner url y puerto (`localhost` y `XXXX`) del respectivo microservicio en archivo `server.js`.
* Importar archivos `typeDefs` y `resolvers` a `sounds_ag/src/graphQLSchema.js`.

## INSTRUCCIONES DESPLEGAR sounds_ag

Puerto TCP a usar: 5000.
1. (Omitir paso si ya se creó la imagen —chequear con `docker images`) 

   Crear la imagen Docker, ejecutando dentro del mismo directorio el siguiente comando: 

        docker build -t sounds_ag .

2. (Omitir paso si ya se creó el container —chequear con `docker ps -a`) 
   
   Desplegar la base de datos, mediante el siguiente comando:

        docker run -p 5000:5000 --add-host=host.docker.internal:host-gateway sounds_ag

3. Ejecución de las peticiones HTTP sobre la API-GraphQL del API Gateway: http://localhost:5000/graphiql. Posibles errores corriendo _graphiql_ se debe a no coincidencia de _id_. Corregir desde la base de datos respectiva (ej. phpmyadmin).
