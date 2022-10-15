import type { IntegrationDefinition, Map } from '@balena/jellyfish-worker';
import { balenaHubIntegrationDefinition } from './balena-hub';

export const integrations: Map<IntegrationDefinition> = {
	'balena-hub': balenaHubIntegrationDefinition,
};
