import { generalRequest, getRequest } from '../../utilities';
import { urlConfig } from './server';

const URL = `${urlConfig}`;
const GET_NOTIF='notificaciones';
const GET_SUSCRIP='suscripciones';
const GET_CONFIG='configuraciones';
const UPDATE_NOTIF='updateNotification';

const resolvers = {
	Query: {
		suscripciones: (_,idSus) =>
			generalRequest(`${URL}/${GET_SUSCRIP}?=${idSus}`, 'GET'),
			//generalRequest(`${URL}/update`, 'GET')

		configuraciones:(_)=>
			generalRequest(`${URL}/${GET_CONFIG}`,'GET'),
		

		getNotificaciones: (_)=>
			generalRequest(`${URL}/${GET_NOTIF}`,'GET'),   

	},

	Mutation: {
		
		
		updateNotification:(_,{id,not})=>
			generalRequest(`${URL}/${UPDATE_NOTIF}/${UPDATE}/${id}`, 'PUT',not),
/*
			updateParkingById:(_,{id,parking})=>
			generalRequest(`${URL}/${PARKINGS}/${UPDATE}/${id}`, 'PUT',parking),*/

	}
};

export default resolvers;

