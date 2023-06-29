// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 6, b: 0, action: 'invalid action', expected: null },
  { a: 6, b: 'invalid arguments', action: Action.Divide, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('should blah-blah', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
