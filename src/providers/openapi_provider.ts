import type { ApplicationService } from '@adonisjs/core/types';
import type { ResourceMetadata } from '../extensions/adonis/routes/route_resource.js';
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
		openapi(meta: OpenApiMeta): this;
	}

	export interface RouteResource {
		/**
		 * Define the openapi metadata associated to actions of a route resource
		 */
		openapi(resourceMetadata: ResourceMetadata): this;
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
	protected async registerRoutesOpenapi() {
		const { defineRoutesOpenapi } = await import('../extensions/adonis/index.js');

		await defineRoutesOpenapi();
	}

	/**
	 * Invoked by AdonisJS to register container bindings
	 */
	register() {}

	/**
	 * Invoked by AdonisJS to extend the framework or pre-configure objects
	 */
	async boot() {
		await this.registerRoutesOpenapi();
	}
}
