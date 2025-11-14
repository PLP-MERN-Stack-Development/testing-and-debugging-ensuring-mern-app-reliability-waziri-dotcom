// Example unit test for small helper or simple validation logic
const { validateBugPayload } = require('../../utils/validators');

test('validateBugPayload returns error when title missing', () => {
  const result = validateBugPayload({ description: 'no title' });
  expect(result.error).toBeDefined();
});
