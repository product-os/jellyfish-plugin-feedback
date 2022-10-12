import { contractMixins } from '@balena/jellyfish-worker';
import type { ContractDefinition } from 'autumndb';

const slug = 'typeform-feedback';
const type = 'type@1.0.0';

export const typeformFeedback: ContractDefinition = contractMixins.mixin(
	contractMixins.withEvents(slug, type),
	contractMixins.asPipelineItem(slug, type),
)({
	slug,
	name: 'Typeform Feedback',
	type,
	markers: [],
	data: {
		schema: {
			type: 'object',
			required: ['data'],
			properties: {
				name: {
					type: 'string',
				},
				data: {
					type: 'object',
					properties: {
						email: {
							type: ['string', 'null'],
							fullTextSearch: true,
						},
						user: {
							title: 'Username',
							type: ['string', 'null'],
							fullTextSearch: true,
						},
						howDidYouFirstHearAboutBalenaCloud: {
							title: 'How did you first hear about balenaCloud?',
							type: 'string',
							fullTextSearch: true,
						},
						howWouldYouDescribeYourRole: {
							title: 'How would you describe your role?',
							type: 'string',
							fullTextSearch: true,
						},
						couldYouBrieflyDescribeYourUsecase: {
							title: 'Could you briefly describe your use case?',
							type: 'string',
							fullTextSearch: true,
						},
						howHasYourExperienceBeenSoFar: {
							title:
								'How has your experience been so far? What can we improve? We count on your honest feedback to make balenaCloud better.',
							type: 'string',
							fullTextSearch: true,
						},
						howLikelyAreYouToRecommendBalenaCloud: {
							title:
								'How likely are you to recommend balenaCloud to a friend or co-worker?',
							type: 'number',
						},
						curatedOrigin: {
							title: 'Curated Origin',
							type: 'array',
							items: {
								type: 'string',
							},
							fullTextSearch: true,
						},
						originDetail: {
							title: 'Curated Origin Detail',
							type: 'array',
							items: {
								type: 'string',
							},
							fullTextSearch: true,
						},
						role: {
							title: 'Curated Role',
							type: 'array',
							items: {
								type: 'string',
							},
							fullTextSearch: true,
						},
						useCaseSegment: {
							title: 'Curated Use Case Segment',
							type: 'array',
							items: {
								type: 'string',
							},
							fullTextSearch: true,
						},
						useCaseDetail: {
							title: 'Curated Use Case Detail',
							type: 'array',
							items: {
								type: 'string',
							},
							fullTextSearch: true,
						},
						experienceEvaluation: {
							title: 'Curated Experierience Evaluation',
							type: 'string',
							fullTextSearch: true,
							enum: [
								'Very Positive',
								'Somewhat Positive',
								'Neutral',
								'Somewhat Negative',
								'Very Negative',
							],
						},
						issuesWants: {
							title: 'Curated Issues/Wants',
							type: 'array',
							items: {
								type: 'string',
							},
							fullTextSearch: true,
						},
						highlights: {
							title: 'Curated Highlights',
							type: 'array',
							items: {
								type: 'string',
							},
							fullTextSearch: true,
						},
					},
				},
			},
		},
		uiSchema: {
			fields: {
				data: {
					'ui:order': [
						'status',
						'user',
						'howDidYouFirstHearAboutBalenaCloud',
						'howWouldYouDescribeYourRole',
						'couldYouBrieflyDescribeYourUsecase',
						'howHasYourExperienceBeenSoFar',
						'howLikelyAreYouToRecommendBalenaCloud',
						'curatedOrigin',
						'originDetail',
						'role',
						'useCaseSegment',
						'useCaseDetail',
						'experienceEvaluation',
						'issuesWants',
						'highlights',
						'*',
					],
				},
			},
			edit: {
				$ref: '#/data/uiSchema/definitions/form',
			},
			create: {
				$ref: '#/data/uiSchema/edit',
			},
			definitions: {
				form: {
					data: {
						'ui:order': [
							'status',
							'howDidYouFirstHearAboutBalenaCloud',
							'howWouldYouDescribeYourRole',
							'couldYouBrieflyDescribeYourUsecase',
							'howHasYourExperienceBeenSoFar',
							'howLikelyAreYouToRecommendBalenaCloud',
							'curatedOrigin',
							'originDetail',
							'role',
							'useCaseSegment',
							'useCaseDetail',
							'experienceEvaluation',
							'issuesWants',
							'highlights',
							'*',
						],
						curatedOrigin: {
							items: {
								'ui:widget': 'AutoCompleteWidget',
								'ui:options': {
									resource: 'typeform-feedback',
									keyPath: 'data.curatedOrigin',
								},
							},
						},
						originDetail: {
							items: {
								'ui:widget': 'AutoCompleteWidget',
								'ui:options': {
									resource: 'typeform-feedback',
									keyPath: 'data.originDetail',
								},
							},
						},
						role: {
							items: {
								'ui:widget': 'AutoCompleteWidget',
								'ui:options': {
									resource: 'typeform-feedback',
									keyPath: 'data.role',
								},
							},
						},
						useCaseSegment: {
							items: {
								'ui:widget': 'AutoCompleteWidget',
								'ui:options': {
									resource: 'typeform-feedback',
									keyPath: 'data.useCaseSegment',
								},
							},
						},
						useCaseDetail: {
							items: {
								'ui:widget': 'AutoCompleteWidget',
								'ui:options': {
									resource: 'typeform-feedback',
									keyPath: 'data.useCaseDetail',
								},
							},
						},
						issuesWants: {
							items: {
								'ui:widget': 'AutoCompleteWidget',
								'ui:options': {
									resource: 'typeform-feedback',
									keyPath: 'data.issuesWants',
								},
							},
						},
						highlights: {
							items: {
								'ui:widget': 'AutoCompleteWidget',
								'ui:options': {
									resource: 'typeform-feedback',
									keyPath: 'data.highlights',
								},
							},
						},
					},
				},
			},
		},
	},
});
