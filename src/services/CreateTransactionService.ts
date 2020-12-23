import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestCreate {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestCreate): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw Error('The operation type is wrong!');
    }

    const transation = this.transactionsRepository.create({
      title,
      value,
      type
    });

    return transation;
  }
}

export default CreateTransactionService;
