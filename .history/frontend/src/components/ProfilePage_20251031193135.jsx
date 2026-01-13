// frontend/src/components/Updating code of ProfilePage.jsx
import React, { useState, useContext, useEffect } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { FiUser, FiMail, FiPhone, FiLock, FiSettings, FiLogOut } from 'react-icons/fi';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const { user, updateUser } = useContext(FinanceContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      const updatedUser = await updateUser(formData);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formData;
    
    if (newPassword && newPassword !== confirmPassword) {
      toast.error('New passwords do not match.');
      return;
    }
    
    if (!currentPassword && newPassword) {
      try {
        await updateUser({ password: newPassword });
        toast.success('Password changed successfully!');
        setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to change password');
      }
    } else {
      toast.error('Please enter your current password to change it.');
    }
  };

  const handleDeleteAccount = async () => {
    const deletePassword = 'password'; // You might want a confirmation modal here for better UX
    try {
      await deleteUser(deletePassword);
      toast.success('Account deleted successfully!');
      // After successful deletion, the user will be logged out automatically
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete account');
    }
  };

  // ... (rest of the component code remains the same)
};

return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white">Profile</h1>
              <button
                onClick={() => setActiveTab('settings')}
                className={`p-2 rounded-lg ${activeTab === 'settings'
                  ? 'bg-white bg-opacity-20'
                  : 'bg-transparent text-white'}`}
              >
                <FiSettings className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="p-6">
              <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-6 space-y-4 md:space-y-0">
                {/* Profile Picture */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1 flex items-center justify-center">
                    <FiUser className="h-12 w-12 text-white" />
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="absolute bottom-0 right-0 bg-indigo-600 p-1 rounded-full text-white hover:bg-indigo-700"
                  >
                    <FiEdit2 className="h-4 w-4" />
                  </button>
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white">{user?.name}</h2>
                  <p className="text-gray-400">{user?.email}</p>
                  <p className="text-gray-400">{user?.mobile || 'Not provided'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="p-6 space-y-6">

              {/* Personal Info */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-4">Personal Information</h3>

                {isEditing ? (
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Mobile Number</label>
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div className="flex justify-end space-x-2 mt-4">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-300">Name</span>
                      <span className="text-white">{user?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-300">Email</span>
                      <span className="text-white">{user?.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-300">Mobile</span>
                      <span className="text-white">{user?.mobile || 'Not provided'}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Security Settings */}
              <div className="bg-gray-700 rounded-lg p-4 border-t border-gray-600">
                <h3 className="text-lg font-medium text-white mb-4">Security</h3>
                <form onSubmit={handlePasswordChange} className="space-y-3">
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    placeholder="Current password"
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    placeholder="New password"
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm new password"
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Update Password
                  </button>
                </form>
              </div>

              {/* Danger Zone */}
              <div className="bg-gray-700 rounded-lg p-4 border-t border-gray-600">
                <h3 className="text-lg font-medium text-red-400 mb-2">Danger Zone</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  placeholder="Enter your password to confirm"
                  className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  onClick={handleDeleteAccount}
                  className="w-full mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
