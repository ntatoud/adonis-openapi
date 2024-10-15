import type { Router } from '@adonisjs/http-server';
import { defaultUI } from '../../../handlers/docs.js';
import { generate } from '../../../handlers/swagger.js';

export function routerOpenapi(this: Router, docsPath: string) {
	// This is needed to expose the swagger specs to the documentation
	this.get('/swagger', async () => {
		return await generate(this.toJSON());
	});
	return this.get(docsPath, async () => {
		return defaultUI('/swagger');
	});
}
