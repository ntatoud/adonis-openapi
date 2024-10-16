import { IgnitorFactory } from '@adonisjs/core/factories';

const BASE_URL = new URL('./', import.meta.url);

export const createApp = async () => {
	const ignitor = new IgnitorFactory()
		.merge({
			rcFileContents: {
				providers: [() => import('../../src/providers/openapi_provider.js')],
			},
		})
		.withCoreConfig()
		.withCoreProviders()
		.create(BASE_URL);

	const app = ignitor.createApp('web');
	await app.init();
	await app.boot();

	return app;
};
