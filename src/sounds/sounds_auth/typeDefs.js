export const TypesDefAuth = `
  type CategoryAuth {
      id: String!
      nombre: String
      apellidos: String
      fechaNacimiento: String
      email: String
      password: String
      avatar: String
      ubicacion: String
      sitioWeb: String
  }
  input UserRegister {
    email: String!
    password: String!
  }
  input Register {
    email: String!
    password: String!
    nombre: String!
    apellidos: String!
  }
  input setToken {
    token: String!
  }
  type respuestalogin {
    token: String
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
      verperfil(id: String!, token: String!):  CategoryAuth
      getavatar(id: String!): CategoryAuth!
  `;
export const categoryMutationsAuth = `
      createUser(usuario: Register!): CategoryAuth
      loginUser(usuario: UserRegister!): respuestalogin
      modifyUser(id: String!, usuario: modifyRegister): CategoryAuth
      deleteUser(id: String!): String
      uploadavatar(usuario: avatar): CategoryAuth
`;  


