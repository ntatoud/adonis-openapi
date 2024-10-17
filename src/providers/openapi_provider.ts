import type { ApplicationService } from '@adonisjs/core/types';
import type { ResourceActionNames } from '@adonisjs/http-server/types';
import type { ResourceMetadata } from '../extensions/adonis/routes/route_resource.js';
import OpenApiStore from '../features/openapi_store.js';
import type { OpenApiMeta } from '../types/index.js';

/**
 * Extending AdonisJS types
 */
declare module '@adonisjs/core/http' {
	export interface Router {
		/**
		 * Define the routes for API Documentation
		 * - Documentation will be under `docsPath`
		 * - Swagger file will be under `/swagger` (for now)
		 */
		openapi(docsPath: string): Route;
	}

	export interface Route {
		/**
		 * Define the openapi metadata associated to a route
		 */
		openapi(metadata: OpenApiMeta): this;
	}

	export interface RouteResource<ActionNames extends ResourceActionNames = ResourceActionNames> {
		/**
		 * Define the openapi metadata associated to actions of a route resource
		 */
		openapi(resourceMetadata: ResourceMetadata<ActionNames>): this;
	}
}

declare module '@adonisjs/core/types' {
	export interface ContainerBindings {
		'openapi.store': OpenApiStore;
	}
}

/**
 * OpenAPI service provider
 */
export default class OpenapiServiceProvider {
	constructor(protected app: ApplicationService) {}

	/**
	 * Register Route openapi macro
	 */
	protected async registerRoutesOpenapi(openapiStore: OpenApiStore) {
		const { defineRoutesOpenapi } = await import('../extensions/adonis/index.js');

		await defineRoutesOpenapi(openapiStore);
	}

	/**
	 * Invoked by AdonisJS to register container bindings
	 */
	register() {
		this.app.container.singleton(OpenApiStore, async () => {
			return new OpenApiStore();
		});

		this.app.container.alias('openapi.store', OpenApiStore);
	}

	/**
	 * Invoked by AdonisJS to extend the framework or pre-configure objects
	 */
	async boot() {
		const openapiStore = await this.app.container.make('openapi.store');

		await this.registerRoutesOpenapi(openapiStore);
	}
}
