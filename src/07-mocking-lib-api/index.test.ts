import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';
    const axiosClient = axios.create({
      baseURL,
    });
    const mockedCreate = jest
      .spyOn(axios, 'create')
      .mockReturnValueOnce(axiosClient);
    await throttledGetDataFromApi('/posts');
    expect(mockedCreate).toHaveBeenCalledWith({
      baseURL,
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockedGet = jest.spyOn(axios.Axios.prototype, 'get');
    await throttledGetDataFromApi('/users');
    jest.runAllTimers();
    expect(mockedGet).toBeCalled();
  });

  test('should return response data', async () => {
    const expectedData = { id: 1, title: 'Test Data' };
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementationOnce(() => Promise.resolve({ data: expectedData }));
    const data = await throttledGetDataFromApi('/users');
    jest.runAllTimers();
    expect(expectedData).toBe(data);
  });
});
