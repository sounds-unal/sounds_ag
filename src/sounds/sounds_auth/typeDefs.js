export const TypesDefAuth = `
  type CategoryAuth {
      ID: String!
      Nombre: String
      Apellidos: String
      FechaNacimiento: String!
      Email: String!
      Password: String!
      Avatar: String
      Ubicacion: String
      SitioWeb: String
  }
  input UserRegister {
    Email: String!
    Password: String!
  }
  type respuestalogin {
    Token: String
  }
  input modifyRegister{
    Nombre: String
    Apellidos: String
    Ubicacion: String
    SitioWeb: String
  }
  input avatar{
    avatar: String!
  }
`;

export const categoryQueriesAuth= `
      verperfil(id: String!):  [CategoryAuth]!
      getavatar(id: String!): CategoryAuth!
  `;
export const categoryMutationsAuth = `
      createUser(usuario: UserRegister!): CategoryAuth
      loginUser(usuario: UserRegister!): respuestalogin
      modifyUser(id: String!, usuario: modifyRegister): CategoryAuth
      deleteUser(id: String!): String
      uploadavatar(usuario: avatar): CategoryAuth
`;  


