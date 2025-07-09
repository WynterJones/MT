import { useState } from 'react';
import { useAppData } from '../hooks/useAppData';
import Modal from '../components/Modal';
import AddCreditScoreForm from '../components/AddCreditScoreForm';
import EditCreditScoreForm from '../components/EditCreditScoreForm';
import { CreditScore as CreditScoreType } from '../types';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { 
  MdTrendingUp, 
  MdAdd, 
  MdEdit, 
  MdDelete,
  MdInfoOutline 
} from 'react-icons/md';

const CreditScorePage = () => {
  const { creditScores, derogatoryMarks, deleteCreditScore } = useAppData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [scoreToEdit, setScoreToEdit] = useState<CreditScoreType | null>(null);

  // Group scores by provider and get latest
  const latestScores = creditScores.reduce((acc, score) => {
    if (!acc[score.provider] || new Date(score.date) > new Date(acc[score.provider].date)) {
      acc[score.provider] = score;
    }
    return acc;
  }, {} as Record<string, any>);

  const getProviderName = (provider: string) => {
    switch (provider) {
      case 'credit-karma': return 'Credit Karma';
      case 'borrowell': return 'Borrowell';
      case 'equifax': return 'Equifax';
      case 'transunion': return 'TransUnion';
      default: return provider.charAt(0).toUpperCase() + provider.slice(1);
    }
  };

  const handleEditScore = (score: CreditScoreType) => {
    setScoreToEdit(score);
    setShowEditForm(true);
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setScoreToEdit(null);
  };

  const handleDeleteScore = (id: string) => {
    if (window.confirm('Are you sure you want to delete this credit score?')) {
      deleteCreditScore(id);
    }
  };

  const getCreditTier = (score: number) => {
    if (score >= 800) return { tier: 'Excellent', color: 'text-finance-green-400', min: 800, max: 850 };
    if (score >= 740) return { tier: 'Very Good', color: 'text-blue-400', min: 740, max: 799 };
    if (score >= 670) return { tier: 'Good', color: 'text-green-400', min: 670, max: 739 };
    if (score >= 580) return { tier: 'Fair', color: 'text-yellow-400', min: 580, max: 669 };
    return { tier: 'Poor', color: 'text-red-400', min: 300, max: 579 };
  };

  const getPointsToNextTier = (score: number) => {
    if (score >= 800) return 0; // Already at highest tier
    if (score >= 740) return 800 - score;
    if (score >= 670) return 740 - score;
    if (score >= 580) return 670 - score;
    return 580 - score;
  };

  // Calculate average score
  const averageScore = Object.values(latestScores).length > 0 
    ? Math.round(Object.values(latestScores).reduce((sum: number, score: any) => sum + score.score, 0) / Object.values(latestScores).length)
    : 0;

  // Prepare chart data
  const chartData = creditScores
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(score => ({
      date: new Date(score.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      score: score.score,
      provider: score.provider,
      fullDate: score.date
    }));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MdTrendingUp className="text-3xl text-finance-green-500" />
          <h1 className="text-3xl font-bold text-white">Credit Score Tracking</h1>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-finance-green-600 hover:bg-finance-green-700 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <MdAdd className="text-xl" />
          <span className="font-medium">Add Score</span>
        </button>
      </div>

      {averageScore > 0 && (
        <>
          {/* Main Score Display */}
          <div className="bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 border border-dark-700 rounded-2xl p-8 shadow-2xl">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              
              {/* Large Score Indicator */}
              <div className="xl:col-span-1 flex flex-col items-center justify-center">
                <div className="relative w-80 h-80">
                  <svg className="w-80 h-80 transform -rotate-90" viewBox="0 0 320 320">
                    {/* Outer glow ring */}
                    <circle 
                      cx="160" 
                      cy="160" 
                      r="140" 
                      fill="none" 
                      stroke="url(#glowGradient)" 
                      strokeWidth="4"
                      opacity="0.3"
                    />
                    {/* Background circle */}
                    <circle 
                      cx="160" 
                      cy="160" 
                      r="130" 
                      fill="none" 
                      stroke="#1e293b" 
                      strokeWidth="20"
                    />
                    {/* Progress circle */}
                    <circle 
                      cx="160" 
                      cy="160" 
                      r="130" 
                      fill="none" 
                      stroke="url(#scoreGradient)" 
                      strokeWidth="20"
                      strokeLinecap="round"
                      strokeDasharray={`${(averageScore - 300) / 550 * 816.8} 816.8`}
                      className="transition-all duration-2000 ease-out"
                      style={{
                        filter: 'drop-shadow(0 0 10px rgba(34, 197, 94, 0.5))'
                      }}
                    />
                    
                    {/* Gradient definitions */}
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="50%" stopColor="#16a34a" />
                        <stop offset="100%" stopColor="#15803d" />
                      </linearGradient>
                      <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#16a34a" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-center">
                      <div className="text-7xl font-bold text-white mb-2 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                        {averageScore}
                      </div>
                      <div className="text-lg text-dark-300 font-medium mb-4">Average Score</div>
                      <div className={`text-2xl font-bold ${getCreditTier(averageScore).color} px-4 py-2 rounded-full bg-dark-800/50 backdrop-blur-sm`}>
                        {getCreditTier(averageScore).tier}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Score Ranges and Info */}
              <div className="xl:col-span-1 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                    <MdInfoOutline className="text-finance-green-500" />
                    <span>Credit Score Ranges</span>
                  </h3>
                  <div className="space-y-3">
                    {[
                      { tier: 'Excellent', range: '800-850', color: 'bg-finance-green-500', textColor: 'text-finance-green-400' },
                      { tier: 'Very Good', range: '740-799', color: 'bg-blue-500', textColor: 'text-blue-400' },
                      { tier: 'Good', range: '670-739', color: 'bg-green-500', textColor: 'text-green-400' },
                      { tier: 'Fair', range: '580-669', color: 'bg-yellow-500', textColor: 'text-yellow-400' },
                      { tier: 'Poor', range: '300-579', color: 'bg-red-500', textColor: 'text-red-400' },
                    ].map((item) => {
                      const isCurrentTier = getCreditTier(averageScore).tier === item.tier;
                      return (
                        <div key={item.tier} className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                          isCurrentTier 
                            ? 'bg-finance-green-500/10 border-2 border-finance-green-500/30 shadow-lg' 
                            : 'bg-dark-800/50 border border-dark-600 hover:bg-dark-700/50'
                        }`}>
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${item.color} ${isCurrentTier ? 'animate-pulse' : ''}`}></div>
                            <span className={`font-semibold ${isCurrentTier ? 'text-white' : 'text-dark-200'}`}>
                              {item.tier}
                            </span>
                          </div>
                          <span className={`text-sm font-medium ${isCurrentTier ? item.textColor : 'text-dark-400'}`}>
                            {item.range}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {getPointsToNextTier(averageScore) > 0 && (
                  <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center space-x-2 mb-2">
                      <MdTrendingUp className="text-blue-400" />
                      <span className="text-blue-400 font-semibold">Next Tier Goal</span>
                    </div>
                    <p className="text-white">
                      <span className="text-2xl font-bold text-blue-400">{getPointsToNextTier(averageScore)}</span>
                      <span className="text-dark-300 ml-1">points to reach the next tier</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Latest Scores */}
              <div className="xl:col-span-1">
                <h3 className="text-xl font-bold text-white mb-4">Latest Scores</h3>
                <div className="space-y-3">
                  {Object.values(latestScores).map((score: any) => (
                    <div key={score.provider} className="bg-dark-800/50 border border-dark-600 rounded-xl p-4 hover:bg-dark-700/50 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-finance-green-400 font-semibold">
                          {getProviderName(score.provider)}
                        </h4>
                        <span className="text-3xl font-bold text-white">{score.score}</span>
                      </div>
                      <p className="text-dark-400 text-sm">
                        {new Date(score.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                      {score.notes && (
                        <p className="text-dark-300 text-sm mt-2 italic">{score.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Score History Chart */}
          {chartData.length > 1 && (
            <div className="bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 border border-dark-700 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <MdTrendingUp className="text-finance-green-500" />
                <span>Score History</span>
              </h2>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                    <XAxis 
                      dataKey="date" 
                      stroke="#94a3b8" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      domain={[300, 850]} 
                      stroke="#94a3b8" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #334155',
                        borderRadius: '12px',
                        color: '#ffffff'
                      }}
                      labelStyle={{ color: '#22c55e' }}
                    />
                    
                    {/* Reference lines for score ranges */}
                    <ReferenceLine y={800} stroke="#22c55e" strokeDasharray="2 2" opacity={0.5} />
                    <ReferenceLine y={740} stroke="#3b82f6" strokeDasharray="2 2" opacity={0.5} />
                    <ReferenceLine y={670} stroke="#10b981" strokeDasharray="2 2" opacity={0.5} />
                    <ReferenceLine y={580} stroke="#f59e0b" strokeDasharray="2 2" opacity={0.5} />
                    
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#22c55e" 
                      strokeWidth={3}
                      dot={{ 
                        fill: '#22c55e', 
                        strokeWidth: 2, 
                        stroke: '#ffffff',
                        r: 6 
                      }}
                      activeDot={{ 
                        r: 8, 
                        fill: '#22c55e',
                        stroke: '#ffffff',
                        strokeWidth: 2,
                        filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.6))'
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </>
      )}

      {Object.keys(latestScores).length === 0 && (
        <div className="text-center py-20">
          <div className="mx-auto w-32 h-32 bg-dark-800 rounded-full flex items-center justify-center mb-8">
            <MdTrendingUp className="text-6xl text-dark-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">No Credit Scores Yet</h3>
          <p className="text-dark-400 mb-8 max-w-md mx-auto">
            Start tracking your credit scores from Canadian providers like Credit Karma, Borrowell, and Equifax to monitor your financial health.
          </p>
          <button 
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 bg-finance-green-600 hover:bg-finance-green-700 text-white px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl mx-auto"
          >
            <MdAdd className="text-xl" />
            <span className="font-medium">Add Your First Score</span>
          </button>
        </div>
      )}

      {creditScores.length > 0 && (
        <div className="bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 border border-dark-700 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
            <MdTrendingUp className="text-finance-green-500" />
            <span>Recent Score Updates</span>
          </h2>
          <div className="space-y-4">
            {creditScores
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 10)
              .map((score) => (
                <div key={score.id} className="flex items-center justify-between p-6 bg-dark-800/50 border border-dark-600 rounded-xl group hover:bg-dark-700/50 transition-all">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-finance-green-600/20 rounded-full flex items-center justify-center">
                      <MdTrendingUp className="text-finance-green-400 text-xl" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg">{getProviderName(score.provider)}</p>
                      <p className="text-dark-300 text-sm">
                        {new Date(score.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-3xl font-bold text-white">{score.score}</p>
                      <p className={`text-sm font-medium ${getCreditTier(score.score).color}`}>
                        {getCreditTier(score.score).tier}
                      </p>
                    </div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button
                        onClick={() => handleEditScore(score)}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-all shadow-lg hover:shadow-xl"
                      >
                        <MdEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteScore(score.id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-all shadow-lg hover:shadow-xl"
                      >
                        <MdDelete className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {derogatoryMarks.length > 0 && (
        <div className="bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 border border-red-900/50 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
            <MdInfoOutline className="text-red-400" />
            <span>Derogatory Marks</span>
          </h2>
          <div className="space-y-4">
            {derogatoryMarks.map((mark) => (
              <div key={mark.id} className="flex items-center justify-between p-6 bg-red-900/10 border border-red-800/50 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center">
                    <MdInfoOutline className="text-red-400 text-xl" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">{mark.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                    <p className="text-red-300 text-sm font-medium">{mark.creditor}</p>
                    <p className="text-dark-300 text-sm">{mark.description}</p>
                  </div>
                </div>
                <span className="text-red-400 text-sm font-medium">
                  {new Date(mark.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal isOpen={showAddForm} onClose={() => setShowAddForm(false)} title="Add Credit Score">
        <AddCreditScoreForm onClose={() => setShowAddForm(false)} />
      </Modal>

      <Modal isOpen={showEditForm} onClose={handleCloseEditForm} title="Edit Credit Score">
        {scoreToEdit && (
          <EditCreditScoreForm score={scoreToEdit} onClose={handleCloseEditForm} />
        )}
      </Modal>
    </div>
  );
};

export default CreditScorePage;