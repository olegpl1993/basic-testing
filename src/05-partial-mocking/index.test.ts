import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

afterAll(() => {
  jest.unmock('./index');
});

describe('partial mocking', () => {
  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(consoleLogSpy).not.toHaveBeenCalled();
    consoleLogSpy.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(consoleLogSpy).toHaveBeenCalled();
    consoleLogSpy.mockRestore();
  });
});
