import type {
	Integration,
	IntegrationDefinition,
	IntegrationInitializationOptions,
	SequenceItem,
} from '@balena/jellyfish-worker';
import type { Contract, ContractData } from 'autumndb';
import * as crypto from 'crypto';
import * as _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const SLUG = 'typeform';

export class TypeformIntegration implements Integration {
	public slug = SLUG;

	public context: IntegrationInitializationOptions['context'];
	public options: IntegrationInitializationOptions;

	constructor(options: IntegrationInitializationOptions) {
		this.options = options;
		this.context = this.options.context;
	}

	public async destroy() {
		return Promise.resolve();
	}

	public async mirror(_contract: Contract, _options: { actor: string }) {
		return [];
	}

	public async translate(
		event: Contract,
		_options: { actor: string },
	): Promise<SequenceItem[]> {
		if (!this.options.token || !this.options.token.signature) {
			return [];
		}
		const adminActorId = await this.context.getActorId({
			handle: this.options.defaultUser,
		});
		const formResponse = (event.data.payload as any).form_response;
		const username = /\s/.test(formResponse.hidden.user)
			? null
			: formResponse.hidden.user;

		const email = /\s/.test(formResponse.hidden.email)
			? formResponse.hidden.email
			: (formResponse.answers.find((el) => el.type === 'email') || {}).email ||
			  null;

		const cardSlug =
			`typeform-feedback-${formResponse.form_id}-${formResponse.token}`.toLowerCase();

		const timestamp = new Date(formResponse.submitted_at).toISOString();

		const surveyData = await formResponseToContractData(
			username,
			email,
			timestamp,
			formResponse,
		);

		const contactContract = await this.context.getContactByEmail(email);

		const surveyContractId = uuidv4();
		const surveyContractType = 'typeform-feedback@1.0.0';

		const results = [
			{
				time: new Date(timestamp),
				actor: adminActorId,
				card: {
					id: surveyContractId,
					name: `Feedback from ${username || 'unknown user'}`,
					type: surveyContractType,
					slug: cardSlug,
					active: true,
					tags: [],
					requires: [],
					capabilities: [],
					data: surveyData,
				},
			},
		];

		if (contactContract) {
			results.push({
				time: new Date(timestamp),
				actor: adminActorId,
				card: {
					id: uuidv4(),
					name: 'is attached to',
					type: 'link@1.0.0',
					slug: `link-${cardSlug}-is-attached-to-${contactContract.slug}`,
					active: true,
					tags: [],
					requires: [],
					capabilities: [],
					data: {
						inverseName: 'has attached element',
						from: {
							id: surveyContractId,
							type: surveyContractType,
						},
						to: {
							id: contactContract.id,
							type: contactContract.type,
						},
					},
				},
			});
		}
		return results;
	}
}

export const typeformIntegrationDefinition: IntegrationDefinition = {
	slug: SLUG,

	initialize: async (options) => new TypeformIntegration(options),
	isEventValid: (_logContext, token, rawEvent, headers) => {
		const signature = headers['typeform-signature'];
		if (!signature || !token || !token.signature) {
			return false;
		}

		const hash = crypto
			.createHmac('sha256', token.signature)
			.update(rawEvent)
			.digest('base64');
		return signature === `sha256=${hash}`;
	},
};

const formResponseToContractData = async (
	username: string,
	email: string | null,
	timestamp: string,
	formResponse: any,
): Promise<ContractData> => {
	const formId = formResponse.form_id;
	const responseId = formResponse.token;
	const formResponseMirrorId = `https://api.typeform.com/forms/${formId}/responses?included_response_ids=${responseId}`;

	const questionsToProps = {
		'How did you first hear about balenaCloud?':
			'howDidYouFirstHearAboutBalenaCloud',
		'How would you describe your role?': 'howWouldYouDescribeYourRole',
		'Could you briefly describe your use case?':
			'couldYouBrieflyDescribeYourUsecase',
		'How has your experience been so far? What can we improve? We count on your honest feedback to make balenaCloud better.':
			'howHasYourExperienceBeenSoFar',
		'How likely are you to recommend balenaCloud to a friend or co-worker?':
			'howLikelyAreYouToRecommendBalenaCloud',
	};

	return _.chain(_.zip(formResponse.definition.fields, formResponse.answers))
		.map((pair: any[]) => {
			if (!Object.keys(questionsToProps).includes(pair[0].title)) {
				// The only questions we currently support are the ones in questionsToProps keys.
				// Any other question is ommited
				return [];
			}
			for (const [title, props] of Object.entries(questionsToProps)) {
				if (title === pair[0].title) {
					return [props, pair[1][pair[1].type]];
				}
			}
			return [];
		})
		.filter((item) => {
			return _.size(item) > 0;
		})
		.fromPairs()
		.assign({
			mirrors: [formResponseMirrorId],
			user: username,
			status: 'open',
			timestamp,
			email,
		})
		.value();
};
