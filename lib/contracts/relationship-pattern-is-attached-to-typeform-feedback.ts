import type { RelationshipContractDefinition } from 'autumndb';

export const relationshipPatternIsAttachedToTypeformFeedback: RelationshipContractDefinition =
	{
		slug: 'relationship-pattern-is-attached-to-typeform-feedback',
		type: 'relationship@1.0.0',
		name: 'is attached to',
		data: {
			inverseName: 'has attached',
			title: 'Typeform feedback',
			inverseTitle: 'Pattern',
			from: {
				type: 'pattern',
			},
			to: {
				type: 'typeform-feedback',
			},
		},
	};
