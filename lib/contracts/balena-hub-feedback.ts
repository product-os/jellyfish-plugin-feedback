import type { ContractDefinition } from 'autumndb';

export const balenaHubFeedback: ContractDefinition = {
	slug: 'balena-hub-feedback',
	name: 'Balena Hub Feedback',
	type: 'type@1.0.0',
	markers: [],
	data: {
		schema: {
			type: 'object',
			properties: {
				data: {
					type: 'object',
					properties: {
						details: {
							type: 'string',
							format: 'markdown',
						},
					},
				},
			},
		},
		uiSchema: {
			fields: {
				data: {
					details: {
						'ui:widget': 'Markdown',
					},
				},
			},
		},
	},
};
