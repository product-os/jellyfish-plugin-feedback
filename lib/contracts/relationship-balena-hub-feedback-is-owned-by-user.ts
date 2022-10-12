import type { RelationshipContractDefinition } from 'autumndb';

export const relationshipBalenaHubFeedbackIsOwnedByUser: RelationshipContractDefinition =
	{
		slug: 'relationship-balena-hub-feedback-is-owned-by-user',
		type: 'relationship@1.0.0',
		name: 'is owned by',
		data: {
			inverseName: 'owns',
			title: 'Owner',
			inverseTitle: 'Owned Balena Hub feedback',
			from: {
				type: 'balena-hub-feedback',
			},
			to: {
				type: 'user',
			},
		},
	};
