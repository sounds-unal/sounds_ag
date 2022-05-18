export const TypesDefAuth = `
  type Usuario {
      _id: String
      nombre: String
      apellidos: String
      fechaNacimiento: String
      password: String
      email: String
      avatar: String
      sitioWeb: String
  }
  input UserRegister {
    email: String!
    password: String!
    nombre: String
    apellidos: String
  }
  input modifyRegister{
    nombre: String
    apellidos: String
    ubicacion: String
    sitioWeb: String
  }
  input avatar{
    avatar: String!
  }
`;

export const categoryQueriesAuth= `
      verperfil(id: String!):  Usuario,
      getavatar(id: String!): Usuario
  `;
export const categoryMutationsAuth = `
      createUser(usuario: UserRegister!): Usuario,
      loginUser(usuario: UserRegister!): Usuario,
      modifyUser(id: String!, usuario: modifyRegister): Usuario,
      deleteUser(id: String!): String,
      uploadavatar(usuario: avatar): Usuario
`;  


