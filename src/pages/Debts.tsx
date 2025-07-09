import { useState } from 'react';
import { useAppData } from '../hooks/useAppData';
import Modal from '../components/Modal';
import AddDebtForm from '../components/AddDebtForm';
import EditDebtForm from '../components/EditDebtForm';
import { Debt } from '../types';

const Debts = () => {
  const { debts, deleteDebt } = useAppData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [debtToEdit, setDebtToEdit] = useState<Debt | null>(null);

  const activeDebts = debts.filter(debt => debt.status === 'active');
  const totalDebt = activeDebts.reduce((sum, debt) => sum + debt.currentBalance, 0);
  const totalMonthlyPayments = activeDebts.reduce((sum, debt) => sum + debt.minimumPayment, 0);

  const handleDeleteDebt = (id: string) => {
    if (window.confirm('Are you sure you want to delete this debt?')) {
      deleteDebt(id);
    }
  };

  const handleEditDebt = (debt: Debt) => {
    setDebtToEdit(debt);
    setShowEditForm(true);
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setDebtToEdit(null);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-400';
      case 'paid-off': return 'text-finance-green-400';
      case 'defaulted': return 'text-red-600';
      case 'in-collection': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Debts</h1>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-finance-green-600 hover:bg-finance-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Add Debt
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
          <h3 className="text-red-400 text-sm font-semibold mb-2">Total Debt</h3>
          <p className="text-3xl font-bold text-white">${totalDebt.toLocaleString()}</p>
          <p className="text-dark-400 text-sm mt-1">{activeDebts.length} active debts</p>
        </div>

        <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
          <h3 className="text-yellow-400 text-sm font-semibold mb-2">Monthly Payments</h3>
          <p className="text-3xl font-bold text-white">${totalMonthlyPayments.toLocaleString()}</p>
          <p className="text-dark-400 text-sm mt-1">Combined minimum</p>
        </div>

        <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
          <h3 className="text-finance-green-400 text-sm font-semibold mb-2">Total Debts</h3>
          <p className="text-3xl font-bold text-white">{debts.length}</p>
          <p className="text-dark-400 text-sm mt-1">All time</p>
        </div>
      </div>

      {debts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💰</div>
          <h3 className="text-xl font-bold text-white mb-2">No Debts Yet</h3>
          <p className="text-dark-400 mb-6">Add your first debt to start tracking</p>
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-finance-green-600 hover:bg-finance-green-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Add Your First Debt
          </button>
        </div>
      ) : (
        <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">All Debts</h2>
          <div className="space-y-4">
            {debts.map((debt) => (
              <div key={debt.id} className="bg-dark-700 rounded-lg p-4 relative group">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">{debt.name}</h3>
                  <div className="flex items-center space-x-3">
                    <span className={`font-bold ${getStatusColor(debt.status)}`}>
                      ${debt.currentBalance.toLocaleString()}
                    </span>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button
                        onClick={() => handleEditDebt(debt)}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-1 rounded transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteDebt(debt.id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-1 rounded transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-dark-400">Type:</p>
                    <p className="text-white">{getDebtTypeLabel(debt.type)}</p>
                  </div>
                  <div>
                    <p className="text-dark-400">Creditor:</p>
                    <p className="text-white">{debt.creditor}</p>
                  </div>
                  <div>
                    <p className="text-dark-400">Interest Rate:</p>
                    <p className="text-white">{debt.interestRate}%</p>
                  </div>
                  <div>
                    <p className="text-dark-400">Min Payment:</p>
                    <p className="text-white">${debt.minimumPayment}/{debt.paymentFrequency}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-3">
                  <div>
                    <p className="text-dark-400">Due Date:</p>
                    <p className="text-white">{new Date(debt.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-dark-400">Original Amount:</p>
                    <p className="text-white">${debt.originalAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-dark-400">Status:</p>
                    <p className={`capitalize ${getStatusColor(debt.status)}`}>{debt.status.replace('-', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-dark-400">Progress:</p>
                    <p className="text-white">
                      {Math.round(((debt.originalAmount - debt.currentBalance) / debt.originalAmount) * 100)}% paid
                    </p>
                  </div>
                </div>
                {debt.notes && (
                  <div className="mt-3 pt-3 border-t border-dark-600">
                    <p className="text-dark-400 text-sm">Notes:</p>
                    <p className="text-white text-sm">{debt.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal isOpen={showAddForm} onClose={() => setShowAddForm(false)} title="Add Debt">
        <AddDebtForm onClose={() => setShowAddForm(false)} />
      </Modal>

      <Modal isOpen={showEditForm} onClose={handleCloseEditForm} title="Edit Debt">
        {debtToEdit && (
          <EditDebtForm debt={debtToEdit} onClose={handleCloseEditForm} />
        )}
      </Modal>
    </div>
  );
};

export default Debts;