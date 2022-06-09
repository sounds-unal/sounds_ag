import context from 'koa/lib/context';
import { generalRequest, getRequest } from '../../utilities';
import { url, port} from './server';

//const URL = `http://${url}:${port}`;
const URL = `${url}`;
const resolvers = {
	Query: {
		verperfil: (_, { id, token }) =>
			generalRequest(`${URL}/verperfil?token=${token}&id=${id}`, 'GET').then(data => {
				console.log(data);
				return data;
				
			}),
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
