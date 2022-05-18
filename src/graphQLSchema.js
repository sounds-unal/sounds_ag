import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	categoryMutations,
	categoryQueries,
	categoryTypeDef
} from './sounds/categories/typeDefs';
import categoryResolvers from './sounds/categories/resolvers';

import {TypesDefPlay, categoryQueriesPlay} from './sounds/sounds_play/typeDefs'
import categoryResolversPlay from './sounds/sounds_play/resolvers';

import {TypesDefAuth,categoryQueriesAuth, categoryMutationsAuth } from './sounds/sounds_auth/typeDefs';
import categoryResolversAuth from './sounds/sounds_auth/resolvers'

import {TypesDefInte,categoryQueriesInte } from './sounds/sounds_inte/typeDefs';
import categoryResolversInte from './sounds/sounds_inte/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		categoryTypeDef,
		TypesDefPlay,
		TypesDefAuth,
		TypesDefInte
	],
	[
		categoryQueries,
		categoryQueriesPlay,
		categoryQueriesAuth,
		categoryQueriesInte
	],
	[
		categoryMutations,
		categoryMutationsAuth
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		categoryResolvers,
		categoryResolversPlay,
		categoryResolversAuth,
		categoryResolversInte
		
	)
});
