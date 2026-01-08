import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Calendar,
  DollarSign,
  BarChart3,
  PieChart,
  Receipt,
  IndianRupee
} from 'lucide-react';
import { expenseApi } from '../api/expenseApi';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalExpenses: 0,
    monthlyExpenses: 0,
    transactionCount: 0,
    topCategory: '',
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    const result = await expenseApi.getAllExpenses();
    
    if (result.success) {
      setExpenses(result.data);
      calculateStats(result.data);
    }
    setLoading(false);
  };

  const calculateStats = (expensesData) => {
    const total = expensesData.reduce((sum, exp) => sum + exp.amount, 0);
    
    // Calculate this month's expenses
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyTotal = expensesData
      .filter(exp => {
        const expDate = new Date(exp.date);
        return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear;
      })
      .reduce((sum, exp) => sum + exp.amount, 0);

    // Find top category
    const categoryTotals = {};
    expensesData.forEach(exp => {
      categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
    });
    const topCategory = Object.keys(categoryTotals).reduce((a, b) => 
      categoryTotals[a] > categoryTotals[b] ? a : b, ''
    );

    setStats({
      totalExpenses: total,
      monthlyExpenses: monthlyTotal,
      transactionCount: expensesData.length,
      topCategory: topCategory || 'N/A',
    });
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color, trend }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center ${trend === 'up' ? 'text-red-500' : 'text-green-500'}`}>
            {trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          </div>
        )}
      </div>
      <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-800 mb-1">{value}</p>
      {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
    </div>
  );

  const ExpenseItem = ({ expense }) => {
    const categoryColors = {
      'Food & Dining': 'bg-orange-100 text-orange-600',
      'Transportation': 'bg-blue-100 text-blue-600',
      'Shopping': 'bg-pink-100 text-pink-600',
      'Entertainment': 'bg-purple-100 text-purple-600',
      'Bills & Utilities': 'bg-yellow-100 text-yellow-600',
      'Healthcare': 'bg-red-100 text-red-600',
      'Education': 'bg-green-100 text-green-600',
      'Travel': 'bg-indigo-100 text-indigo-600',
      'Other': 'bg-gray-100 text-gray-600',
    };

    return (
      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-4">
          <div className={`p-2 rounded-lg ${categoryColors[expense.category] || 'bg-gray-100 text-gray-600'}`}>
            <Receipt className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-gray-800">{expense.category}</p>
            <p className="text-sm text-gray-500">{expense.description || 'No description'}</p>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(expense.date).toLocaleDateString('en-IN', { 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg text-red-600 flex items-center">
            <IndianRupee className="h-4 w-4" />
            {expense.amount.toFixed(2)}
          </p>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your expense overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Wallet}
            title="Total Expenses"
            value={`₹${stats.totalExpenses.toFixed(2)}`}
            subtitle="All time"
            color="bg-linear-to-br from-purple-500 to-purple-600"
            trend="up"
          />
          <StatCard
            icon={Calendar}
            title="This Month"
            value={`₹${stats.monthlyExpenses.toFixed(2)}`}
            subtitle={new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
            color="bg-linear-to-br from-blue-500 to-blue-600"
          />
          <StatCard
            icon={BarChart3}
            title="Transactions"
            value={stats.transactionCount}
            subtitle="Total count"
            color="bg-linear-to-br from-green-500 to-green-600"
          />
          <StatCard
            icon={PieChart}
            title="Top Category"
            value={stats.topCategory}
            subtitle="Highest spending"
            color="bg-linear-to-br from-orange-500 to-orange-600"
          />
        </div>

        {/* Recent Expenses */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Recent Expenses</h2>
            <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
              View All →
            </button>
          </div>

          {expenses.length === 0 ? (
            <div className="text-center py-12">
              <Receipt className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No expenses yet</p>
              <p className="text-gray-400 text-sm mt-2">Start tracking by adding your first expense</p>
            </div>
          ) : (
            <div className="space-y-3">
              {expenses.slice(0, 10).map((expense, index) => (
                <ExpenseItem key={expense.id || index} expense={expense} />
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white cursor-pointer hover:shadow-xl transition-shadow">
            <DollarSign className="h-8 w-8 mb-3" />
            <h3 className="font-bold text-lg mb-2">Add Expense</h3>
            <p className="text-purple-100 text-sm">Track a new transaction</p>
          </div>
          <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white cursor-pointer hover:shadow-xl transition-shadow">
            <BarChart3 className="h-8 w-8 mb-3" />
            <h3 className="font-bold text-lg mb-2">View Analytics</h3>
            <p className="text-blue-100 text-sm">Detailed insights & charts</p>
          </div>
          <div className="bg-linear-to-br from-green-500 to-green-600 rounded-xl p-6 text-white cursor-pointer hover:shadow-xl transition-shadow">
            <Calendar className="h-8 w-8 mb-3" />
            <h3 className="font-bold text-lg mb-2">Monthly Report</h3>
            <p className="text-green-100 text-sm">Download your summary</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
