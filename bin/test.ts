import { assert } from '@japa/assert';
import { fileSystem } from '@japa/file-system';
import { configure, processCLIArgs, run } from '@japa/runner';

/**
 * Base URL for test app. This is ${rootDir}/tmp
 */
export const BASE_URL = new URL('../tmp/', import.meta.url);

/*
|--------------------------------------------------------------------------
| Configure tests
|--------------------------------------------------------------------------
|
| The configure method accepts the configuration to configure the Japa
| tests runner.
|
| The first method call "processCliArgs" process the command line arguments
| and turns them into a config object. Using this method is not mandatory.
|
| Please consult japa.dev/runner-config for the config docs.
*/
processCLIArgs(process.argv.slice(2));
configure({
	files: ['tests/**/*.test.ts'],
	plugins: [assert(), fileSystem()],
});

/*
|--------------------------------------------------------------------------
| Run tests
|--------------------------------------------------------------------------
|
| The following "run" method is required to execute all the tests.
|
*/
run();
