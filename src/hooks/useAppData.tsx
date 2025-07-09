import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { dataStore } from '../utils/dataStore';
import { CreditScore, CreditCard, BankCard, Debt, DerogatoryMark } from '../types';

interface AppDataContextType {
  creditScores: CreditScore[];
  creditCards: CreditCard[];
  bankCards: BankCard[];
  debts: Debt[];
  derogatoryMarks: DerogatoryMark[];
  
  // Credit Score methods
  addCreditScore: (score: Omit<CreditScore, 'id'>) => CreditScore;
  updateCreditScore: (id: string, updates: Partial<CreditScore>) => CreditScore | null;
  deleteCreditScore: (id: string) => boolean;
  
  // Credit Card methods
  addCreditCard: (card: Omit<CreditCard, 'id'>) => CreditCard;
  updateCreditCard: (id: string, updates: Partial<CreditCard>) => CreditCard | null;
  deleteCreditCard: (id: string) => boolean;
  
  // Bank Card methods
  addBankCard: (card: Omit<BankCard, 'id'>) => BankCard;
  updateBankCard: (id: string, updates: Partial<BankCard>) => BankCard | null;
  deleteBankCard: (id: string) => boolean;
  
  // Debt methods
  addDebt: (debt: Omit<Debt, 'id'>) => Debt;
  updateDebt: (id: string, updates: Partial<Debt>) => Debt | null;
  deleteDebt: (id: string) => boolean;
  
  // Derogatory Mark methods
  addDerogatoryMark: (mark: Omit<DerogatoryMark, 'id'>) => DerogatoryMark;
  updateDerogatoryMark: (id: string, updates: Partial<DerogatoryMark>) => DerogatoryMark | null;
  deleteDerogatoryMark: (id: string) => boolean;
  
  // Utility methods
  getFinancialSummary: () => any;
  exportData: () => any;
  importData: (data: any) => void;
  clearAllData: () => void;
  
  // Loading state
  isLoading: boolean;
  refreshData: () => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
};

interface AppDataProviderProps {
  children: ReactNode;
}

export const AppDataProvider = ({ children }: AppDataProviderProps) => {
  const [creditScores, setCreditScores] = useState<CreditScore[]>([]);
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [bankCards, setBankCards] = useState<BankCard[]>([]);
  const [debts, setDebts] = useState<Debt[]>([]);
  const [derogatoryMarks, setDerogatoryMarks] = useState<DerogatoryMark[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshData = () => {
    setCreditScores(dataStore.getCreditScores());
    setCreditCards(dataStore.getCreditCards());
    setBankCards(dataStore.getBankCards());
    setDebts(dataStore.getDebts());
    setDerogatoryMarks(dataStore.getDerogatoryMarks());
  };

  useEffect(() => {
    refreshData();
    setIsLoading(false);
  }, []);

  const contextValue: AppDataContextType = {
    creditScores,
    creditCards,
    bankCards,
    debts,
    derogatoryMarks,
    isLoading,
    refreshData,
    
    // Credit Score methods
    addCreditScore: (score) => {
      const newScore = dataStore.addCreditScore(score);
      setCreditScores(dataStore.getCreditScores());
      return newScore;
    },
    updateCreditScore: (id, updates) => {
      const updated = dataStore.updateCreditScore(id, updates);
      if (updated) {
        setCreditScores(dataStore.getCreditScores());
      }
      return updated;
    },
    deleteCreditScore: (id) => {
      const deleted = dataStore.deleteCreditScore(id);
      if (deleted) {
        setCreditScores(dataStore.getCreditScores());
      }
      return deleted;
    },
    
    // Credit Card methods
    addCreditCard: (card) => {
      const newCard = dataStore.addCreditCard(card);
      setCreditCards(dataStore.getCreditCards());
      return newCard;
    },
    updateCreditCard: (id, updates) => {
      const updated = dataStore.updateCreditCard(id, updates);
      if (updated) {
        setCreditCards(dataStore.getCreditCards());
      }
      return updated;
    },
    deleteCreditCard: (id) => {
      const deleted = dataStore.deleteCreditCard(id);
      if (deleted) {
        setCreditCards(dataStore.getCreditCards());
      }
      return deleted;
    },
    
    // Bank Card methods
    addBankCard: (card) => {
      const newCard = dataStore.addBankCard(card);
      setBankCards(dataStore.getBankCards());
      return newCard;
    },
    updateBankCard: (id, updates) => {
      const updated = dataStore.updateBankCard(id, updates);
      if (updated) {
        setBankCards(dataStore.getBankCards());
      }
      return updated;
    },
    deleteBankCard: (id) => {
      const deleted = dataStore.deleteBankCard(id);
      if (deleted) {
        setBankCards(dataStore.getBankCards());
      }
      return deleted;
    },
    
    // Debt methods
    addDebt: (debt) => {
      const newDebt = dataStore.addDebt(debt);
      setDebts(dataStore.getDebts());
      return newDebt;
    },
    updateDebt: (id, updates) => {
      const updated = dataStore.updateDebt(id, updates);
      if (updated) {
        setDebts(dataStore.getDebts());
      }
      return updated;
    },
    deleteDebt: (id) => {
      const deleted = dataStore.deleteDebt(id);
      if (deleted) {
        setDebts(dataStore.getDebts());
      }
      return deleted;
    },
    
    // Derogatory Mark methods
    addDerogatoryMark: (mark) => {
      const newMark = dataStore.addDerogatoryMark(mark);
      setDerogatoryMarks(dataStore.getDerogatoryMarks());
      return newMark;
    },
    updateDerogatoryMark: (id, updates) => {
      const updated = dataStore.updateDerogatoryMark(id, updates);
      if (updated) {
        setDerogatoryMarks(dataStore.getDerogatoryMarks());
      }
      return updated;
    },
    deleteDerogatoryMark: (id) => {
      const deleted = dataStore.deleteDerogatoryMark(id);
      if (deleted) {
        setDerogatoryMarks(dataStore.getDerogatoryMarks());
      }
      return deleted;
    },
    
    // Utility methods
    getFinancialSummary: () => dataStore.getFinancialSummary(),
    exportData: () => dataStore.exportData(),
    importData: (data) => {
      dataStore.importData(data);
      refreshData();
    },
    clearAllData: () => {
      dataStore.clearAllData();
      refreshData();
    },
  };

  return (
    <AppDataContext.Provider value={contextValue}>
      {children}
    </AppDataContext.Provider>
  );
};