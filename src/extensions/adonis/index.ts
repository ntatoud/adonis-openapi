import { Route, RouteResource } from '@adonisjs/core/http';
import { Router } from '@adonisjs/http-server';
import type OpenApiStore from '../../features/openapi_store.js';
import { routeOpenapi } from './routes/route.js';
import { resourceOpenapi } from './routes/route_resource.js';
import { routerOpenapi } from './routes/router.js';

export async function defineRoutesOpenapi(openapiStore: OpenApiStore) {
	Router.macro('openapi', routerOpenapi(openapiStore));
	Route.macro('openapi', routeOpenapi(openapiStore));
	RouteResource.macro('openapi', resourceOpenapi(openapiStore));
}
