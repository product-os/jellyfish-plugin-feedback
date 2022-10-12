import type { ContractDefinition } from 'autumndb';
import { channelFeedback } from './channel-feedback';
import { balenaHubFeedback } from './balena-hub-feedback';
import { relationshipBalenaHubFeedbackIsOwnedByUser } from './relationship-balena-hub-feedback-is-owned-by-user';
import { relationshipPatternIsAttachedToBalenaHubFeedback } from './relationship-pattern-is-attached-to-balena-hub-feedback';
import { relationshipPatternIsAttachedToTypeformFeedback } from './relationship-pattern-is-attached-to-typeform-feedback';
import { relationshipTypeformFeedbackIsOwnedByUser } from './relationship-typeform-feedback-is-owned-by-user';
import { triggeredActionImportBalenaHubFeedback } from './triggered-action-import-balena-hub-feedback';
import { typeformFeedback } from './typeform-feedback';

export const contracts: ContractDefinition[] = [
	balenaHubFeedback,
	channelFeedback,
	relationshipBalenaHubFeedbackIsOwnedByUser,
	relationshipPatternIsAttachedToBalenaHubFeedback,
	relationshipPatternIsAttachedToTypeformFeedback,
	relationshipTypeformFeedbackIsOwnedByUser,
	triggeredActionImportBalenaHubFeedback,
	typeformFeedback,
];
