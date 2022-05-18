import { message } from 'koa/lib/response';
import { generalRequest, getRequest } from '../../utilities';
import { url, port} from './server';

const URL = `http://${url}:${port}`;

const resolvers = {
	Query: {
		verperfil: (_, { id }) =>	
			generalRequest(`${URL}/verperfil?${id}`, 'GET', ).then(data =>{
				console.log(data)
				return data
			}),
		getavatar: (_, { id }) =>
			generalRequest(`${URL}/verperfil?${id}`, 'GET').then(data =>{
				console.log(data.avatar)
				return data.avatar
			}),
				
	},
	Mutation: {
		createUser: async (_, {usuario}) =>{
			await generalRequest(`${URL}/registro`, 'POST', usuario);
			return usuario;
		},
		loginUser:(_, {usuario}) =>
			generalRequest(`${URL}/login`, 'POST'),
		modifyUser:(_, {id, usuario}) =>
			generalRequest(`${URL}/modifyperfil?${id}`, 'PUT'),
		deleteUser:(_,{id, usuario}) =>
			generalRequest(`${URL}/eliminaruser?${id}`, 'DELETE', usuario),
		uploadavatar:(_,{ usuario}) =>
			generalRequest(`${URL}/uploadavatar`, 'POST', usuario),	
	}
};


export default resolvers;
