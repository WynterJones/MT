export interface CreditScore {
  id: string;
  provider: 'credit-karma' | 'borrowell' | 'equifax' | 'transunion' | 'other';
  score: number;
  date: string;
  notes?: string;
}

export interface CreditCard {
  id: string;
  bank: string;
  name: string;
  type: 'visa' | 'mastercard' | 'amex' | 'discover' | 'other';
  lastFourDigits: string;
  creditLimit: number;
  annualFee: number;
  interestRate: number;
  statementDate: number; // day of month (1-31)
  autopayEnabled: boolean;
  associatedBank: string;
  cardColor: 'blue' | 'black' | 'gold' | 'platinum' | 'red' | 'green' | 'purple' | 'gradient';
  rewards?: {
    type: 'cashback' | 'points' | 'miles' | 'other';
    rate: number;
    description?: string;
  };
  status: 'active' | 'closed' | 'frozen';
  openedDate: string;
  closedDate?: string;
  notes?: string;
}

export interface BankCard {
  id: string;
  bank: string;
  accountName: string;
  accountType: 'chequing' | 'savings' | 'tfsa' | 'rrsp' | 'other';
  accountNumber: string; // last 4 digits only
  monthlyFee: number;
  minimumBalanceForNoFee: number;
  interestRate?: number;
  cardColor: 'blue' | 'black' | 'gold' | 'platinum' | 'red' | 'green' | 'purple' | 'gradient';
  transactionLimits?: {
    monthly: number;
    perTransaction: number;
  };
  status: 'active' | 'closed' | 'frozen';
  openedDate: string;
  closedDate?: string;
  notes?: string;
}

export interface Debt {
  id: string;
  name: string;
  type: 'cra-tax' | 'student-loan' | 'personal-loan' | 'mortgage' | 'credit-card' | 'other';
  creditor: string;
  originalAmount: number;
  currentBalance: number;
  interestRate: number;
  minimumPayment: number;
  paymentFrequency: 'monthly' | 'bi-weekly' | 'weekly' | 'quarterly' | 'annual';
  dueDate: string;
  status: 'active' | 'paid-off' | 'defaulted' | 'in-collection';
  notes?: string;
}

export interface DerogatoryMark {
  id: string;
  type: 'late-payment' | 'collection' | 'bankruptcy' | 'foreclosure' | 'repossession' | 'other';
  creditor: string;
  amount?: number;
  date: string;
  description: string;
  status: 'active' | 'resolved' | 'disputed';
  impactOnScore?: number;
  notes?: string;
}

export interface PaymentReminder {
  id: string;
  cardId: string;
  amount: number;
  dueDate: string;
  type: 'credit-card' | 'debt';
  status: 'pending' | 'paid' | 'overdue';
  autopayEnabled: boolean;
}

export interface FinancialSummary {
  totalCreditLimit: number;
  totalCreditUsed: number;
  creditUtilization: number;
  totalMonthlyFees: number;
  totalDebt: number;
  totalBankBalance: number;
  averageCreditScore: number;
  upcomingPayments: PaymentReminder[];
}

export interface AppData {
  creditScores: CreditScore[];
  creditCards: CreditCard[];
  bankCards: BankCard[];
  debts: Debt[];
  derogatoryMarks: DerogatoryMark[];
  paymentReminders: PaymentReminder[];
  lastUpdated: string;
}