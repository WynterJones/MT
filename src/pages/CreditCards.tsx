import { useState } from 'react';
import { useAppData } from '../hooks/useAppData';
import CreditCardComponent from '../components/CreditCardComponent';
import Modal from '../components/Modal';
import AddCreditCardForm from '../components/AddCreditCardForm';
import EditCreditCardForm from '../components/EditCreditCardForm';
import { CreditCard } from '../types';

const CreditCards = () => {
  const { creditCards, deleteCreditCard } = useAppData();
  const [viewMode, setViewMode] = useState<'gallery' | 'details' | 'analytics'>('gallery');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [cardToEdit, setCardToEdit] = useState<CreditCard | null>(null);

  const handleDeleteCard = (id: string) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      deleteCreditCard(id);
    }
  };

  const handleEditCard = (card: CreditCard) => {
    setCardToEdit(card);
    setShowEditForm(true);
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setCardToEdit(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Credit Cards</h1>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-finance-green-600 hover:bg-finance-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Add Card
        </button>
      </div>

      <div className="flex space-x-4 mb-6">
        <button 
          onClick={() => setViewMode('gallery')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            viewMode === 'gallery' 
              ? 'bg-finance-green-600 text-white' 
              : 'bg-dark-700 text-dark-300 hover:bg-dark-600 hover:text-white'
          }`}
        >
          Gallery View
        </button>
        <button 
          onClick={() => setViewMode('details')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            viewMode === 'details' 
              ? 'bg-finance-green-600 text-white' 
              : 'bg-dark-700 text-dark-300 hover:bg-dark-600 hover:text-white'
          }`}
        >
          Details View
        </button>
        <button 
          onClick={() => setViewMode('analytics')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            viewMode === 'analytics' 
              ? 'bg-finance-green-600 text-white' 
              : 'bg-dark-700 text-dark-300 hover:bg-dark-600 hover:text-white'
          }`}
        >
          Analytics View
        </button>
      </div>

      {viewMode === 'gallery' ? (
        <div className="space-y-8">
          {creditCards.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💳</div>
              <h3 className="text-xl font-bold text-white mb-2">No Credit Cards Yet</h3>
              <p className="text-dark-400 mb-6">Add your first credit card to get started</p>
              <button 
                onClick={() => setShowAddForm(true)}
                className="bg-finance-green-600 hover:bg-finance-green-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Add Your First Card
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
              {creditCards.map((card) => {
                const getCardBackground = (color: string) => {
                  switch (color) {
                    case 'blue':
                      return 'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800';
                    case 'black':
                      return 'bg-gradient-to-br from-gray-800 via-gray-900 to-black';
                    case 'gold':
                      return 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600';
                    case 'platinum':
                      return 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500';
                    case 'red':
                      return 'bg-gradient-to-br from-red-600 via-red-700 to-red-800';
                    case 'green':
                      return 'bg-gradient-to-br from-finance-green-600 via-finance-green-700 to-finance-green-800';
                    case 'purple':
                      return 'bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800';
                    case 'gradient':
                      return 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600';
                    default:
                      return 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900';
                  }
                };

                const getCardNetwork = (type: string) => {
                  switch (type) {
                    case 'visa':
                      return 'VISA';
                    case 'mastercard':
                      return 'Mastercard';
                    case 'amex':
                      return 'AMEX';
                    case 'discover':
                      return 'DISCOVER';
                    default:
                      return type.toUpperCase();
                  }
                };

                const getTextColor = (color: string) => {
                  return color === 'gold' || color === 'platinum' ? 'text-gray-800' : 'text-white';
                };

                return (
                  <div key={card.id} className="relative group">
                    <div className={`
                      ${getCardBackground(card.cardColor)}
                      ${getTextColor(card.cardColor)}
                      w-96 h-60 rounded-2xl p-6 shadow-2xl
                      relative overflow-hidden
                      transform transition-all duration-300
                      hover:scale-105 hover:shadow-3xl
                      cursor-pointer
                    `}>
                      {/* Card shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      
                      {/* Card network logo */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                          <span className="text-sm font-bold">{getCardNetwork(card.type)}</span>
                        </div>
                      </div>

                      {/* Chip */}
                      <div className="absolute top-6 left-6 w-12 h-9 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-lg border border-yellow-600 shadow-inner">
                        <div className="grid grid-cols-2 gap-px p-1 h-full">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="bg-yellow-400 rounded-sm"></div>
                          ))}
                        </div>
                      </div>

                      {/* Card number */}
                      <div className="absolute top-20 left-6 right-6">
                        <div className="flex space-x-4 font-mono text-xl font-bold tracking-wider">
                          <span>••••</span>
                          <span>••••</span>
                          <span>••••</span>
                          <span>{card.lastFourDigits}</span>
                        </div>
                      </div>

                      {/* Card holder info */}
                      <div className="absolute bottom-16 left-6 right-6">
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-xs opacity-75 uppercase tracking-wider">Bank</p>
                            <p className="text-lg font-bold">{card.bank}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs opacity-75 uppercase tracking-wider">Type</p>
                            <p className="text-sm font-semibold">{card.name}</p>
                          </div>
                        </div>
                      </div>

                      {/* Card details */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex justify-between items-center text-xs">
                          <span className="opacity-75">Limit: ${card.creditLimit.toLocaleString()}</span>
                          <span className="opacity-75">APR: {card.interestRate}%</span>
                        </div>
                      </div>

                      {/* Holographic effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Card actions */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditCard(card)}
                          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteCard(card.id)}
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : viewMode === 'details' ? (
        <div className="space-y-8">
          {creditCards.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💳</div>
              <h3 className="text-xl font-bold text-white mb-2">No Credit Cards Yet</h3>
              <p className="text-dark-400 mb-6">Add your first credit card to get started</p>
              <button 
                onClick={() => setShowAddForm(true)}
                className="bg-finance-green-600 hover:bg-finance-green-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Add Your First Card
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
              {creditCards.map((card) => (
                <CreditCardComponent
                  key={card.id}
                  card={card}
                  onEdit={handleEditCard}
                  onDelete={handleDeleteCard}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Analytics View</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-dark-700 rounded-lg p-4">
              <h3 className="text-finance-green-400 font-semibold mb-2">Total Cards</h3>
              <p className="text-3xl font-bold text-white">{creditCards.length}</p>
            </div>
            <div className="bg-dark-700 rounded-lg p-4">
              <h3 className="text-finance-green-400 font-semibold mb-2">Total Credit Limit</h3>
              <p className="text-3xl font-bold text-white">
                ${creditCards.reduce((sum, card) => sum + card.creditLimit, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-dark-700 rounded-lg p-4">
              <h3 className="text-red-400 font-semibold mb-2">Annual Fees</h3>
              <p className="text-3xl font-bold text-white">
                ${creditCards.reduce((sum, card) => sum + card.annualFee, 0).toLocaleString()}
              </p>
            </div>
          </div>
          
          {creditCards.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-bold text-white mb-4">Card Details</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-dark-700">
                      <th className="text-left py-2 text-dark-400">Bank</th>
                      <th className="text-left py-2 text-dark-400">Name</th>
                      <th className="text-left py-2 text-dark-400">Limit</th>
                      <th className="text-left py-2 text-dark-400">APR</th>
                      <th className="text-left py-2 text-dark-400">Annual Fee</th>
                      <th className="text-left py-2 text-dark-400">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {creditCards.map((card) => (
                      <tr key={card.id} className="border-b border-dark-700">
                        <td className="py-2 text-white">{card.bank}</td>
                        <td className="py-2 text-white">{card.name}</td>
                        <td className="py-2 text-white">${card.creditLimit.toLocaleString()}</td>
                        <td className="py-2 text-white">{card.interestRate}%</td>
                        <td className="py-2 text-white">${card.annualFee}</td>
                        <td className="py-2">
                          <span className={`capitalize ${
                            card.status === 'active' ? 'text-finance-green-400' : 
                            card.status === 'closed' ? 'text-red-400' : 'text-yellow-400'
                          }`}>
                            {card.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      <Modal isOpen={showAddForm} onClose={() => setShowAddForm(false)} title="Add Credit Card">
        <AddCreditCardForm onClose={() => setShowAddForm(false)} />
      </Modal>

      <Modal isOpen={showEditForm} onClose={handleCloseEditForm} title="Edit Credit Card">
        {cardToEdit && (
          <EditCreditCardForm card={cardToEdit} onClose={handleCloseEditForm} />
        )}
      </Modal>
    </div>
  );
};

export default CreditCards;