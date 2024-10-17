import type Configure from '@adonisjs/core/commands/configure';

export async function configure(command: Configure) {
	const codemods = await command.createCodemods();

	/**
	 * Register OpenapiServiceProvider to the rcfile
	 */
	await codemods.updateRcFile(
		(rcFile: {
			addProvider: (providerPath: string) => void;
		}) => {
			rcFile.addProvider('adonis-openapi/openapi_provider');
		},
	);
}
