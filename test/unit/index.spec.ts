import { PluginManager } from '@balena/jellyfish-worker';
import { feedbackPlugin } from '../../lib/index';

const pluginManager = new PluginManager([feedbackPlugin()]);

test('Expected contracts are loaded', () => {
	const contracts = pluginManager.getCards();
	expect(Object.keys(contracts).includes('balena-hub-feedback')).toBe(true);
	expect(Object.keys(contracts).includes('typeform-feedback')).toBe(true);
});

test('Expected integrations are loaded', () => {
	const integrations = pluginManager.getSyncIntegrations();
	expect(Object.keys(integrations).includes('balena-hub')).toBe(true);
});
