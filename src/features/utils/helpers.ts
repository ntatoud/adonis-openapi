import type { StoreRouteHandler } from '@adonisjs/http-server/types';

export function getRouteHandlerName(handler: StoreRouteHandler) {
	if (typeof handler === 'function') {
		return;
	}

	const { reference } = handler;
	if (typeof reference === 'string') {
		return reference;
	}

	const handlerController = reference[0];
	const handlerMethod = reference[1] ?? '';
	return `${handlerController.name}.${handlerMethod}`;
}
