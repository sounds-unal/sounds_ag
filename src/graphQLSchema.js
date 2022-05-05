import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	categoryMutations,
	categoryQueries,
	categoryTypeDef
} from './sounds/categories/typeDefs';

import {TypesDefPlay, categoryQueriesPlay} from './sounds/sounds_play/typeDefs'

import categoryResolvers from './sounds/categories/resolvers';

import categoryResolversPlay from './sounds/sounds_play/resolvers';

import categoryResolversInte from './sounds/sounds_inte/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		categoryTypeDef,
		TypesDefPlay
	],
	[
		categoryQueries,
		categoryQueriesPlay
	],
	[
		categoryMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		categoryResolvers,
		categoryResolversPlay
	)
});
