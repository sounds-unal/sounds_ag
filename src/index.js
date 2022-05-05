import Koa from 'koa';
import KoaRouter from 'koa-router';
import koaLogger from 'koa-logger';
import koaBody from 'koa-bodyparser';
import koaCors from '@koa/cors';

import { graphiqlKoa, graphqlKoa } from 'apollo-server-koa';
import graphQLSchema from './graphQLSchema';

import { formatErr } from './utilities';

const app = new Koa();
const router = new KoaRouter();
const PORT = process.env.PORT || 5000;
const jwt = require('jsonwebtoken');

app.use(koaLogger());
app.use(koaCors());

// read token from header
app.use(async (ctx, next) => {
	if (ctx.header.authorization) {
		const token = ctx.header.authorization.match(/Bearer ([A-Za-z0-9]+)/);
		//const token = "BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVmYWY0NzM0YmQyYWExNmM2YzRjMzMiLCJhcGVsbGlkb3MiOiJVc3VhcmlvIiwiZW1haWwiOiJhNEB0ZXN0LmNvbSIsImV4cCI6MTY1MTgxMDk5NywiZmVjaGFfbmFjaW1pZW50byI6IjAwMDEtMDEtMDFUMDA6MDA6MDBaIiwibm9tYnJlIjoiTnVldm8iLCJzaXRpb193ZWIiOiIiLCJ1YmljYWNpb24iOiIifQ.cIdQhUiIUxENV9dymX_65zSzfEv_gwIxeXjx1Etp_OQ"
		if (token && token[1]) {
			ctx.state.token = token[1];
		}
	}
	await next();
});

// GraphQL
const graphql = graphqlKoa((ctx) => ({
	schema: graphQLSchema,
	context: { token: ctx.state.token },
	formatError: formatErr
}));
router.post('/graphql', koaBody(), graphql);
router.get('/graphql', graphql);

// test route
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
