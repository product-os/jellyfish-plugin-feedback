import type { ActionDefinition } from '@balena/jellyfish-worker';
import { strict as assert } from 'assert';
import type { TypeContract } from 'autumndb';
import { randomUUID } from 'node:crypto';

interface Feedback {
	rating: number;
	couldDoAsWanted: number;
	details?: string;
	path: string;
}

const handler: ActionDefinition['handler'] = async (
	session,
	context,
	contract,
	request,
) => {
	const feedback = contract.data.payload as Feedback;
	const result = await context.insertCard(
		session,
		context.cards['balena-hub-feedback@1.0.0'] as TypeContract,
		{
			timestamp: request.timestamp,
			attachEvents: false,
		},
		{
			slug: `balena-hub-feedback-${randomUUID()}`,
			data: {
				rating: feedback.rating,
				couldDoAsWanted: feedback.couldDoAsWanted,
				details: feedback.details || '',
				path: feedback.path,
			},
		},
	);
	assert(
		result,
		`Failed to insert balena-hub-feedback contract: ${JSON.stringify(
			feedback,
			null,
			2,
		)}`,
	);

	return {
		id: result.id,
		type: result.type,
		version: result.version,
		slug: result.slug,
	};
};

export const actionImportBalenaHubFeedback: ActionDefinition = {
	handler,
	contract: {
		slug: 'action-import-balena-hub-feedback',
		version: '1.0.0',
		type: 'action@1.0.0',
		data: {
			filter: {
				type: 'object',
				required: ['type', 'data'],
				properties: {
					type: {
						type: 'string',
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
			arguments: {},
		},
	},
};
