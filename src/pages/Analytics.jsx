import { BarChart3, PieChart, TrendingUp, Calendar } from 'lucide-react';

const Analytics = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Analytics</h1>
          <p className="text-gray-600">Detailed insights and spending patterns</p>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-purple-50 p-6 rounded-xl">
                <PieChart className="h-10 w-10 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Pie Charts</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl">
                <BarChart3 className="h-10 w-10 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Bar Graphs</p>
              </div>
              <div className="bg-green-50 p-6 rounded-xl">
                <TrendingUp className="h-10 w-10 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Trends</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-xl">
                <Calendar className="h-10 w-10 text-orange-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Reports</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Coming Soon!</h2>
            <p className="text-gray-600 mb-6">
              We're working on advanced analytics features including category breakdowns,
              spending trends, monthly comparisons, and custom reports.
            </p>
            
            <div className="inline-flex items-center space-x-2 text-purple-600">
              <div className="animate-pulse w-2 h-2 bg-purple-600 rounded-full"></div>
              <span className="text-sm font-medium">In Development</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
