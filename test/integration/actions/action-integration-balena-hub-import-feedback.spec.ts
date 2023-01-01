import { testUtils } from '@balena/jellyfish-worker';
import { testUtils as aTestUtils } from 'autumndb';
import nock from 'nock';
import { randomUUID } from 'node:crypto';
import { feedbackPlugin } from '../../../lib';

let ctx: testUtils.TestContext;

beforeAll(async () => {
	ctx = await testUtils.newContext({
		plugins: [feedbackPlugin()],
	});
});

afterEach(() => {
	nock.cleanAll();
});

afterAll(async () => {
	await testUtils.destroyContext(ctx);
});

describe('balena-hub feedback webhooks', () => {
	test('should create contract on valid full payload', async () => {
		const rating = 1;
		const couldDoAsWanted = 1;
		const details = aTestUtils.generateRandomId();
		const path = aTestUtils.generateRandomId();

		await ctx.worker.insertCard(
			ctx.logContext,
			ctx.session,
			ctx.worker.typeContracts['external-event@1.0.0'],
			{
				timestamp: new Date().toISOString(),
				actor: ctx.adminUserId,
				attachEvents: false,
				reason: null,
			},
			{
				slug: `external-event-${randomUUID()}`,
				data: {
					source: 'balena-hub',
					headers: {},
					payload: {
						rating,
						couldDoAsWanted,
						details,
						path,
					},
				},
			},
		);
		await ctx.flushAll(ctx.session);

		// Assert the balena-hub contract was created
		await ctx.waitForMatch({
			type: 'object',
			required: ['type', 'data'],
			properties: {
				type: {
					const: 'balena-hub-feedback@1.0.0',
				},
				data: {
					type: 'object',
					required: ['rating', 'couldDoAsWanted', 'details', 'path'],
					properties: {
						rating: {
							const: rating,
						},
						couldDoAsWanted: {
							const: couldDoAsWanted,
						},
						details: {
							const: details,
						},
						path: {
							const: path,
						},
					},
				},
			},
		});
	});

	test('should create contract on valid partial payload', async () => {
		const rating = 1;
		const couldDoAsWanted = 1;
		const path = aTestUtils.generateRandomId();

		await ctx.worker.insertCard(
			ctx.logContext,
			ctx.session,
			ctx.worker.typeContracts['external-event@1.0.0'],
			{
				timestamp: new Date().toISOString(),
				actor: ctx.adminUserId,
				attachEvents: false,
				reason: null,
			},
			{
				slug: `external-event-${randomUUID()}`,
				data: {
					source: 'balena-hub',
					headers: {},
					payload: {
						rating,
						couldDoAsWanted,
						path,
					},
				},
			},
		);
		await ctx.flushAll(ctx.session);

		// Assert the balena-hub contract was created
		await ctx.waitForMatch({
			type: 'object',
			required: ['type', 'data'],
			properties: {
				type: {
					const: 'balena-hub-feedback@1.0.0',
				},
				data: {
					type: 'object',
					required: ['rating', 'couldDoAsWanted', 'details', 'path'],
					properties: {
						rating: {
							const: rating,
						},
						couldDoAsWanted: {
							const: couldDoAsWanted,
						},
						path: {
							const: path,
						},
					},
				},
			},
		});
	});
});
