import { AppData, CreditScore, CreditCard, BankCard, Debt, DerogatoryMark, PaymentReminder } from '../types';

const STORAGE_KEY = 'moneytracker-data';

const defaultData: AppData = {
  creditScores: [],
  creditCards: [],
  bankCards: [],
  debts: [],
  derogatoryMarks: [],
  paymentReminders: [],
  lastUpdated: new Date().toISOString(),
};

export class DataStore {
  private data: AppData;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): AppData {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load data from localStorage:', error);
    }
    return { ...defaultData };
  }

  private saveData(): void {
    try {
      this.data.lastUpdated = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (error) {
      console.error('Failed to save data to localStorage:', error);
    }
  }

  // Credit Scores
  getCreditScores(): CreditScore[] {
    return this.data.creditScores;
  }

  addCreditScore(score: Omit<CreditScore, 'id'>): CreditScore {
    const newScore: CreditScore = {
      ...score,
      id: Date.now().toString(),
    };
    this.data.creditScores.push(newScore);
    this.saveData();
    return newScore;
  }

  updateCreditScore(id: string, updates: Partial<CreditScore>): CreditScore | null {
    const index = this.data.creditScores.findIndex(s => s.id === id);
    if (index !== -1) {
      this.data.creditScores[index] = { ...this.data.creditScores[index], ...updates };
      this.saveData();
      return this.data.creditScores[index];
    }
    return null;
  }

  deleteCreditScore(id: string): boolean {
    const index = this.data.creditScores.findIndex(s => s.id === id);
    if (index !== -1) {
      this.data.creditScores.splice(index, 1);
      this.saveData();
      return true;
    }
    return false;
  }

  // Credit Cards
  getCreditCards(): CreditCard[] {
    return this.data.creditCards;
  }

  addCreditCard(card: Omit<CreditCard, 'id'>): CreditCard {
    const newCard: CreditCard = {
      ...card,
      id: Date.now().toString(),
    };
    this.data.creditCards.push(newCard);
    this.saveData();
    return newCard;
  }

  updateCreditCard(id: string, updates: Partial<CreditCard>): CreditCard | null {
    const index = this.data.creditCards.findIndex(c => c.id === id);
    if (index !== -1) {
      this.data.creditCards[index] = { ...this.data.creditCards[index], ...updates };
      this.saveData();
      return this.data.creditCards[index];
    }
    return null;
  }

  deleteCreditCard(id: string): boolean {
    const index = this.data.creditCards.findIndex(c => c.id === id);
    if (index !== -1) {
      this.data.creditCards.splice(index, 1);
      this.saveData();
      return true;
    }
    return false;
  }

  // Bank Cards
  getBankCards(): BankCard[] {
    return this.data.bankCards;
  }

  addBankCard(card: Omit<BankCard, 'id'>): BankCard {
    const newCard: BankCard = {
      ...card,
      id: Date.now().toString(),
    };
    this.data.bankCards.push(newCard);
    this.saveData();
    return newCard;
  }

  updateBankCard(id: string, updates: Partial<BankCard>): BankCard | null {
    const index = this.data.bankCards.findIndex(c => c.id === id);
    if (index !== -1) {
      this.data.bankCards[index] = { ...this.data.bankCards[index], ...updates };
      this.saveData();
      return this.data.bankCards[index];
    }
    return null;
  }

  deleteBankCard(id: string): boolean {
    const index = this.data.bankCards.findIndex(c => c.id === id);
    if (index !== -1) {
      this.data.bankCards.splice(index, 1);
      this.saveData();
      return true;
    }
    return false;
  }

  // Debts
  getDebts(): Debt[] {
    return this.data.debts;
  }

  addDebt(debt: Omit<Debt, 'id'>): Debt {
    const newDebt: Debt = {
      ...debt,
      id: Date.now().toString(),
    };
    this.data.debts.push(newDebt);
    this.saveData();
    return newDebt;
  }

  updateDebt(id: string, updates: Partial<Debt>): Debt | null {
    const index = this.data.debts.findIndex(d => d.id === id);
    if (index !== -1) {
      this.data.debts[index] = { ...this.data.debts[index], ...updates };
      this.saveData();
      return this.data.debts[index];
    }
    return null;
  }

  deleteDebt(id: string): boolean {
    const index = this.data.debts.findIndex(d => d.id === id);
    if (index !== -1) {
      this.data.debts.splice(index, 1);
      this.saveData();
      return true;
    }
    return false;
  }

  // Derogatory Marks
  getDerogatoryMarks(): DerogatoryMark[] {
    return this.data.derogatoryMarks;
  }

  addDerogatoryMark(mark: Omit<DerogatoryMark, 'id'>): DerogatoryMark {
    const newMark: DerogatoryMark = {
      ...mark,
      id: Date.now().toString(),
    };
    this.data.derogatoryMarks.push(newMark);
    this.saveData();
    return newMark;
  }

  updateDerogatoryMark(id: string, updates: Partial<DerogatoryMark>): DerogatoryMark | null {
    const index = this.data.derogatoryMarks.findIndex(m => m.id === id);
    if (index !== -1) {
      this.data.derogatoryMarks[index] = { ...this.data.derogatoryMarks[index], ...updates };
      this.saveData();
      return this.data.derogatoryMarks[index];
    }
    return null;
  }

  deleteDerogatoryMark(id: string): boolean {
    const index = this.data.derogatoryMarks.findIndex(m => m.id === id);
    if (index !== -1) {
      this.data.derogatoryMarks.splice(index, 1);
      this.saveData();
      return true;
    }
    return false;
  }

  // Utility methods
  exportData(): AppData {
    return { ...this.data };
  }

  importData(data: AppData): void {
    this.data = data;
    this.saveData();
  }

  clearAllData(): void {
    this.data = { ...defaultData };
    this.saveData();
  }

  getFinancialSummary() {
    const creditCards = this.getCreditCards();
    const bankCards = this.getBankCards();
    const debts = this.getDebts();
    const creditScores = this.getCreditScores();

    const totalCreditLimit = creditCards.reduce((sum, card) => sum + card.creditLimit, 0);
    const totalDebt = debts.reduce((sum, debt) => sum + debt.currentBalance, 0);

    // Calculate average credit score from latest scores per provider
    const latestScores = creditScores.reduce((acc, score) => {
      if (!acc[score.provider] || new Date(score.date) > new Date(acc[score.provider].date)) {
        acc[score.provider] = score;
      }
      return acc;
    }, {} as Record<string, CreditScore>);

    const averageCreditScore = Object.values(latestScores).length > 0 
      ? Object.values(latestScores).reduce((sum, score) => sum + score.score, 0) / Object.values(latestScores).length
      : 0;

    return {
      totalCreditLimit,
      totalDebt,
      averageCreditScore,
      latestScores: Object.values(latestScores),
    };
  }
}

export const dataStore = new DataStore();