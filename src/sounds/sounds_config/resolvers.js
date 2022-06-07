import { generalRequest, getRequest } from '../../utilities';
import { urlConfig } from './server';

const URL = `${urlConfig}`;
const GET_NOTIF='notificaciones';
const GET_SUSCRIP='suscripciones';
const GET_CONFIG='configuraciones';
const UPDATE_NOTIF='updateNotification';
const UPDATE_CONFIG="updateConfig";

const resolvers = {
	Query: {
		suscripciones: (_,id) =>
			generalRequest(`${URL}/${GET_SUSCRIP}?=${id}`, 'GET'),


		configuraciones:(_)=>
			generalRequest(`${URL}/${GET_CONFIG}`,'GET'),
		

		getNotificaciones: (_)=>
			generalRequest(`${URL}/${GET_NOTIF}`,'GET'),   

	},

	Mutation: {
		
		
		updateNotification:(_,{id,not})=>
			generalRequest(`${URL}/${UPDATE_NOTIF}/${id}`, 'PUT',not),

		updateConfig:(_,{id,config})=>
			generalRequest(`${URL}/${UPDATE_CONFIG}/${id}`, 'PUT',config),


	}
};

export default resolvers;

