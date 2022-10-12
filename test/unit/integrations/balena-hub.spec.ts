import { isEventValid } from '../../../lib/integrations/balena-hub';

describe('isEventValid()', () => {
	test('returns true for valid partial payloads', () => {
		expect(
			isEventValid(
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
				JSON.stringify({
					foo: 'bar',
				}),
			),
		).toBe(false);
	});
});
