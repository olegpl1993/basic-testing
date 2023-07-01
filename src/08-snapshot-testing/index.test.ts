import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const values = [1, 1, 1];
    const expectedLinkedList = {
      value: 1,
      next: {
        value: 1,
        next: {
          value: 1,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };
    const result = generateLinkedList(values);
    expect(result).toStrictEqual(expectedLinkedList);
  });

  test('should generate linked list from values 2', () => {
    const values = [2, 2, 2];
    const result = generateLinkedList(values);
    expect(result).toMatchInlineSnapshot(`
      {
        "next": {
          "next": {
            "next": {
              "next": null,
              "value": null,
            },
            "value": 2,
          },
          "value": 2,
        },
        "value": 2,
      }
    `);
  });
});
