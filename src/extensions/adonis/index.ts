import { Route, RouteResource } from '@adonisjs/core/http';
import { Router } from '@adonisjs/http-server';
import { routeOpenapi } from './routes/route.js';
import { resourceOpenapi } from './routes/route_resource.js';
import { routerOpenapi } from './routes/router.js';

export async function defineRoutesOpenapi() {
	Router.macro('openapi', routerOpenapi);
	Route.macro('openapi', routeOpenapi);
	RouteResource.macro('openapi', resourceOpenapi);
}
