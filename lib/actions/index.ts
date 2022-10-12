import type { ActionDefinition } from '@balena/jellyfish-worker';
import { actionImportBalenaHubFeedback } from './action-import-balena-hub-feedback';

export const actions: ActionDefinition[] = [actionImportBalenaHubFeedback];
