import type { PluginDefinition } from '@balena/jellyfish-worker';
import { contracts } from './contracts';
export * from './types';

// tslint:disable-next-line: no-var-requires
const { version } = require('../package.json');

/**
 * The Jellyfish feedback plugin.
 */
export const feedbackPlugin = (): PluginDefinition => {
	return {
		slug: 'plugin-feedback',
		name: 'Feedback Plugin',
		version,
		contracts,
	};
};
