import type { ContractDefinition } from 'autumndb';
import { channelUserFeedback } from './channel-user-feedback';
import { relationshipPatternIsAttachedToTypeformFeedback } from './relationship-pattern-is-attached-to-typeform-feedback';
import { relationshipTypeformFeedbackIsOwnedByUser } from './relationship-typeform-feedback-is-owned-by-user';
import { typeformFeedback } from './typeform-feedback';

export const contracts: ContractDefinition[] = [
	channelUserFeedback,
	relationshipPatternIsAttachedToTypeformFeedback,
	relationshipTypeformFeedbackIsOwnedByUser,
	typeformFeedback,
];
