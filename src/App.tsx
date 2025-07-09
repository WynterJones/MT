import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppDataProvider } from './hooks/useAppData';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CreditScorePage from './pages/CreditScore';
import CreditCards from './pages/CreditCards';
import BankCards from './pages/BankCards';
import Debts from './pages/Debts';

function App() {
  return (
    <AppDataProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/credit-score" element={<CreditScorePage />} />
            <Route path="/credit-cards" element={<CreditCards />} />
            <Route path="/bank-cards" element={<BankCards />} />
            <Route path="/debts" element={<Debts />} />
          </Routes>
        </Layout>
      </Router>
    </AppDataProvider>
  );
}

export default App;