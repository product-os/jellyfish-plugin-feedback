import type { ContractDefinition } from 'autumndb';

export const triggeredActionImportBalenaHubFeedback: ContractDefinition = {
	slug: 'triggered-action-import-balena-hub-feedback',
	type: 'triggered-action@1.0.0',
	name: 'Triggered action for importing Balena Hub feedback',
	markers: [],
	data: {
		filter: {
			type: 'object',
			required: ['type', 'data'],
			properties: {
				type: {
					const: 'external-event@1.0.0',
				},
				data: {
					type: 'object',
					required: ['source'],
					properties: {
						source: {
							const: 'balena-hub',
						},
					},
				},
			},
		},
		action: 'action-import-balena-hub-feedback@1.0.0',
		target: {
			$eval: 'source.id',
		},
		arguments: {},
	},
};
