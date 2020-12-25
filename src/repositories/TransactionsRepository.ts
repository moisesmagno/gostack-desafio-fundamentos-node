import Transaction from '../models/Transaction';
import CreateTransactionService from '../services/CreateTransactionService';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const transactions = this.transactions;
  
    return transactions;
  
  }

   public getBalance(): Balance {
    
    const balance = this.transactions.reduce((accumulator: Balance, transaction: Transaction) => {
    switch(transaction.type){
        case 'income':
          accumulator.income += parseInt(transaction.value);
          break;
        case 'outcome':
          accumulator.outcome += parseInt(transaction.value);
          break;
        default: 
          break;
    }

      accumulator.total = parseInt(accumulator.income) - parseInt(accumulator.outcome);
      
      return accumulator;       
    
    }, {
      income: 0,
      outcome: 0,
      total: 0
    });
    
    return balance;    
  }

  public create({title, value, type}: CreateTransaction): Transaction {
    const transaction = new Transaction({title, value, type});

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
