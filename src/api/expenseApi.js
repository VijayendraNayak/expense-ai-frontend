import axios from 'axios';

// Base URL for your Spring Boot backend
const API_BASE_URL = 'http://localhost:8061/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Expense API endpoints
export const expenseApi = {
  // Create a new expense
  createExpense: async (expenseData) => {
    try {
      const response = await apiClient.post('/expense', expenseData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to create expense',
      };
    }
  },

  // Get all expenses
  getAllExpenses: async () => {
    try {
      const response = await apiClient.get('/expense');
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to fetch expenses',
      };
    }
  },

  // Get expense by ID
  getExpenseById: async (id) => {
    try {
      const response = await apiClient.get(`/expense/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to fetch expense',
      };
    }
  },

  // Update expense
  updateExpense: async (id, expenseData) => {
    try {
      const response = await apiClient.put(`/expense/${id}`, expenseData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to update expense',
      };
    }
  },

  // Delete expense
  deleteExpense: async (id) => {
    try {
      const response = await apiClient.delete(`/expense/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to delete expense',
      };
    }
  },
};

export default apiClient;
