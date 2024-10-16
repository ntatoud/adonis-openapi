import { type StoreApi, createStore } from 'zustand/vanilla';
import type { OpenApiMeta } from '../types/index.js';

type OpenApiStoreMeta = {
	meta: Record<string, OpenApiMeta>;
};
/**
 * This is the store where OpenAPI specific metadata will be saved
 */
export default class OpenApiStore {
	private store: StoreApi<OpenApiStoreMeta>;

	constructor() {
		this.store = createStore((set) => ({
			meta: {},
		}));
	}

	public storeMetadata(metaKey: string, meta: OpenApiMeta): void {
		this.store.setState((state) => ({
			meta: {
				...state.meta,
				[metaKey]: meta,
			},
		}));
	}

	public getMetadata() {
		return this.store.getState().meta;
	}
}
