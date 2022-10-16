import type { LogContext } from '@balena/jellyfish-logger';
import { isEventValid } from '../../../lib/integrations/balena-hub';

const logContext: LogContext = {
	id: 'balena-hub',
};

describe('isEventValid()', () => {
	test('returns true for valid partial payloads', () => {
		expect(
			isEventValid(
				logContext,
				JSON.stringify({
					rating: 1,
					couldDoAsWanted: 1,
					path: '/foo/bar',
				}),
			),
		).toBe(true);
	});

	test('returns true for valid full payloads', () => {
		expect(
			isEventValid(
				logContext,
				JSON.stringify({
					rating: 1,
					couldDoAsWanted: 1,
					details: 'foobar',
					path: '/foo/bar',
				}),
			),
		).toBe(true);
	});

	test('returns false for invalid payloads', () => {
		expect(
			isEventValid(
				logContext,
				JSON.stringify({
					rating: 'foobar',
					couldDoAsWanted: 1,
					details: 'foobar',
					path: '/foo/bar',
				}),
			),
		).toBe(false);

		expect(
			isEventValid(
				logContext,
				JSON.stringify({
					foo: 'bar',
				}),
			),
		).toBe(false);
	});
});
