export const TypesDefConfig =`
    type suscripcion {
        _id: String
        nombre: String!
        precio:Int!
        descripcion: String!
    }
    type notificacion{
        _id:String
          planes: Boolean
          musicaNueva: Boolean
          playlist: Boolean
 
    }
    input notInput {
        _id:String
        planes: Boolean
        musicaNueva: Boolean
        playlist: Boolean

    }
    type configuracion{
        _id: String!
        idUsuario: String!
        privacidad: Boolean!
    }

`;

export const QueryConfig=`
    suscripciones(id:String): [suscripcion]!
    getNotificaciones:[notificacion]!
    configuraciones:[configuracion]
`;

export const MutationsConfig=`
updateNotification(id: String, not: notInput!):notificacion!


`;
//module.exports = TypesDefConfig ;