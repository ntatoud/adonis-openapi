import type { Route, RouteResource } from '@adonisjs/core/http';
import type { ResourceActionNames } from '@adonisjs/http-server/types';
import { addMeta } from '../openapi_store.js';
import type { OpenApiMeta } from '../types/index.js';

type ResourceMetdata = Partial<Record<ResourceActionNames, OpenApiMeta>>;
type ResourceRouteName<ActionName extends ResourceActionNames> = `${string}.${ActionName}`;

export function openapi(this: RouteResource, resourceMetadata: ResourceMetdata) {
	setRoutesMetadata(this.routes, resourceMetadata);
	return this;
}

function setRoutesMetadata(routes: Route[], resourceMetadata: ResourceMetdata) {
	for (const route of routes) {
		const routeName = getResourceRouteName(route);
		const routeActionName = getActionName(routeName);

		const actionNameMeta = resourceMetadata[routeActionName];
		if (actionNameMeta) {
			addMeta(routeName, actionNameMeta);
		}
	}
}

function getResourceRouteName<T extends ResourceRouteName<ResourceActionNames>>(route: Route): T {
	return route.getName() as T;
}

function getActionName<T extends ResourceRouteName<ResourceActionNames>>(
	routeName: T,
): ResourceActionNames {
	const action = routeName.split('.').pop();
	return action as ResourceActionNames;
}
