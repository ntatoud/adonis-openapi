import { fileURLToPath } from 'node:url';
import Configure from '@adonisjs/core/commands/configure';
import { test } from '@japa/runner';
import { BASE_URL } from '../bin/test.js';
import { createApp } from './test-utils/app.js';

test.group('Configure', (group) => {
	group.each.setup(({ context }) => {
		context.fs.baseUrl = BASE_URL;
		context.fs.basePath = fileURLToPath(BASE_URL);
	});
	test('Registers provider', async ({ fs, assert }) => {
		const app = await createApp();

		await fs.create('.env', '');
		await fs.createJson('tsconfig.json', {});
		await fs.create('start/env.ts', `export default Env.create(new URL('./'), {})`);
		await fs.create('adonisrc.ts', 'export default defineConfig({})');

		const ace = await app.container.make('ace');

		// Path to the file that exports the configure hook. Is relative to BASE_URL
		const command = await ace.create(Configure, ['../src/index.js']);

		await command.exec();

		await assert.fileExists('adonisrc.ts');
		await assert.fileContains('adonisrc.ts', 'adonis-openapi/openapi_provider');
	}).disableTimeout();
});
