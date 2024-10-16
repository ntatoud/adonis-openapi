import { test } from '@japa/runner';
import OpenApiStore from '../src/features/openapi_store.js';
import { createApp } from './test-utils/app.js';

test.group('OpenAPI Provider', (group) => {
	test('register openapi provider', async ({ assert, test }) => {
		const app = await createApp();
		assert.instanceOf(await app.container.make('openapi.store'), OpenApiStore);
	});

	test('register routes.openapi macros', async ({ assert }) => {
		const app = await createApp();

		const router = await app.container.make('router');

		assert.isDefined(router.openapi);
		assert.isDefined(router.get('/', () => {}).openapi);
		assert.isDefined(router.resource('/test', 'TestController').openapi);
	});
});
