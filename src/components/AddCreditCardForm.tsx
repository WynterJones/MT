import { useState } from 'react';
import { useAppData } from '../hooks/useAppData';
import { CreditCard } from '../types';

interface AddCreditCardFormProps {
  onClose: () => void;
}

const AddCreditCardForm = ({ onClose }: AddCreditCardFormProps) => {
  const { addCreditCard } = useAppData();
  const [formData, setFormData] = useState({
    bank: '',
    name: '',
    type: 'visa' as CreditCard['type'],
    lastFourDigits: '',
    creditLimit: '',
    annualFee: '',
    interestRate: '',
    statementDate: '1',
    autopayEnabled: false,
    associatedBank: '',
    cardColor: 'blue' as CreditCard['cardColor'],
    status: 'active' as CreditCard['status'],
    openedDate: new Date().toISOString().split('T')[0],
    notes: '',
    // Rewards
    hasRewards: false,
    rewardsType: 'cashback' as 'cashback' | 'points' | 'miles' | 'other',
    rewardsRate: '',
    rewardsDescription: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.bank.trim()) newErrors.bank = 'Bank is required';
    if (!formData.name.trim()) newErrors.name = 'Card name is required';
    if (!formData.lastFourDigits.trim()) {
      newErrors.lastFourDigits = 'Last 4 digits are required';
    } else if (!/^\d{4}$/.test(formData.lastFourDigits)) {
      newErrors.lastFourDigits = 'Must be exactly 4 digits';
    }
    if (!formData.creditLimit || isNaN(Number(formData.creditLimit)) || Number(formData.creditLimit) <= 0) {
      newErrors.creditLimit = 'Valid credit limit is required';
    }
    if (!formData.annualFee || isNaN(Number(formData.annualFee)) || Number(formData.annualFee) < 0) {
      newErrors.annualFee = 'Valid annual fee is required (use 0 for no fee)';
    }
    if (!formData.interestRate || isNaN(Number(formData.interestRate)) || Number(formData.interestRate) < 0) {
      newErrors.interestRate = 'Valid interest rate is required';
    }
    if (!formData.associatedBank.trim()) newErrors.associatedBank = 'Associated bank is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const creditCard: Omit<CreditCard, 'id'> = {
      bank: formData.bank.trim(),
      name: formData.name.trim(),
      type: formData.type,
      lastFourDigits: formData.lastFourDigits,
      creditLimit: Number(formData.creditLimit),
      annualFee: Number(formData.annualFee),
      interestRate: Number(formData.interestRate),
      statementDate: Number(formData.statementDate),
      autopayEnabled: formData.autopayEnabled,
      associatedBank: formData.associatedBank.trim(),
      cardColor: formData.cardColor,
      status: formData.status,
      openedDate: formData.openedDate,
      notes: formData.notes || undefined,
      rewards: formData.hasRewards ? {
        type: formData.rewardsType,
        rate: Number(formData.rewardsRate),
        description: formData.rewardsDescription || undefined
      } : undefined
    };
    
    addCreditCard(creditCard);
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
          <label className="block text-sm font-medium text-white mb-1">Card Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
            placeholder="Visa Infinite"
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">Card Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
          >
            <option value="visa">Visa</option>
            <option value="mastercard">Mastercard</option>
            <option value="amex">American Express</option>
            <option value="discover">Discover</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">Last 4 Digits</label>
          <input
            type="text"
            name="lastFourDigits"
            value={formData.lastFourDigits}
            onChange={handleChange}
            maxLength={4}
            className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
            placeholder="1234"
          />
          {errors.lastFourDigits && <p className="text-red-400 text-sm mt-1">{errors.lastFourDigits}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">Credit Limit</label>
          <input
            type="number"
            name="creditLimit"
            value={formData.creditLimit}
            onChange={handleChange}
            min="0"
            className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
            placeholder="5000"
          />
          {errors.creditLimit && <p className="text-red-400 text-sm mt-1">{errors.creditLimit}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">Annual Fee</label>
          <input
            type="number"
            name="annualFee"
            value={formData.annualFee}
            onChange={handleChange}
            min="0"
            className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
            placeholder="0"
          />
          {errors.annualFee && <p className="text-red-400 text-sm mt-1">{errors.annualFee}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">Interest Rate (%)</label>
          <input
            type="number"
            name="interestRate"
            value={formData.interestRate}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
            placeholder="19.99"
          />
          {errors.interestRate && <p className="text-red-400 text-sm mt-1">{errors.interestRate}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">Statement Date</label>
          <select
            name="statementDate"
            value={formData.statementDate}
            onChange={handleChange}
            className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
          >
            {Array.from({ length: 28 }, (_, i) => i + 1).map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">Associated Bank</label>
        <input
          type="text"
          name="associatedBank"
          value={formData.associatedBank}
          onChange={handleChange}
          className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
          placeholder="TD Bank"
        />
        {errors.associatedBank && <p className="text-red-400 text-sm mt-1">{errors.associatedBank}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
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

        <div className="flex items-center space-x-4 mt-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="autopayEnabled"
              checked={formData.autopayEnabled}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-white text-sm">AutoPay Enabled</span>
          </label>
        </div>
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="hasRewards"
            checked={formData.hasRewards}
            onChange={handleChange}
            className="mr-2"
          />
          <span className="text-white text-sm">Has Rewards Program</span>
        </label>
      </div>

      {formData.hasRewards && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">Rewards Type</label>
            <select
              name="rewardsType"
              value={formData.rewardsType}
              onChange={handleChange}
              className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
            >
              <option value="cashback">Cashback</option>
              <option value="points">Points</option>
              <option value="miles">Miles</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Rewards Rate (%)</label>
            <input
              type="number"
              name="rewardsRate"
              value={formData.rewardsRate}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
              placeholder="1.5"
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
          Add Card
        </button>
      </div>
    </form>
  );
};

export default AddCreditCardForm;