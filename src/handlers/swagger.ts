import YAML from 'json-to-pretty-yaml';
import type { AdonisRoutes, OpenAPI } from '../types/index.js';

export async function swagger(routes: AdonisRoutes) {
	return YAML.stringify(await generate(routes));
}

async function generate(routes: AdonisRoutes) {
	const routeSchemas = await placeholder__getRouteSchemas(routes);
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

async function placeholder__getRouteSchemas(
	routes: AdonisRoutes,
): Promise<Record<string, OpenAPI.SchemaObject>> {
	return {};
}
