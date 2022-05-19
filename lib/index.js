'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Koa = _interopDefault(require('koa'));
var KoaRouter = _interopDefault(require('koa-router'));
var koaLogger = _interopDefault(require('koa-logger'));
var koaBody = _interopDefault(require('koa-bodyparser'));
var koaCors = _interopDefault(require('@koa/cors'));
var apolloServerKoa = require('apollo-server-koa');
var merge = _interopDefault(require('lodash.merge'));
var GraphQLJSON = _interopDefault(require('graphql-type-json'));
var graphqlTools = require('graphql-tools');
var request = _interopDefault(require('request-promise-native'));
var graphql = require('graphql');
require('koa/lib/response');

/**
 * Creates a request following the given parameters
 * @param {string} url
 * @param {string} method
 * @param {object} [body]
 * @param {boolean} [fullResponse]
 * @return {Promise.<*>} - promise with the error or the response object
 */
async function generalRequest(url, method, body, fullResponse) {
	const parameters = {
		method,
		uri: encodeURI(url),
		body,
		json: true,
		resolveWithFullResponse: fullResponse
	};
	if (process.env.SHOW_URLS) {
		// eslint-disable-next-line
		console.log(url);
	}

	try {
		return await request(parameters);
	} catch (err) {
		return err;
	}
}

/**
 * Adds parameters to a given route
 * @param {string} url
 * @param {object} parameters
 * @return {string} - url with the added parameters
 */
function addParams(url, parameters) {
	let queryUrl = `${url}?`;
	for (let param in parameters) {
		// check object properties
		if (
			Object.prototype.hasOwnProperty.call(parameters, param) &&
			parameters[param]
		) {
			if (Array.isArray(parameters[param])) {
				queryUrl += `${param}=${parameters[param].join(`&${param}=`)}&`;
			} else {
				queryUrl += `${param}=${parameters[param]}&`;
			}
		}
	}
	return queryUrl;
}

/**
 * Generates a GET request with a list of query params
 * @param {string} url
 * @param {string} path
 * @param {object} parameters - key values to add to the url path
 * @return {Promise.<*>}
 */
function getRequest(url, path, parameters) {
	const queryUrl = addParams(`${url}/${path}`, parameters);
	return generalRequest(queryUrl, 'GET');
}

/**
 * Merge the schemas in order to avoid conflicts
 * @param {Array<string>} typeDefs
 * @param {Array<string>} queries
 * @param {Array<string>} mutations
 * @return {string}
 */
function mergeSchemas(typeDefs, queries, mutations) {
	return `${typeDefs.join('\n')}
    type Query { ${queries.join('\n')} }
    type Mutation { ${mutations.join('\n')} }`;
}

function formatErr(error) {
	const data = graphql.formatError(error);
	const { originalError } = error;
	if (originalError && originalError.error) {
		const { path } = data;
		const { error: { id: message$$1, code, description } } = originalError;
		return { message: message$$1, code, description, path };
	}
	return data;
}

const categoryTypeDef = `
  type Category {
      id: Int!
      name: String!
      description: String!
  }
  input CategoryInput {
      name: String!
      description: String!
  }`;

const categoryQueries = `
      allCategories: [Category]!
      categoryById(id: Int!): Category!
  `;

const categoryMutations = `
    createCategory(category: CategoryInput!): Category!
    updateCategory(id: Int!, category: CategoryInput!): Category!
    deleteCategory(id: Int!): Int
`;

const url = 'host.docker.internal';
const port = '3302';
const entryPoint = 'categories';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allCategories: (_) =>
			getRequest(URL, ''),
		categoryById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		createCategory: (_, { category }) =>
			generalRequest(`${URL}/`, 'POST', category),
		updateCategory: (_, { id, category }) =>
			generalRequest(`${URL}/${id}`, 'PUT', category),
		deleteCategory: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

const TypesDefPlay = `
  type CategoryPlay {
      id: Int!
      song_name: String!
      song_path: String!
      song_liryc: String!
      artist: String!
  }
  type CategoryLiryc {
    song_liryc: String!
}
`;

