import type { IntegrationDefinition, Map } from '@balena/jellyfish-worker';
import { typeformIntegrationDefinition } from './typeform';

export const integrations: Map<IntegrationDefinition> = {
	typeform: typeformIntegrationDefinition,
};
