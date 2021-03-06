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
var context = _interopDefault(require('koa/lib/context'));

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
		const { error: { id: message, code, description } } = originalError;
		return { message, code, description, path };
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
			generalRequest(`${URL$1}/update`, 'GET').then(data => {
				return data
			}),
		songsbyname: (_, { name }) =>
			generalRequest(`${URL$1}/songs_by_name/${name}`, 'GET'),
		songsbyartist: (_, { artist }) =>
			generalRequest(`${URL$1}/songs_by_artist/${artist}`, 'GET'),
		getliryc: (_, { id }) =>
			generalRequest(`${URL$1}/liryc/${id}`, 'GET')
			
	},
	
};

const TypesDefAuth = `
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

const categoryQueriesAuth= `
      verperfil(id: String!, token: String!):  CategoryAuth
      getavatar(id: String!): CategoryAuth!
  `;
const categoryMutationsAuth = `
      createUser(usuario: Register!): CategoryAuth
      loginUser(usuario: UserRegister!): respuestalogin
      modifyUser(id: String!, usuario: modifyRegister): CategoryAuth
      deleteUser(id: String!): String
      uploadavatar(usuario: avatar): CategoryAuth
`;

/* export const url = 'localhost'
export const port = '8080' */
const url$2 = 'http://34.133.178.134:8080';

const URL$2 = `${url$2}`;
//const URL = `${url}`;
const resolvers$2 = {
	Query: {
		verperfil: (_, { id, token }) =>
			generalRequest(`${URL$2}/verperfil?token=${token}&id=${id}`, 'GET').then(data => {
				console.log(data);
				return data;
				
			}),
		getavatar: (_, { id }) =>
			generalRequest(`${URL$2}/verperfil?${id}`, 'GET'),
				
	},
	Mutation: {
		createUser:(_, {usuario}) =>
			generalRequest(`${URL$2}/registro`, 'POST', usuario),
		loginUser:(_, {usuario}) =>
			generalRequest(`${URL$2}/login`, 'POST', usuario),
		modifyUser:(_, {id, usuario}) =>
			generalRequest(`${URL$2}/modifyperfil?${id}`, 'PUT', usuario),
		deleteUser:(_,{id, usuario}) =>
			generalRequest(`${URL$2}/eliminaruser?${id}`, 'DELETE', usuario),
		uploadavatar:(_,{ usuario}) =>
			generalRequest(`${URL$2}/uploadavatar`, 'POST', usuario),	
	}
};

const TypesDefInte = `
  type CategoryFavArtists {
      id: Int!
      id_artist: Int!
  }
  type CategoryFavSongs {
      id: Int!
      id_songs: Int!
  }  
  type CategoryPlaylist {
      id: Int!
      id_playlist: Int!
}
`;

const categoryQueriesInte= `
      fav_artists(id_artist: Int!): [CategoryFavArtists]!
      fav_songs(id_songs: Int!): [CategoryFavSongs]!
      playlist(id_playlist: Int!): [CategoryPlaylist]!
  `;

const url$3 = 'localhost';
const port$1 = '8080';

const URL$3 = `http://${url$3}:${port$1}`;

const resolvers$3 = {
	Query: {
		fav_artists: (_, { id_artist }) =>
			generalRequest(`${URL$3}/fav_artists/${id_artist}`, 'GET'),
		fav_songs: (_, { id_songs }) =>
			generalRequest(`${URL$3}/fav_songs/${id_songs}`, 'GET'),
		playlist: (_, { id_playlist }) =>
			generalRequest(`${URL$3}/playlist/${id_playlist}`, 'GET')
			
	},
	
};

const TypesDefConfig =`
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

const QueryConfig=`
    suscripciones(id:String): [suscripcion]!
    getNotificaciones:[notificacion]!
    configuraciones:[configuracion]!
`;

const MutationsConfig=`
updateNotification(id: String, not: notInput!):notificacion!
updateConfig(id:String, config:configInput!):configuracion!


`;
//module.exports = TypesDefConfig ;

const urlConfig= 'https://sounds-config-ms.herokuapp.com';
/*
module.exports={
    soundsConfig_url: "https://sounds-config-ms.herokuapp.com/"
}*/

const URL$4 = `${urlConfig}`;
const GET_NOTIF='notificaciones';
const GET_SUSCRIP='suscripciones';
const GET_CONFIG='configuraciones';
const UPDATE_NOTIF='updateNotification';
const UPDATE_CONFIG="updateConfig";

const resolvers$4 = {
	Query: {
		suscripciones: (_,id) =>
			generalRequest(`${URL$4}/${GET_SUSCRIP}?=${id}`, 'GET'),


		configuraciones:(_)=>
			generalRequest(`${URL$4}/${GET_CONFIG}`,'GET'),
		

		getNotificaciones: (_)=>
			generalRequest(`${URL$4}/${GET_NOTIF}`,'GET'),   

	},

	Mutation: {
		
		
		updateNotification:(_,{id,not})=>
			generalRequest(`${URL$4}/${UPDATE_NOTIF}/${id}`, 'PUT',not),

		updateConfig:(_,{id,config})=>
			generalRequest(`${URL$4}/${UPDATE_CONFIG}/${id}`, 'PUT',config),


	}
};

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		categoryTypeDef,
		TypesDefPlay,
		TypesDefAuth,
		TypesDefInte,
		TypesDefConfig
	],
	[
		categoryQueries,
		categoryQueriesPlay,
		categoryQueriesAuth,
		categoryQueriesInte,
		QueryConfig
	],
	[
		categoryMutations,
		categoryMutationsAuth,
		MutationsConfig
	]
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		resolvers,
		resolvers$1,
		resolvers$2,
		resolvers$3,
		resolvers$4
		
	)
});

const app = new Koa();
const router = new KoaRouter();
const PORT = process.env.PORT || 5000;

app.use(koaLogger());
app.use(koaCors());

// read token from header
app.use(async (ctx, next) => {
	if (ctx.header.authorization) {
		console.log(ctx.header.authorization);
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