const categoryQueriesPlay= `
      update: [CategoryPlay]!
      songsbyname(name: String!): [CategoryPlay]!
      songsbyartist(artist: String!): [CategoryPlay]!
      getliryc(id: Int!): [CategoryLiryc]!
  `;

const url$1 = 'https://sounds-play-z5fiut5qsa-uc.a.run.app';
//export const port = '3000'

const URL$1 = `${url$1}`;

const resolvers$1 = {
	Query: {
		update: (_) =>
			generalRequest(`${URL$1}/update`, 'GET'),
		songsbyname: (_, { name }) =>
			generalRequest(`${URL$1}/songs_by_name/${name}`, 'GET'),
		songsbyartist: (_, { artist }) =>
			generalRequest(`${URL$1}/songs_by_artist/${artist}`, 'GET'),
		getliryc: (_, { id }) =>
			generalRequest(`${URL$1}/liryc/${id}`, 'GET')
			
	},
	
};

const TypesDefAuth = `
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
  input UserLogin {
    email: String!
    password: String!
  }
  input modifyRegister{
    nombre: String
    apellidos: String
    ubicacion: String
    sitioWeb: String
  }
  input avatar{
    avatar: String
  }
  type respuestaLogin{
    token: String!
  }
`;

const categoryQueriesAuth= `
      verperfil(id: String!):  Usuario,
      getavatar(id: String!): Usuario
  `;
const categoryMutationsAuth = `
      createUser(usuario: UserRegister!): Usuario,
      loginUser(usuario: UserLogin!): respuestaLogin,
      modifyUser(id: String!, usuario: modifyRegister): Usuario,
      deleteUser(id: String!): String,
      uploadavatar(usuario: avatar): Usuario
`;

//export const url = 'https://soundsmicroservice.herokuapp.com'
const url$2 = 'localhost';
const port$1 = '8080';

const URL$2 = `http://${url$2}:${port$1}`;

const resolvers$2 = {
	Query: {
		verperfil: (_, { id }) =>	
			generalRequest(`${URL$2}/verperfil?id=${id}`, 'GET').then(data =>{
				return data
			}),
		getavatar: (_, { id }) =>
			generalRequest(`${URL$2}/verperfil?${id}`, 'GET', usuario).then(data =>{
				console.log(data.avatar);
				return data.avatar
			}),
				
	},
	Mutation: {
		createUser: async (_, {usuario}) =>{
			await generalRequest(`${URL$2}/registro`, 'POST', usuario);
			return usuario;
		},
		loginUser: async (_, {usuario}) =>{
			const caca = await generalRequest(`${URL$2}/login`, 'POST', usuario);
			return caca;
		},
		modifyUser:(_, {id, usuario}) =>
			generalRequest(`${URL$2}/modifyperfil?${id}`, 'PUT'),
		deleteUser:(_,{id, usuario}) =>
			generalRequest(`${URL$2}/eliminaruser?${id}`, 'DELETE', usuario),
		uploadavatar:(_,{ usuario}) =>
			generalRequest(`${URL$2}/uploadavatar`, 'POST', usuario),	
	}
};

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		categoryTypeDef,
		TypesDefPlay,
		TypesDefAuth
	],
	[
		categoryQueries,
		categoryQueriesPlay,
		categoryQueriesAuth
	],
	[
		categoryMutations,
		categoryMutationsAuth
	]
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		resolvers,
		resolvers$1,
		resolvers$2
		
	)
});

const app = new Koa();
const router = new KoaRouter();
const PORT = process.env.PORT || 5000;


app.use(koaLogger());
app.use(koaCors());

app.use(async (ctx, next) => {
	if (ctx.header.authorization) {
		const token = ctx.header.authorization.match(/Bearer ([A-Za-z0-9]+)/);
		if (token && token[1]) {
			ctx.state.token = token[1];
		}
	}
	await next();
});

// GraphQL
const graphql$1 = apolloServerKoa.graphqlKoa((ctx) => ({
	schema: graphQLSchema,
	context: { token: ctx.state.token },
	formatError: formatErr
}));
router.post('/graphql', koaBody(), graphql$1);
router.get('/graphql', graphql$1);

// test route
router.get('/graphiql', apolloServerKoa.graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
