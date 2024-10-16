import type { RouteJSON } from '@adonisjs/http-server/types';
import type OpenApiStore from '../features/openapi_store.js';
import { getRouteHandlerName } from '../features/utils/helpers.js';
import type { AdonisRoutes, OpenAPI } from '../types/index.js';

export async function generate(adonisRoutes: AdonisRoutes, openapiStore: OpenApiStore) {
	const routes = adonisRoutes.root;

	if (!routes) {
		return {};
	}

	const routeSchemas = await getRouteSchemas(routes, openapiStore);

	const docs: OpenAPI.Document = {
		openapi: '3.0.1',
		info: {
			title: 'Default',
			version: '0.0.1',
		},
		components: {},
		paths: routeSchemas,
		tags: [],
	};

	return docs;
}

async function getRouteSchemas(
	routes: RouteJSON[],
	openapiStore: OpenApiStore,
): Promise<Record<string, OpenAPI.PathItemObject>> {
	const routesSchemas: Record<string, OpenAPI.PathItemObject> = {};

	for (const route of routes) {
		const routePathItem = await getRoutePathItem(route);
		const metaKey = getRouteHandlerName(route.handler);

		let schemaName: string | undefined = undefined;
		if (metaKey) {
			schemaName = openapiStore.getMetadata()[metaKey]?.name;
		}

		routesSchemas[schemaName ?? route.pattern] = {
			...routesSchemas[route.pattern],
			...routePathItem,
		};
	}

	return routesSchemas;
}

async function getRoutePathItem(route: RouteJSON): Promise<OpenAPI.PathItemObject> {
	const method = getRouteMethod(route);

	const routePathItem: Record<string, OpenAPI.OperationObject> = {
		[method]: {
			description: route.pattern,
			responses: {
				204: {
					description: 'Success',
					content: {},
				},
			},
		},
	};

	return routePathItem;
}

function getRouteMethod(route: RouteJSON) {
	return route.methods[0]!.toLowerCase();
}
