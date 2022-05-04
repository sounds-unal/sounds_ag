import { generalRequest, getRequest } from '../../utilities';
import { url, port} from './server';

const URL = `http://${url}:${port}`;

const resolvers = {
	Query: {
		update: (_) =>
			generalRequest(`${URL}/update`, 'GET'),
		songsbyname: (_, { name }) =>
			generalRequest(`${URL}/songs_by_name/${name}`, 'GET'),
		songsbyartist: (_, { artist }) =>
			generalRequest(`${URL}/songs_by_artist/${artist}`, 'GET'),
		getliryc: (_, { id }) =>
			generalRequest(`${URL}/liryc/${id}`, 'GET')
			
	},
	
};

export default resolvers;
