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
      verperfil(id: String!):  CategoryAuth!
      getavatar(id: String!): CategoryAuth!
  `;
export const categoryMutationsAuth = `
      createUser(usuario: UserRegister!): CategoryAuth
      loginUser(usuario: UserRegister!): respuestalogin
      modifyUser(id: String!, usuario: modifyRegister): CategoryAuth
      deleteUser(id: String!): String
      uploadavatar(usuario: avatar): CategoryAuth
      verperfilmut(id : String!): CategoryAuth
`;  


