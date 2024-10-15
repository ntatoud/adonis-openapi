import { test } from '@japa/runner';
import { openapiStore, storeOpenApiMeta } from '../src/features/openapi_store.js';

test.group('OpenAPI Store', () => {
	test('it should have initial state', async ({ assert }) => {
		const { getInitialState } = openapiStore;

		const { meta: initialMeta } = getInitialState();
		assert.deepEqual(initialMeta, {});
	});

	test('it should add value to the store', ({ assert }) => {
		const metaToAdd = {
			metaKey: 'newMeta',
			meta: {
				method: 'PUT',
				name: 'register',
			},
		};

		storeOpenApiMeta(metaToAdd.metaKey, metaToAdd.meta);

		const { meta } = openapiStore.getState();

		assert.deepEqual(meta, { [metaToAdd.metaKey]: metaToAdd.meta });
	});
});
