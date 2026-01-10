import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Calendar, IndianRupee, AlertCircle } from 'lucide-react';
import { expenseApi } from '../api/expenseApi';

const Analytics = () => {
  const [categories, setCategories] = useState([]);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategorySummary();
  }, []);

  const fetchCategorySummary = async () => {
    setLoading(true);
    setError(null);
    const result = await expenseApi.getCategorySummary();
    
    if (result.success) {
      // Backend returns array of CategorySummaryDTO
      const data = Array.isArray(result.data) ? result.data : [];
      setCategories(data);
      
      // Calculate total from all categories' totalAmount
      const total = data.reduce((sum, cat) => sum + (cat.totalAmount || 0), 0);
      setMonthlyTotal(total);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Food & Dining': 'bg-orange-500',
      'Transportation': 'bg-blue-500',
      'Shopping': 'bg-pink-500',
      'Entertainment': 'bg-purple-500',
      'Bills & Utilities': 'bg-yellow-500',
      'Healthcare': 'bg-red-500',
      'Education': 'bg-green-500',
      'Travel': 'bg-indigo-500',
      'Other': 'bg-gray-500',
    };
    return colors[category] || 'bg-purple-500';
  };

  const getMaxAmount = () => {
    return Math.max(...categories.map(cat => cat.totalAmount || 0), 0);
  };

  const maxAmount = getMaxAmount();

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-full">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Analytics</h1>
          </div>
          <p className="text-gray-600 ml-15">Spending breakdown by category</p>
        </div>

        {/* Monthly Total Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 font-medium mb-2">Total Spent This Month</p>
              <h2 className="text-5xl font-bold text-gray-800 flex items-center">
                <IndianRupee className="h-10 w-10 text-purple-600 mr-2" />
                {monthlyTotal.toFixed(2)}
              </h2>
            </div>
            <div className="hidden md:flex items-center justify-center w-24 h-24 bg-purple-100 rounded-full">
              <TrendingUp className="h-12 w-12 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-8 flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        {/* Categories Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Spending by Category</h3>

          {categories.length === 0 ? (
            <div className="text-center py-12">
              <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No data available</p>
              <p className="text-gray-400 text-sm mt-2">Add expenses to see analytics</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Bar Chart */}
              <div className="space-y-4">
                {categories.map((categoryData, index) => {
                  const amount = categoryData.totalAmount || 0;
                  const percentage = maxAmount > 0 ? (amount / maxAmount) * 100 : 0;
                  const categoryName = categoryData.category || `Category ${index + 1}`;
                  const transactionCount = categoryData.count || 0;
                  const avgAmount = categoryData.averageAmount || 0;

                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-800">{categoryName}</p>
                          <p className="text-xs text-gray-500">{transactionCount} transactions · Avg: ₹{avgAmount.toFixed(2)}</p>
                        </div>
                        <p className="text-lg font-bold text-purple-600 flex items-center">
                          <IndianRupee className="h-4 w-4" />
                          {amount.toFixed(2)}
                        </p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full ${getCategoryColor(categoryName)} transition-all duration-500 ease-out`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-500">{percentage.toFixed(1)}% of highest</p>
                    </div>
                  );
                })}
              </div>

              {/* Summary Table */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="text-lg font-bold text-gray-800 mb-4">Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm font-medium mb-1">Total Categories</p>
                    <p className="text-3xl font-bold text-purple-600">{categories.length}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm font-medium mb-1">Highest Spending</p>
                    <p className="text-lg font-bold text-blue-600">
                      {categories.length > 0
                        ? categories.reduce((max, cat) => (cat.total || cat.amount || 0) > (max.total || max.amount || 0) ? cat : max).category || 'N/A'
                        : 'N/A'}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm font-medium mb-1">Average per Category</p>
                    <p className="text-lg font-bold text-green-600">
                      ₹{(monthlyTotal / (categories.length || 1)).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
