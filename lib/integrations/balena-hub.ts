import { getLogger, LogContext } from '@balena/jellyfish-logger';
import type {
	Integration,
	IntegrationDefinition,
	SequenceItem,
} from '@balena/jellyfish-worker';
import * as skhema from 'skhema';

const SLUG = 'balena-hub';
const logger = getLogger(__filename);

export function isEventValid(
	logContext: LogContext,
	rawEvent: string,
): boolean {
	if (
		skhema.isValid(
			{
				type: 'object',
				required: ['rating', 'couldDoAsWanted', 'path'],
				properties: {
					rating: {
						type: 'number',
					},
					couldDoAsWanted: {
						type: 'number',
					},
					details: {
						type: 'string',
					},
					path: {
						type: 'string',
					},
				},
			},
			JSON.parse(rawEvent),
		)
	) {
		return true;
	}

	logger.info(logContext, 'Invalid balenaHub feedback payload', {
		rawEvent,
	});
	return false;
}

export class BalenaHubIntegration implements Integration {
	public slug = SLUG;

	// TS-TODO: Use proper types
	public context: any;
	public options: any;

	// TS-TODO: Use proper types
	constructor(options: any) {
		this.options = options;
		this.context = this.options.context;
	}

	public async destroy() {
		return Promise.resolve();
	}

	public async mirror(): Promise<SequenceItem[]> {
		return [];
	}

	public async translate(): Promise<SequenceItem[]> {
		return [];
	}
}

export const balenaHubIntegrationDefinition: IntegrationDefinition = {
	slug: SLUG,
	initialize: async (options) => new BalenaHubIntegration(options),
	isEventValid: (logContext, _token, rawEvent, _headers): boolean => {
		return isEventValid(logContext, rawEvent);
	},
};
