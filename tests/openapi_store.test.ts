import { test } from '@japa/runner';
import OpenApiStore from '../src/features/openapi_store.js';

test.group('OpenAPI Store', () => {
	test('it should have initial state', async ({ assert }) => {
		const openapiStore = new OpenApiStore();

		const intitialMetadata = openapiStore.getMetadata();
		assert.deepEqual(intitialMetadata, {});
	});

	test('it should add value to the store', ({ assert }) => {
		const openapiStore = new OpenApiStore();

		const metaToAdd = {
			metaKey: 'newMeta',
			meta: {
				method: 'PUT',
				name: 'register',
			},
		};

		openapiStore.storeMetadata(metaToAdd.metaKey, metaToAdd.meta);

		const metadata = openapiStore.getMetadata();

		assert.deepEqual(metadata, { [metaToAdd.metaKey]: metaToAdd.meta });
	});
});
