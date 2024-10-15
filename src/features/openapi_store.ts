import { createStore } from 'zustand/vanilla';
import type { OpenApiMeta } from '../types/index.js';

type OpenApiStore = {
	meta: Record<string, OpenApiMeta>;
};

/**
 * This is store where OpenAPI specific metadata will be saved
 */
export const openapiStore = createStore<OpenApiStore>((set) => ({
	meta: {},
}));

export const storeOpenApiMeta = (metaKey: string, meta: OpenApiMeta) => {
	openapiStore.setState((state) => ({
		meta: {
			...state.meta,
			[metaKey]: meta,
		},
	}));
};
