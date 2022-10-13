import type { RelationshipContractDefinition } from 'autumndb';

export const relationshipTypeformFeedbackIsOwnedByUser: RelationshipContractDefinition =
	{
		slug: 'relationship-typeform-feedback-is-owned-by-user',
		type: 'relationship@1.0.0',
		name: 'is owned by',
		data: {
			inverseName: 'owns',
			title: 'Owner',
			inverseTitle: 'Owned typeform feedback',
			from: {
				type: 'typeform-feedback',
			},
			to: {
				type: 'user',
			},
		},
	};
