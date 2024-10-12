import { createStore } from 'zustand/vanilla';

type OpenApiMeta = {
	name: string;
	method: string;
};
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
