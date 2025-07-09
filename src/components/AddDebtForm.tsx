import { useState } from 'react';
import { useAppData } from '../hooks/useAppData';
import { Debt } from '../types';

interface AddDebtFormProps {
  onClose: () => void;
}

const AddDebtForm = ({ onClose }: AddDebtFormProps) => {
  const { addDebt } = useAppData();
  const [formData, setFormData] = useState({
    name: '',
    type: 'cra-tax' as Debt['type'],
    creditor: '',
    originalAmount: '',
    currentBalance: '',
    interestRate: '',
    minimumPayment: '',
    paymentFrequency: 'monthly' as Debt['paymentFrequency'],
    dueDate: '',
    status: 'active' as Debt['status'],
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Debt name is required';
    if (!formData.creditor.trim()) newErrors.creditor = 'Creditor is required';
    if (!formData.originalAmount || isNaN(Number(formData.originalAmount)) || Number(formData.originalAmount) <= 0) {
      newErrors.originalAmount = 'Valid original amount is required';
    }
    if (!formData.currentBalance || isNaN(Number(formData.currentBalance)) || Number(formData.currentBalance) < 0) {
      newErrors.currentBalance = 'Valid current balance is required';
    }
    if (!formData.interestRate || isNaN(Number(formData.interestRate)) || Number(formData.interestRate) < 0) {
      newErrors.interestRate = 'Valid interest rate is required';
    }
    if (!formData.minimumPayment || isNaN(Number(formData.minimumPayment)) || Number(formData.minimumPayment) < 0) {
      newErrors.minimumPayment = 'Valid minimum payment is required';
    }
    if (!formData.dueDate.trim()) newErrors.dueDate = 'Due date is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const debt: Omit<Debt, 'id'> = {
      name: formData.name.trim(),
      type: formData.type,
      creditor: formData.creditor.trim(),
      originalAmount: Number(formData.originalAmount),
      currentBalance: Number(formData.currentBalance),
      interestRate: Number(formData.interestRate),
      minimumPayment: Number(formData.minimumPayment),
      paymentFrequency: formData.paymentFrequency,
      dueDate: formData.dueDate,
      status: formData.status,
      notes: formData.notes || undefined
    };
    
    addDebt(debt);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const getDebtTypeLabel = (type: string) => {
    switch (type) {
      case 'cra-tax': return 'CRA Tax Debt';
      case 'student-loan': return 'Student Loan';
      case 'personal-loan': return 'Personal Loan';
      case 'mortgage': return 'Mortgage';
      case 'credit-card': return 'Credit Card Debt';
      case 'other': return 'Other';
      default: return type;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">Debt Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
            placeholder="2023 Income Tax"
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">Debt Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
          >
            <option value="cra-tax">CRA Tax Debt</option>
            <option value="student-loan">Student Loan</option>
            <option value="personal-loan">Personal Loan</option>
            <option value="mortgage">Mortgage</option>
            <option value="credit-card">Credit Card Debt</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">Creditor</label>
        <input
          type="text"
          name="creditor"
          value={formData.creditor}
          onChange={handleChange}
          className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
          placeholder="Canada Revenue Agency"
        />
        {errors.creditor && <p className="text-red-400 text-sm mt-1">{errors.creditor}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">Original Amount</label>
          <input
            type="number"
            name="originalAmount"
            value={formData.originalAmount}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
            placeholder="5000"
          />
          {errors.originalAmount && <p className="text-red-400 text-sm mt-1">{errors.originalAmount}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">Current Balance</label>
          <input
            type="number"
            name="currentBalance"
            value={formData.currentBalance}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
            placeholder="3500"
          />
          {errors.currentBalance && <p className="text-red-400 text-sm mt-1">{errors.currentBalance}</p>}
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
            placeholder="5.0"
          />
          {errors.interestRate && <p className="text-red-400 text-sm mt-1">{errors.interestRate}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">Minimum Payment</label>
          <input
            type="number"
            name="minimumPayment"
            value={formData.minimumPayment}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
            placeholder="150"
          />
          {errors.minimumPayment && <p className="text-red-400 text-sm mt-1">{errors.minimumPayment}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">Payment Frequency</label>
          <select
            name="paymentFrequency"
            value={formData.paymentFrequency}
            onChange={handleChange}
            className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
          >
            <option value="monthly">Monthly</option>
            <option value="bi-weekly">Bi-weekly</option>
            <option value="weekly">Weekly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annual">Annual</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
          />
          {errors.dueDate && <p className="text-red-400 text-sm mt-1">{errors.dueDate}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
        >
          <option value="active">Active</option>
          <option value="paid-off">Paid Off</option>
          <option value="defaulted">Defaulted</option>
          <option value="in-collection">In Collection</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">Notes (Optional)</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
          placeholder="Any additional notes about this debt..."
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
          Add Debt
        </button>
      </div>
    </form>
  );
};

export default AddDebtForm;