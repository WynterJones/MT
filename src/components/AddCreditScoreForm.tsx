import { useState } from 'react';
import { useAppData } from '../hooks/useAppData';
import { CreditScore } from '../types';

interface AddCreditScoreFormProps {
  onClose: () => void;
}

const AddCreditScoreForm = ({ onClose }: AddCreditScoreFormProps) => {
  const { addCreditScore } = useAppData();
  const [formData, setFormData] = useState({
    provider: 'credit-karma' as CreditScore['provider'],
    score: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.score) {
      newErrors.score = 'Score is required';
    } else if (isNaN(Number(formData.score)) || Number(formData.score) < 300 || Number(formData.score) > 850) {
      newErrors.score = 'Score must be between 300 and 850';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    addCreditScore({
      provider: formData.provider,
      score: Number(formData.score),
      date: formData.date,
      notes: formData.notes || undefined
    });
    
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-white mb-1">Provider</label>
        <select
          name="provider"
          value={formData.provider}
          onChange={handleChange}
          className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
        >
          <option value="credit-karma">Credit Karma</option>
          <option value="borrowell">Borrowell</option>
          <option value="equifax">Equifax</option>
          <option value="transunion">TransUnion</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">Score</label>
        <input
          type="number"
          name="score"
          value={formData.score}
          onChange={handleChange}
          min="300"
          max="850"
          className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
          placeholder="750"
        />
        {errors.score && <p className="text-red-400 text-sm mt-1">{errors.score}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-finance-green-500"
        />
        {errors.date && <p className="text-red-400 text-sm mt-1">{errors.date}</p>}
      </div>

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
          Add Score
        </button>
      </div>
    </form>
  );
};

export default AddCreditScoreForm;