import { Link, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { 
  MdDashboard, 
  MdTrendingUp, 
  MdCreditCard, 
  MdAccountBalance, 
  MdAttachMoney,
  MdAccountBalanceWallet
} from 'react-icons/md';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: MdDashboard },
    { path: '/credit-score', label: 'Credit Score', icon: MdTrendingUp },
    { path: '/credit-cards', label: 'Credit Cards', icon: MdCreditCard },
    { path: '/bank-cards', label: 'Bank Cards', icon: MdAccountBalance },
    { path: '/debts', label: 'Debts', icon: MdAttachMoney },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="bg-dark-900 border-b border-dark-800 flex-shrink-0" style={{ WebkitAppRegion: 'drag' }}>
        <div className="px-6 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="bg-finance-green-600 rounded-full p-2">
                <MdAccountBalanceWallet className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">MoneyTracker</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav className="w-64 bg-dark-900 border-r border-dark-800 flex-shrink-0 overflow-y-auto">
          <div className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        location.pathname === item.path
                          ? 'bg-finance-green-600 text-white'
                          : 'text-dark-200 hover:bg-dark-800 hover:text-white'
                      }`}
                    >
                      <IconComponent className="text-xl" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-black">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;