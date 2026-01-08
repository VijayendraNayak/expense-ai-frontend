import { useState } from 'react';
import { IndianRupee, Tag, FileText, Calendar, Plus, CheckCircle, XCircle } from 'lucide-react';
import { expenseApi } from '../api/expenseApi';

const AddExpense = () => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
   });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Common expense categories
  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear message when user starts typing
    if (message.text) setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Validate form
    if (!formData.amount || !formData.category) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      setLoading(false);
      return;
    }

    // Prepare data for API
    const expenseData = {
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
    };

    // Call API
    const result = await expenseApi.createExpense(expenseData);

    if (result.success) {
      setMessage({ type: 'success', text: 'Expense added successfully! 🎉' });
      // Reset form
      setFormData({
        amount: '',
        category: '',
        description: '',
      });
    } else {
      setMessage({ type: 'error', text: result.error });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
            <Plus className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Add New Expense</h1>
          <p className="text-gray-600">Track your spending by adding a new expense</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount Field */}
            <div>
              <label htmlFor="amount" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <IndianRupee className="h-4 w-4 mr-1 text-purple-600" />
                Amount *
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-lg"
                required
              />
            </div>

            {/* Category Field */}
            <div>
              <label htmlFor="category" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Tag className="h-4 w-4 mr-1 text-purple-600" />
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-lg bg-white"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="description" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <FileText className="h-4 w-4 mr-1 text-purple-600" />
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Add notes about this expense (optional)"
                rows="3"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Success/Error Message */}
            {message.text && (
              <div
                className={`flex items-center p-4 rounded-lg ${
                  message.type === 'success'
                    ? 'bg-green-50 border-2 border-green-200'
                    : 'bg-red-50 border-2 border-red-200'
                }`}
              >
                {message.type === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 mr-3" />
                )}
                <span
                  className={`text-sm font-medium ${
                    message.type === 'success' ? 'text-green-800' : 'text-red-800'
                  }`}
                >
                  {message.text}
                </span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-purple-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Adding Expense...
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5 mr-2" />
                  Add Expense
                </>
              )}
            </button>
          </form>
        </div>

        {/* Helper Text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          * Required fields
        </p>
      </div>
    </div>
  );
};

export default AddExpense;
