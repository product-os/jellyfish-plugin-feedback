import type { ContractDefinition } from 'autumndb';
import { relationshipPatternIsAttachedToTypeformFeedback } from './relationship-pattern-is-attached-to-typeform-feedback';
import { relationshipTypeformFeedbackIsOwnedByUser } from './relationship-typeform-feedback-is-owned-by-user';
import { typeformFeedback } from './typeform-feedback';

export const contracts: ContractDefinition[] = [
	relationshipPatternIsAttachedToTypeformFeedback,
	relationshipTypeformFeedbackIsOwnedByUser,
	typeformFeedback,
];
