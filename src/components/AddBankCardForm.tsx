import { useState } from 'react';
import { useAppData } from '../hooks/useAppData';
import { BankCard } from '../types';

interface AddBankCardFormProps {
  onClose: () => void;
}

const AddBankCardForm = ({ onClose }: AddBankCardFormProps) => {
  const { addBankCard } = useAppData();
  const [formData, setFormData] = useState({
    bank: '',
    accountName: '',
    accountType: 'chequing' as BankCard['accountType'],
    accountNumber: '',
    monthlyFee: '',
    minimumBalanceForNoFee: '',
    interestRate: '',
    cardColor: 'blue' as BankCard['cardColor'],
    status: 'active' as BankCard['status'],
    openedDate: new Date().toISOString().split('T')[0],
    notes: '',
    // Transaction limits
    hasTransactionLimits: false,
    monthlyLimit: '',
    perTransactionLimit: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.bank.trim()) newErrors.bank = 'Bank is required';
    if (!formData.accountName.trim()) newErrors.accountName = 'Account name is required';
    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Account number (last 4 digits) is required';
    } else if (!/^\d{4}$/.test(formData.accountNumber)) {
      newErrors.accountNumber = 'Must be exactly 4 digits';
    }
    if (!formData.monthlyFee || isNaN(Number(formData.monthlyFee)) || Number(formData.monthlyFee) < 0) {
      newErrors.monthlyFee = 'Valid monthly fee is required (use 0 for no fee)';
    }
    if (!formData.minimumBalanceForNoFee || isNaN(Number(formData.minimumBalanceForNoFee)) || Number(formData.minimumBalanceForNoFee) < 0) {
      newErrors.minimumBalanceForNoFee = 'Valid minimum balance is required (use 0 for no minimum)';
    }
    if (formData.interestRate && (isNaN(Number(formData.interestRate)) || Number(formData.interestRate) < 0)) {
      newErrors.interestRate = 'Interest rate must be a valid number';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const bankCard: Omit<BankCard, 'id'> = {
      bank: formData.bank.trim(),
      accountName: formData.accountName.trim(),
      accountType: formData.accountType,
      accountNumber: formData.accountNumber,
      monthlyFee: Number(formData.monthlyFee),
      minimumBalanceForNoFee: Number(formData.minimumBalanceForNoFee),
      interestRate: formData.interestRate ? Number(formData.interestRate) : undefined,
      cardColor: formData.cardColor,
      status: formData.status,
      openedDate: formData.openedDate,
      notes: formData.notes || undefined,
      transactionLimits: formData.hasTransactionLimits ? {
        monthly: Number(formData.monthlyLimit),
        perTransaction: Number(formData.perTransactionLimit)
      } : undefined
    };
    
    addBankCard(bankCard);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">Bank</label>
          <input
            type="text"
            name="bank"
            value={formData.bank}
            onChange={handleChange}
            className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
            placeholder="TD Bank"
          />
          {errors.bank && <p className="text-red-400 text-sm mt-1">{errors.bank}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">Account Name</label>
          <input
            type="text"
            name="accountName"
            value={formData.accountName}
            onChange={handleChange}
            className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
            placeholder="Unlimited Chequing"
          />
          {errors.accountName && <p className="text-red-400 text-sm mt-1">{errors.accountName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">Account Type</label>
          <select
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
          >
            <option value="chequing">Chequing</option>
            <option value="savings">Savings</option>
            <option value="tfsa">TFSA</option>
            <option value="rrsp">RRSP</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">Account Number (Last 4)</label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            maxLength={4}
            className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
            placeholder="1234"
          />
          {errors.accountNumber && <p className="text-red-400 text-sm mt-1">{errors.accountNumber}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">Monthly Fee</label>
          <input
            type="number"
            name="monthlyFee"
            value={formData.monthlyFee}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
            placeholder="0"
          />
          {errors.monthlyFee && <p className="text-red-400 text-sm mt-1">{errors.monthlyFee}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">Min Balance (No Fee)</label>
          <input
            type="number"
            name="minimumBalanceForNoFee"
            value={formData.minimumBalanceForNoFee}
            onChange={handleChange}
            min="0"
            className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
            placeholder="0"
          />
          {errors.minimumBalanceForNoFee && <p className="text-red-400 text-sm mt-1">{errors.minimumBalanceForNoFee}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">Interest Rate (%) - Optional</label>
          <input
            type="number"
            name="interestRate"
            value={formData.interestRate}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
            placeholder="2.5"
          />
          {errors.interestRate && <p className="text-red-400 text-sm mt-1">{errors.interestRate}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">Card Color</label>
          <select
            name="cardColor"
            value={formData.cardColor}
            onChange={handleChange}
            className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
          >
            <option value="blue">Blue</option>
            <option value="black">Black</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="purple">Purple</option>
            <option value="gradient">Gradient</option>
          </select>
        </div>
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="hasTransactionLimits"
            checked={formData.hasTransactionLimits}
            onChange={handleChange}
            className="mr-2"
          />
          <span className="text-white text-sm">Has Transaction Limits</span>
        </label>
      </div>

      {formData.hasTransactionLimits && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">Monthly Limit</label>
            <input
              type="number"
              name="monthlyLimit"
              value={formData.monthlyLimit}
              onChange={handleChange}
              min="0"
              className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
              placeholder="5000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Per Transaction Limit</label>
            <input
              type="number"
              name="perTransactionLimit"
              value={formData.perTransactionLimit}
              onChange={handleChange}
              min="0"
              className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
              placeholder="1000"
            />
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-white mb-1">Notes (Optional)</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
          placeholder="Any additional notes..."
        />
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 bg-dark-700 hover:bg-dark-600 text-white py-2 px-4 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 bg-finance-green-600 hover:bg-finance-green-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          Add Account
        </button>
      </div>
    </form>
  );
};

export default AddBankCardForm;