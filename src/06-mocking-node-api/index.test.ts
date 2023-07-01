import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fsPomises from 'fs/promises';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, timeout);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, timeout);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByInterval(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    const testPath = 'test.txt';
    await readFileAsynchronously(testPath);
    expect(joinSpy).toHaveBeenCalledWith(__dirname, testPath);
    joinSpy.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    const testPath = 'test.txt';
    const fileContent = await readFileAsynchronously(testPath);
    expect(fileContent).toBeNull();
    joinSpy.mockRestore();
  });

  test('should return file content if file exists', async () => {
    const expectedText = 'Hello, World!';
    const filePath = 'test.txt';
    const readFileMock = jest
      .spyOn(fsPomises, 'readFile')
      .mockResolvedValue(Buffer.from(expectedText));
    const existsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const result = await readFileAsynchronously(filePath);
    expect(result).toBe(expectedText);
    readFileMock.mockRestore();
    existsSyncMock.mockRestore();
  });
});
