import type { RouteJSON } from '@adonisjs/http-server/types';

export type { OpenAPIV3_1 as OpenAPI } from 'openapi-types';

export type OpenApiMeta = {
	name: string;
};

export type AdonisRoutes = Record<string, RouteJSON[]>;
