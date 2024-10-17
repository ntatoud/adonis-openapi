import { IgnitorFactory } from '@adonisjs/core/factories';
import { BASE_URL } from '../../bin/test.js';

const IMPORTER = (filePath: string) => {
	if (filePath.startsWith('./') || filePath.startsWith('../')) {
		return import(new URL(filePath, BASE_URL).href);
	}
	return import(filePath);
};

export const createApp = async () => {
	const ignitor = new IgnitorFactory()
		.merge({
			rcFileContents: {
				providers: [() => import('../../src/providers/openapi_provider.js')],
			},
		})
		.withCoreConfig()
		.withCoreProviders()
		.create(BASE_URL, { importer: IMPORTER });

	const app = ignitor.createApp('web');
	await app.init();
	await app.boot();

	return app;
};
