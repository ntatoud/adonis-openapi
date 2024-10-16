import type { Route, RouteResource } from '@adonisjs/core/http';
import type { ResourceActionNames as ResourceActionName } from '@adonisjs/http-server/types';
import type OpenApiStore from '../../../features/openapi_store.js';
import type { OpenApiMeta } from '../../../types/index.js';

export type ResourceMetadata<ActionName extends ResourceActionName = ResourceActionName> = Partial<
	Record<ActionName, OpenApiMeta>
>;
type ResourceRouteName<ActionName extends ResourceActionName = ResourceActionName> =
	`${string}.${ActionName}`;

export const resourceOpenapi = (openapiStore: OpenApiStore) =>
	function (this: RouteResource, resourceMetadata: ResourceMetadata) {
		setRoutesMetadata(this.routes, resourceMetadata, openapiStore);
		return this;
	};

/**
 * Stores the resource route metadata in the openapiStore.
 *
 * It uses the `route.name` as a metaKey since it is always defined and unique for a resource action.
 */
function setRoutesMetadata(
	routes: Route[],
	resourceMetadata: ResourceMetadata,
	openapiStore: OpenApiStore,
) {
	for (const route of routes) {
		const routeName = route.getName() as ResourceRouteName;
		const routeActionName = getActionName(routeName);

		const actionMeta = resourceMetadata[routeActionName];
		if (actionMeta) {
			openapiStore.storeMetadata(routeName, actionMeta);
		}
	}
}

function getActionName(routeName: ResourceRouteName): ResourceActionName {
	return routeName.split('.').pop() as ResourceActionName;
}
