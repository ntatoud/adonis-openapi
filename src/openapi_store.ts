import { createStore } from 'zustand/vanilla';
import type { OpenApiMeta } from './types/index.js';

type OpenapiStore = {
	meta: Record<string, OpenApiMeta>;
};

export const openapiStore = createStore<OpenapiStore>((set) => ({
	meta: {},
}));

export const addMeta = (metaKey: string, meta: OpenApiMeta) => {
	const { setState } = openapiStore;
	setState((state) => ({
		meta: {
			...state.meta,
			[metaKey]: meta,
		},
	}));
};
