import { CreditCard } from '../types';

interface CreditCardComponentProps {
  card: CreditCard;
  onEdit?: (card: CreditCard) => void;
  onDelete?: (id: string) => void;
}

const CreditCardComponent = ({ card, onEdit, onDelete }: CreditCardComponentProps) => {
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
    <div className="relative group">
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
          {onEdit && (
            <button
              onClick={() => onEdit(card)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(card.id)}
              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Card info panel */}
      <div className="mt-4 bg-dark-800 border border-dark-700 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-dark-400">Annual Fee:</span>
            <span className="text-white ml-2">${card.annualFee}</span>
          </div>
          <div>
            <span className="text-dark-400">Statement:</span>
            <span className="text-white ml-2">{card.statementDate}th</span>
          </div>
          <div>
            <span className="text-dark-400">AutoPay:</span>
            <span className={`ml-2 ${card.autopayEnabled ? 'text-finance-green-400' : 'text-red-400'}`}>
              {card.autopayEnabled ? 'ON' : 'OFF'}
            </span>
          </div>
          <div>
            <span className="text-dark-400">Status:</span>
            <span className={`ml-2 capitalize ${
              card.status === 'active' ? 'text-finance-green-400' : 
              card.status === 'closed' ? 'text-red-400' : 'text-yellow-400'
            }`}>
              {card.status}
            </span>
          </div>
        </div>
        
        {card.rewards && (
          <div className="mt-3 pt-3 border-t border-dark-700">
            <div className="flex items-center justify-between">
              <span className="text-dark-400 text-sm">Rewards:</span>
              <span className="text-finance-green-400 text-sm">
                {card.rewards.rate}% {card.rewards.type}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditCardComponent;