export const TypesDefConfig =`
    type suscripcion {
        nombre: String!
        precio:Int!
        descripcion: String!
    }
    input suscripInput{
        nombre: String
        precio:Int
        descripcion: String
    }

    type notificacion{
          planes: Boolean!
          musicaNueva: Boolean!
          playlist: Boolean!
    }
    input notInput {
        planes: Boolean
        musicaNueva: Boolean
        playlist: Boolean
    }

    type configuracion{
        privacidad: Boolean!
        suscripcion:suscripcion!
        notificacion:notificacion!
    }
    input configInput{
        privacidad: Boolean
    }

`;
//delete _id suscripcion 

export const QueryConfig=`
    suscripciones(id:String): [suscripcion]!
    getNotificaciones:[notificacion]!
    configuraciones:[configuracion]!
`;

export const MutationsConfig=`
updateNotification(id: String, not: notInput!):notificacion!
updateConfig(id:String, config:configInput!):configuracion!


`;
//module.exports = TypesDefConfig ;