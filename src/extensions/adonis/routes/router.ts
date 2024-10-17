import type { Router } from '@adonisjs/http-server';
import type OpenApiStore from '../../../features/openapi_store.js';
import { defaultUI } from '../../../handlers/docs.js';
import { generate } from '../../../handlers/swagger.js';

export const routerOpenapi = (openapiStore: OpenApiStore) =>
	function (this: Router, docsPath: string) {
		// This is needed to expose the swagger specs to the documentation
		this.get('/swagger', async () => {
			return await generate(this.toJSON(), openapiStore);
		});
		return this.get(docsPath, async () => {
			return defaultUI('/swagger');
		});
	};
