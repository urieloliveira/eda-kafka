import { AccountRepository } from '../../domain/repository/account.repository';
import { UpdateAccountUseCase } from './update-account.use-case';
import { Account } from '../../domain/entity/account.entity';

describe('UpdateAccountUseCase', () => {
  let mockAccountRepository: AccountRepository;
  let useCase: UpdateAccountUseCase;
  let mockAccount: Account;
  beforeEach(() => {
    mockAccount = new Account({ id: 'get_account_id', balance: 1000 });
    mockAccountRepository = {
      findById: jest.fn().mockResolvedValue(mockAccount),
      create: jest.fn(),
      update: jest.fn((input) => {
        mockAccount.balance = input.balance;
        return Promise.resolve();
      }),
      delete: jest.fn(),
    };
    useCase = new UpdateAccountUseCase(mockAccountRepository);
  });
  it('should return an account', async () => {
    await useCase.execute([{ id: mockAccount.id, balance: 200 }]);
    const account = await mockAccountRepository.findById(mockAccount.id);
    expect(account.id).toBe(mockAccount.id);
    expect(account.balance).toBe(200);
  });
});
