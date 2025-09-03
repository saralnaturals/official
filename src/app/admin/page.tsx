"use client";
/* eslint-disable no-console */

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n';
import { User, Trash2, Edit, Plus, DollarSign, Users } from 'lucide-react';

interface UserData {
  _id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'investor' | 'admin';
  isEmailVerified: boolean;
  createdAt: string;
}

interface InvestmentData {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  profitShare: number;
  investmentDate: string;
  status: 'active' | 'completed' | 'cancelled';
}

export default function AdminPage() {
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [users, setUsers] = useState<UserData[]>([]);
  const [investments, setInvestments] = useState<InvestmentData[]>([]);
  const [activeTab, setActiveTab] = useState<'users' | 'investments'>('users');
  const [loadingData, setLoadingData] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [showCreateUser, setShowCreateUser] = useState(false);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/');
      return;
    }
    if (user?.role === 'admin') {
      fetchData();
    }
  }, [user, loading, router]);

  const fetchData = async () => {
    setLoadingData(true);
    try {
      const [usersResponse, investmentsResponse] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/admin/investments')
      ]);

      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        setUsers(usersData.users || []);
      }

      if (investmentsResponse.ok) {
        const investmentsData = await investmentsResponse.json();
        setInvestments(investmentsData.investments || []);
      }
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers(users.filter(u => u._id !== userId));
      } else {
        alert('Failed to delete user');
      }
    } catch (error) {
      console.error('Delete user error:', error);
      alert('Failed to delete user');
    }
  };

  const updateInvestment = async (investmentId: string, updates: Partial<InvestmentData>) => {
    try {
      const response = await fetch(`/api/admin/investments/${investmentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        setInvestments(investments.map(inv => 
          inv._id === investmentId ? { ...inv, ...updates } : inv
        ));
      } else {
        alert('Failed to update investment');
      }
    } catch (error) {
      console.error('Update investment error:', error);
      alert('Failed to update investment');
    }
  };

  if (loading || !user) {
    return (
      <main className="min-h-screen bg-amber-50 dark:bg-neutral-900 flex items-center justify-center">
        <p className="text-amber-700 dark:text-neutral-400">Loading...</p>
      </main>
    );
  }

  if (user.role !== 'admin') {
    return (
      <main className="min-h-screen bg-amber-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">Access Denied</h1>
          <p className="text-amber-700 dark:text-neutral-400 mt-2">You don&apos;t have permission to access this page.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-amber-50 dark:bg-neutral-900 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-900 dark:text-neutral-100">Admin Panel</h1>
          <p className="text-amber-700 dark:text-neutral-400 mt-2">Manage users and investments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-amber-200 dark:border-neutral-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-700 dark:text-neutral-400">Total Users</p>
                <p className="text-2xl font-bold text-amber-900 dark:text-neutral-100">{users.length}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-amber-200 dark:border-neutral-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-700 dark:text-neutral-400">Total Investments</p>
                <p className="text-2xl font-bold text-amber-900 dark:text-neutral-100">{investments.length}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 border border-amber-200 dark:border-neutral-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-700 dark:text-neutral-400">Total Investment Amount</p>
                <p className="text-2xl font-bold text-amber-900 dark:text-neutral-100">
                  ₹{investments.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg border border-amber-200 dark:border-neutral-700">
          <div className="border-b border-amber-200 dark:border-neutral-700">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('users')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'users'
                    ? 'border-green-600 text-green-600 dark:text-green-400'
                    : 'border-transparent text-amber-700 dark:text-neutral-400 hover:text-amber-900 dark:hover:text-neutral-200'
                }`}
              >
                Users Management
              </button>
              <button
                onClick={() => setActiveTab('investments')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'investments'
                    ? 'border-green-600 text-green-600 dark:text-green-400'
                    : 'border-transparent text-amber-700 dark:text-neutral-400 hover:text-amber-900 dark:hover:text-neutral-200'
                }`}
              >
                Investments Management
              </button>
            </nav>
          </div>

          <div className="p-6">
            {loadingData ? (
              <div className="text-center py-8">
                <p className="text-amber-700 dark:text-neutral-400">Loading...</p>
              </div>
            ) : activeTab === 'users' ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-amber-900 dark:text-neutral-100">Users</h2>
                  <button
                    onClick={() => setShowCreateUser(true)}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    <Plus size={16} />
                    Create User
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[800px]">
                    <thead className="bg-amber-50 dark:bg-neutral-700">
                      <tr>
                        <th className="px-4 py-3 text-sm font-semibold">Name</th>
                        <th className="px-4 py-3 text-sm font-semibold">Email</th>
                        <th className="px-4 py-3 text-sm font-semibold">Phone</th>
                        <th className="px-4 py-3 text-sm font-semibold">Role</th>
                        <th className="px-4 py-3 text-sm font-semibold">Verified</th>
                        <th className="px-4 py-3 text-sm font-semibold">Created</th>
                        <th className="px-4 py-3 text-sm font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-200 dark:divide-neutral-700">
                      {users.map((userData) => (
                        <tr key={userData._id} className="bg-white dark:bg-neutral-800">
                          <td className="px-4 py-3 font-medium">{userData.name}</td>
                          <td className="px-4 py-3">{userData.email}</td>
                          <td className="px-4 py-3">{userData.phone || '-'}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              userData.role === 'admin' 
                                ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                                : 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                            }`}>
                              {userData.role}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              userData.isEmailVerified 
                                ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                                : 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
                            }`}>
                              {userData.isEmailVerified ? 'Verified' : 'Pending'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {new Date(userData.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setEditingUser(userData)}
                                className="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                                title="Edit user"
                              >
                                <Edit size={16} />
                              </button>
                              {userData.email !== user.email && (
                                <button
                                  onClick={() => deleteUser(userData._id)}
                                  className="p-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                                  title="Delete user"
                                >
                                  <Trash2 size={16} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-amber-900 dark:text-neutral-100">Investments</h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[900px]">
                    <thead className="bg-amber-50 dark:bg-neutral-700">
                      <tr>
                        <th className="px-4 py-3 text-sm font-semibold">Investor</th>
                        <th className="px-4 py-3 text-sm font-semibold">Email</th>
                        <th className="px-4 py-3 text-sm font-semibold">Amount</th>
                        <th className="px-4 py-3 text-sm font-semibold">Profit Share</th>
                        <th className="px-4 py-3 text-sm font-semibold">Date</th>
                        <th className="px-4 py-3 text-sm font-semibold">Status</th>
                        <th className="px-4 py-3 text-sm font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-200 dark:divide-neutral-700">
                      {investments.map((investment: InvestmentData) => (
                        <tr key={investment._id} className="bg-white dark:bg-neutral-800">
                          <td className="px-4 py-3 font-medium">{investment.userName}</td>
                          <td className="px-4 py-3">{investment.userEmail}</td>
                          <td className="px-4 py-3">₹{investment.amount.toLocaleString()}</td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              step="0.01"
                              value={investment.profitShare}
                              onChange={(e) => updateInvestment(investment._id, { profitShare: parseFloat(e.target.value) })}
                              className="w-20 px-2 py-1 border border-amber-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-sm"
                            />
                            %
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {new Date(investment.investmentDate).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">
                            <select
                              value={investment.status}
                              onChange={(e) => updateInvestment(investment._id, { status: e.target.value as any })}
                              className="px-2 py-1 border border-amber-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-700 text-sm"
                            >
                              <option value="active">Active</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => {/* TODO: Add investment details modal */}}
                              className="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                              title="View details"
                            >
                              <Edit size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create User Modal */}
      {showCreateUser && (
        <CreateUserModal 
          onClose={() => setShowCreateUser(false)} 
          onSuccess={() => {
            setShowCreateUser(false);
            fetchData();
          }}
        />
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <EditUserModal 
          user={editingUser}
          onClose={() => setEditingUser(null)} 
          onSuccess={() => {
            setEditingUser(null);
            fetchData();
          }}
        />
      )}
    </main>
  );
}

function CreateUserModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    role: 'investor' as 'investor' | 'admin',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSuccess();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to create user');
      }
    } catch (error) {
      console.error('Create user error:', error);
      alert('Failed to create user');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 w-full max-w-md border border-amber-200 dark:border-neutral-700">
        <h2 className="text-xl font-semibold text-amber-900 dark:text-neutral-100 mb-4">Create New User</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-amber-900 dark:text-neutral-200 mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-amber-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-amber-900 dark:text-neutral-200 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-amber-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-amber-900 dark:text-neutral-200 mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 border border-amber-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-amber-900 dark:text-neutral-200 mb-1">Phone (Optional)</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-amber-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-amber-900 dark:text-neutral-200 mb-1">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as 'investor' | 'admin' })}
              className="w-full px-3 py-2 border border-amber-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700"
            >
              <option value="investor">Investor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-amber-300 dark:border-neutral-600 rounded-md text-amber-900 dark:text-neutral-200 hover:bg-amber-50 dark:hover:bg-neutral-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-4 py-2 rounded-md transition-colors"
            >
              {isSubmitting ? 'Creating...' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EditUserModal({ user: userData, onClose, onSuccess }: { user: UserData; onClose: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    name: userData.name,
    phone: userData.phone || '',
    role: userData.role,
    isEmailVerified: userData.isEmailVerified,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/admin/users/${userData._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSuccess();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to update user');
      }
    } catch (error) {
      console.error('Update user error:', error);
      alert('Failed to update user');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 w-full max-w-md border border-amber-200 dark:border-neutral-700">
        <h2 className="text-xl font-semibold text-amber-900 dark:text-neutral-100 mb-4">Edit User</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-amber-900 dark:text-neutral-200 mb-1">Email</label>
            <input
              type="email"
              value={userData.email}
              disabled
              className="w-full px-3 py-2 border border-amber-300 dark:border-neutral-600 rounded-md bg-amber-100 dark:bg-neutral-700"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-amber-900 dark:text-neutral-200 mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-amber-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-amber-900 dark:text-neutral-200 mb-1">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-amber-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-amber-900 dark:text-neutral-200 mb-1">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as 'investor' | 'admin' })}
              className="w-full px-3 py-2 border border-amber-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700"
            >
              <option value="investor">Investor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isEmailVerified}
                onChange={(e) => setFormData({ ...formData, isEmailVerified: e.target.checked })}
                className="rounded border-amber-300 dark:border-neutral-600"
              />
              <span className="text-sm text-amber-900 dark:text-neutral-200">Email Verified</span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-amber-300 dark:border-neutral-600 rounded-md text-amber-900 dark:text-neutral-200 hover:bg-amber-50 dark:hover:bg-neutral-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-4 py-2 rounded-md transition-colors"
            >
              {isSubmitting ? 'Updating...' : 'Update User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
