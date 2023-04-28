import { Account } from '../../domain/entity/account.entity';
import { AccountRepository } from '../../domain/repository/account.repository';
import { MysqlAccountRepository } from './mysql-account.repository';
describe('MysqlAccountRepository', () => {
  let accountRepository: AccountRepository;
  let account: Account;

  beforeEach(async () => {
    accountRepository = new MysqlAccountRepository();
    account = new Account({
      id: 'test_id',
      client_id: 'test_client',
      balance: 1000,
    });
    await accountRepository.create(account);
  });

  afterAll(async () => {
    await accountRepository.delete(account.id);
  });
  it('should be get account by id', async () => {
    const res = await accountRepository.findById(account.id);
    expect(res).toBeInstanceOf(Account);
    expect(res.id).toBe(account.id);
    expect(res.balance).toBe(1000);
  });

  it('should be update account', async () => {
    account.balance = 2000;
    await accountRepository.update(account);
    const res = await accountRepository.findById(account.id);
    expect(res).toBeInstanceOf(Account);
    expect(res.id).toBe(account.id);
    expect(res.balance).toBe(2000);
  });
});
