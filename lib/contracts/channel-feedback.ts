import type { ContractDefinition } from 'autumndb';

export const channelFeedback: ContractDefinition = {
	slug: 'channel-feedback',
	name: 'Feedback',
	type: 'channel@1.0.0',
	markers: ['org-balena'],
	data: {
		filter: {
			name: 'Feedback contracts',
			schema: {
				type: 'object',
				additionalProperties: true,
				required: ['type'],
				properties: {
					type: {
						type: 'string',
						enum: ['balena-hub-feedback@1.0.0', 'typeform-feedback@1.0.0'],
					},
				},
			},
		},
	},
};
