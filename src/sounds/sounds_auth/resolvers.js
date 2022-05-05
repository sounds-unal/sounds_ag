import { generalRequest, getRequest } from '../../utilities';
import { url, port} from './server';

const URL = `http://${url}:${port}`;

const resolvers = {
	Query: {
		verperfil: (_, { id }) =>
			generalRequest(`${URL}/verperfil?${id}`, 'GET'),
		getavatar: (_, { id }) =>
			generalRequest(`${URL}/verperfil?${id}`, 'GET'),
				
	},
	Mutation: {
		createUser:(_, {usuario}) =>
			generalRequest(`${URL}/registro`, 'POST', usuario),
		loginUser:(_, {usuario}) =>
			generalRequest(`${URL}/login`, 'POST', usuario),
		modifyUser:(_, {id, usuario}) =>
			generalRequest(`${URL}/modifyperfil?${id}`, 'PUT', usuario),
		deleteUser:(_,{id, usuario}) =>
			generalRequest(`${URL}/eliminaruser?${id}`, 'DELETE', usuario),
		uploadavatar:(_,{ usuario}) =>
			generalRequest(`${URL}/uploadavatar`, 'POST', usuario),	
	}
};


export default resolvers;
