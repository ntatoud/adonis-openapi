import type { Route } from '@adonisjs/http-server';
import type OpenApiStore from '../../../features/openapi_store.js';
import { getRouteHandlerName } from '../../../features/utils/helpers.js';
import type { OpenApiMeta } from '../../../types/index.js';

export const routeOpenapi = (openapiStore: OpenApiStore) =>
	function routeOpenapi(this: Route, metadata: OpenApiMeta) {
		const { handler } = this.toJSON();
		const metaKey = getRouteHandlerName(handler);

		if (metaKey) {
			openapiStore.storeMetadata(metaKey, metadata);
		}
		return this;
	};
