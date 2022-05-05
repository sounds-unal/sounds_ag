import { generalRequest, getRequest } from '../../utilities';
import { url, port} from './server';

const URL = `http://${url}:${port}`;

const resolvers = {
	Query: {
		fav_artists: (_, { id_artist }) =>
			generalRequest(`${URL}/fav_artists/${id_artist}`, 'GET'),
		fav_songs: (_, { id_songs }) =>
			generalRequest(`${URL}/fav_songs/${id_songs}`, 'GET'),
		playlist: (_, { id_playlist }) =>
			generalRequest(`${URL}/playlist/${id_playlist}`, 'GET')
			
	},
	
};

export default resolvers;
