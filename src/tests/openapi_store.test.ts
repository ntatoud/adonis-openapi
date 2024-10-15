import { describe, expect, test } from 'vitest';
import { openapiStore, storeOpenApiMeta } from '../features/openapi_store.js';

describe('openapiStore', () => {
	test('it should have initial state', () => {
		const { getInitialState } = openapiStore;

		const { meta: initialMeta } = getInitialState();
		expect(initialMeta).toEqual({});
	});

	test('it should add value to the store', () => {
		const metaToAdd = {
			metaKey: 'newMeta',
			meta: {
				method: 'PUT',
				name: 'register',
			},
		};

		storeOpenApiMeta(metaToAdd.metaKey, metaToAdd.meta);

		const { meta } = openapiStore.getState();

		expect(meta).toEqual({ [metaToAdd.metaKey]: metaToAdd.meta });
	});
});
