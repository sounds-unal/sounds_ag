import { generalRequest, getRequest } from '../../utilities';
import { url, port} from './server';

const URL = `${url}`;

const resolvers = {
	Query: {
		update: (_) =>
			generalRequest(`${URL}/update`, 'GET').then(data => {
				console.log(data);
				return data
			}),
		songsbyname: (_, { name }) =>
			generalRequest(`${URL}/songs_by_name/${name}`, 'GET'),
		songsbyartist: (_, { artist }) =>
			generalRequest(`${URL}/songs_by_artist/${artist}`, 'GET'),
		getliryc: (_, { id }) =>
			generalRequest(`${URL}/liryc/${id}`, 'GET')
			
	},
	
};

export default resolvers;

