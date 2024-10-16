import type { RouteJSON } from '@adonisjs/http-server/types';
import { test } from '@japa/runner';
import { createApp } from '../../test-utils/app.js';

test.group('Routes openapi macros', () => {
	test('Function handler Route macro', async ({ assert }) => {
		const app = await createApp();
		const openapiStore = await app.container.make('openapi.store');
		const router = await app.container.make('router');

		router
			.get('/', () => {})
			.openapi({
				name: 'Function handler',
			});
		assert.deepEqual({}, openapiStore.getMetadata());
	});

	test('Single action controller handler Route macro', async ({ assert }) => {
		const app = await createApp();
		const openapiStore = await app.container.make('openapi.store');
		const router = await app.container.make('router');

		const openapiMetadata = {
			name: 'Single action controller handler',
		};
		router.get('/test-c', 'ActionController').openapi(openapiMetadata);
		assert.deepEqual({ ActionController: openapiMetadata }, openapiStore.getMetadata());
	});

	test('Controller handler Route macro', async ({ assert }) => {
		const app = await createApp();
		const openapiStore = await app.container.make('openapi.store');
		const router = await app.container.make('router');

		const openapiMetadata = {
			name: 'Controller handler',
		};

		class RouteController {
			// NOSONAR
			async index() {}
		}

		router.get('/', [RouteController, 'index']).openapi(openapiMetadata);
		assert.deepEqual({ 'RouteController.index': openapiMetadata }, openapiStore.getMetadata());
	});

	test('RouteResource Macro', async ({ assert }) => {
		const app = await createApp();
		const openapiStore = await app.container.make('openapi.store');
		const router = await app.container.make('router');

		router.resource('/test', 'ResourceController').openapi({
			create: {
				name: 'Resource create',
			},
			destroy: {
				name: 'Resource destroy',
			},
			show: {
				name: 'Resource show',
			},
		});
		assert.deepEqual(
			{
				'test.create': {
					name: 'Resource create',
				},
				'test.destroy': {
					name: 'Resource destroy',
				},
				'test.show': {
					name: 'Resource show',
				},
			},
			openapiStore.getMetadata(),
		);
	});

	test('Router macro', async ({ assert }) => {
		const app = await createApp();

		const router = await app.container.make('router');

		router.openapi('/docs');

		router.commit();
		const { root: routes } = router.toJSON() as { root: RouteJSON[] };

		const patterns = routes.map((route) => route.pattern);

		assert.lengthOf(routes, 2);

		assert.equal(patterns[0], '/swagger');
		assert.equal(patterns[1], '/docs');
	});
});
