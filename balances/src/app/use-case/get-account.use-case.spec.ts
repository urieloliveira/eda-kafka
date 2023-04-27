import { AccountRepository } from '../../domain/repository/account.repository';
import { GetAccountUseCase } from './get-account.use-case';
import { Account } from '../../domain/entity/account.entity';

describe('GetAccountUseCase', () => {
  let mockAccountRepository: AccountRepository;
  let useCase: GetAccountUseCase;
  let mockAccount: Account;
  beforeEach(() => {
    mockAccount = new Account({ id: 'get_account_id', balance: 1000 });
    mockAccountRepository = {
      findById: jest.fn().mockResolvedValue(mockAccount),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    useCase = new GetAccountUseCase(mockAccountRepository);
  });
  it('should return an account', async () => {
    const account = await useCase.execute({ id: mockAccount.id });
    expect(account.id).toBe(mockAccount.id);
    expect(account.balance).toBe(1000);
  });
});
