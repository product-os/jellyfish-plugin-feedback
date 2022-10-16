import type { ContractDefinition } from 'autumndb';

export const channelBalenaHubFeedback: ContractDefinition = {
	slug: 'channel-balena-hub-feedback',
	name: 'balenaHub Feedback',
	type: 'channel@1.0.0',
	markers: ['org-balena'],
	data: {
		filter: {
			name: 'balenaHub feedback contracts',
			schema: {
				type: 'object',
				additionalProperties: true,
				required: ['type'],
				properties: {
					type: {
						type: 'string',
						const: 'balena-hub-feedback@1.0.0',
					},
				},
			},
		},
	},
};
