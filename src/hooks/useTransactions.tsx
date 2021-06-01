import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
}

interface TransactionsProviderProps {
  children?: ReactNode;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction(transaction: TransactionInput): Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData,
);

export const TransactionsProvider: React.FC = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>(
    [] as Transaction[],
  );
  useEffect(() => {
    api
      .get('transactions')
      .then(response => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction({
    type,
    title,
    amount,
    category,
  }: TransactionInput) {
    const data = {
      title,
      amount: Number(amount),
      category,
      type,
    };

    const response = await api.post('/transactions', {
      ...data,
      createdAt: new Date(),
    });
    const { transaction } = response.data;
    setTransactions(oldValue => [...oldValue, transaction]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export function useTransactions(): TransactionsContextData {
  const context = useContext(TransactionsContext);

  return context;
}
