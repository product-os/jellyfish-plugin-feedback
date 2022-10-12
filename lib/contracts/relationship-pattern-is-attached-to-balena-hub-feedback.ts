import type { RelationshipContractDefinition } from 'autumndb';

export const relationshipPatternIsAttachedToBalenaHubFeedback: RelationshipContractDefinition =
	{
		slug: 'relationship-pattern-is-attached-to-balena-hub-feedback',
		type: 'relationship@1.0.0',
		name: 'is attached to',
		data: {
			inverseName: 'has attached',
			title: 'Balena Hub feedback',
			inverseTitle: 'Pattern',
			from: {
				type: 'pattern',
			},
			to: {
				type: 'balena-hub-feedback',
			},
		},
	};
