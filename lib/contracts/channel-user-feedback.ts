import type { ContractDefinition } from 'autumndb';

export const channelUserFeedback: ContractDefinition = {
	slug: 'channel-user-feedback',
	name: 'User Feedback',
	type: 'channel@1.0.0',
	markers: ['org-balena'],
	data: {
		filter: {
			name: 'User feedback contracts',
			schema: {
				type: 'object',
				additionalProperties: true,
				required: ['type'],
				properties: {
					type: {
						type: 'string',
						enum: ['user-feedback@1.0.0', 'typeform-feedback@1.0.0'],
					},
				},
			},
		},
	},
};
