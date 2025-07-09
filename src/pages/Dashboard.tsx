import { useAppData } from '../hooks/useAppData';
import { useNavigate } from 'react-router-dom';
import { 
  MdDashboard, 
  MdTrendingUp, 
  MdCreditCard, 
  MdAccountBalance, 
  MdAttachMoney,
  MdArrowForward
} from 'react-icons/md';

const Dashboard = () => {
  const { getFinancialSummary, creditCards, bankCards, debts, isLoading } = useAppData();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const summary = getFinancialSummary();
  const activeDebts = debts.filter(debt => debt.status === 'active');
  const totalDebtAmount = activeDebts.reduce((sum, debt) => sum + debt.currentBalance, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <MdDashboard className="text-3xl text-finance-green-500" />
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-dark-300">Financial portfolio overview</p>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Credit Score */}
        <div 
          className="bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 border border-dark-700 rounded-2xl p-6 hover:border-finance-green-500/30 transition-all cursor-pointer group"
          onClick={() => navigate('/credit-score')}
        >
          <div className="flex items-center justify-between mb-4">
            <MdTrendingUp className="text-2xl text-finance-green-500" />
            <MdArrowForward className="text-dark-500 group-hover:text-finance-green-500 transition-colors" />
          </div>
          <h3 className="text-finance-green-400 text-sm font-semibold mb-2">Credit Score</h3>
          <p className="text-4xl font-bold text-white mb-1">
            {summary.averageCreditScore > 0 ? Math.round(summary.averageCreditScore) : '--'}
          </p>
          <p className="text-dark-400 text-sm">
            {summary.latestScores?.length > 0 ? `${summary.latestScores.length} provider${summary.latestScores.length > 1 ? 's' : ''}` : 'No scores tracked'}
          </p>
        </div>

        {/* Credit Cards */}
        <div 
          className="bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 border border-dark-700 rounded-2xl p-6 hover:border-blue-500/30 transition-all cursor-pointer group"
          onClick={() => navigate('/credit-cards')}
        >
          <div className="flex items-center justify-between mb-4">
            <MdCreditCard className="text-2xl text-blue-500" />
            <MdArrowForward className="text-dark-500 group-hover:text-blue-500 transition-colors" />
          </div>
          <h3 className="text-blue-400 text-sm font-semibold mb-2">Credit Cards</h3>
          <p className="text-4xl font-bold text-white mb-1">{creditCards.length}</p>
          <p className="text-dark-400 text-sm">
            ${summary.totalCreditLimit.toLocaleString()} total limit
          </p>
        </div>

        {/* Bank Cards */}
        <div 
          className="bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 border border-dark-700 rounded-2xl p-6 hover:border-purple-500/30 transition-all cursor-pointer group"
          onClick={() => navigate('/bank-cards')}
        >
          <div className="flex items-center justify-between mb-4">
            <MdAccountBalance className="text-2xl text-purple-500" />
            <MdArrowForward className="text-dark-500 group-hover:text-purple-500 transition-colors" />
          </div>
          <h3 className="text-purple-400 text-sm font-semibold mb-2">Bank Cards</h3>
          <p className="text-4xl font-bold text-white mb-1">{bankCards.length}</p>
          <p className="text-dark-400 text-sm">
            ${bankCards.reduce((sum, card) => sum + card.monthlyFee, 0).toFixed(2)}/month fees
          </p>
        </div>

        {/* Debts */}
        <div 
          className="bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 border border-dark-700 rounded-2xl p-6 hover:border-red-500/30 transition-all cursor-pointer group"
          onClick={() => navigate('/debts')}
        >
          <div className="flex items-center justify-between mb-4">
            <MdAttachMoney className="text-2xl text-red-500" />
            <MdArrowForward className="text-dark-500 group-hover:text-red-500 transition-colors" />
          </div>
          <h3 className="text-red-400 text-sm font-semibold mb-2">Active Debts</h3>
          <p className="text-4xl font-bold text-white mb-1">{activeDebts.length}</p>
          <p className="text-dark-400 text-sm">
            ${totalDebtAmount.toLocaleString()} total owed
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Credit Overview */}
        <div className="bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 border border-dark-700 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
            <MdCreditCard className="text-finance-green-500" />
            <span>Credit Overview</span>
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-dark-800/50 rounded-lg">
              <span className="text-dark-300">Total Credit Limit</span>
              <span className="text-white font-semibold">${summary.totalCreditLimit.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-dark-800/50 rounded-lg">
              <span className="text-dark-300">Annual Fees</span>
              <span className="text-red-400 font-semibold">
                ${creditCards.reduce((sum, card) => sum + card.annualFee, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-dark-800/50 rounded-lg">
              <span className="text-dark-300">Cards with Fees</span>
              <span className="text-yellow-400 font-semibold">
                {creditCards.filter(card => card.annualFee > 0).length} of {creditCards.length}
              </span>
            </div>
          </div>
        </div>

        {/* Account Summary */}
        <div className="bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 border border-dark-700 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
            <MdAccountBalance className="text-finance-green-500" />
            <span>Account Summary</span>
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-dark-800/50 rounded-lg">
              <span className="text-dark-300">Bank Accounts</span>
              <span className="text-white font-semibold">{bankCards.length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-dark-800/50 rounded-lg">
              <span className="text-dark-300">Monthly Bank Fees</span>
              <span className="text-red-400 font-semibold">
                ${bankCards.reduce((sum, card) => sum + card.monthlyFee, 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-dark-800/50 rounded-lg">
              <span className="text-dark-300">Total Debts</span>
              <span className="text-red-400 font-semibold">
                ${totalDebtAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;