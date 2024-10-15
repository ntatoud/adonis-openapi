import type { Route } from '@adonisjs/http-server';
import type { StoreRouteHandler } from '@adonisjs/http-server/types';
import { storeOpenApiMeta } from '../../../features/openapi_store.js';
import { getRouteHandlerName } from '../../../features/utils/helpers.js';
import type { OpenApiMeta } from '../../../types/index.js';

export function routeOpenapi(this: Route, metadata: OpenApiMeta) {
	const { handler } = this.toJSON();
	setRouteMetadata(handler, metadata);
	return this;
}

function setRouteMetadata(routeHandler: StoreRouteHandler, metadata: OpenApiMeta) {
	const metaKey = getRouteHandlerName(routeHandler);

	if (metaKey) {
		storeOpenApiMeta(metaKey, metadata);
	}
}
