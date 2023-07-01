// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(100);
    expect(bankAccount.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(100);
    const error = new InsufficientFundsError(100);
    expect(() => bankAccount.withdraw(105)).toThrowError(error);
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount1 = getBankAccount(100);
    const bankAccount2 = getBankAccount(0);
    const error = new InsufficientFundsError(100);
    expect(() => bankAccount1.transfer(105, bankAccount2)).toThrowError(error);
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(100);
    const error = new TransferFailedError();
    expect(() => bankAccount.transfer(100, bankAccount)).toThrowError(error);
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(0);
    bankAccount.deposit(100);
    expect(bankAccount.getBalance()).toBe(100);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(150);
    bankAccount.withdraw(100);
    expect(bankAccount.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    const bankAccount1 = getBankAccount(100);
    const bankAccount2 = getBankAccount(0);
    bankAccount1.transfer(100, bankAccount2);
    expect(bankAccount2.getBalance()).toBe(100);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(100);
    const balance = await bankAccount.fetchBalance();
    if (balance !== null) {
      expect(typeof balance).toBe('number');
    } else {
      expect(balance).toBeNull();
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(150);
    bankAccount.fetchBalance = async () => 100;
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(100);
    const error = new SynchronizationFailedError();
    bankAccount.fetchBalance = async () => null;
    expect(
      async () => await bankAccount.synchronizeBalance(),
    ).rejects.toThrowError(error);
  });
});
