'use client';

import { useState } from 'react';
import { Eye, EyeOff, Shield, Loader2 } from 'lucide-react';
import { AppLayout } from '@/components/layout/app-layout';
import { Header } from '@/components/layout/header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import axios from 'axios';

export default function SettingsPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdatePassword = async () => {
    setMessage(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }
    if (newPassword.length < 8) {
      setMessage({
        type: 'error',
        text: 'Password must be at least 8 characters',
      });
      return;
    }

    setIsLoading(true);
    try {
      await api.put('/settings/password', {
        currentPassword,
        newPassword,
      });
      setMessage({ type: 'success', text: 'Password updated successfully!' });
      handleCancel();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || 'Failed to update password';
        setMessage({ type: 'error', text: errorMessage });
      } else {
        setMessage({ type: 'error', text: 'An unexpected error occurred' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <AppLayout>
      <Header
        title="Settings"
        description="Manage your account and preferences"
        breadcrumbs={[{ label: 'Dashboard', href: '/' }, { label: 'Settings' }]}
      />

      <div className="max-w-xl">
        {/* Security Section */}
        <div className="rounded-2xl border border-neutral-200 bg-white">
          <div className="flex items-center gap-3 border-b border-neutral-100 px-6 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
              <Shield className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-neutral-900">
                Security
              </h2>
              <p className="text-xs text-neutral-500">Update your password</p>
            </div>
          </div>

          <div className="space-y-5 p-6">
            {/* Message */}
            {message && (
              <div
                className={`rounded-lg px-4 py-3 text-sm ${
                  message.type === 'success'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-red-50 text-red-600'
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Current Password */}
            <div className="space-y-2">
              <label
                htmlFor="currentPassword"
                className="text-sm font-medium text-neutral-700"
              >
                Current Password
              </label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="h-11 border-neutral-200 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label
                htmlFor="newPassword"
                className="text-sm font-medium text-neutral-700"
              >
                New Password
              </label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="h-11 border-neutral-200 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-neutral-500">
                Must be at least 8 characters
              </p>
            </div>

            {/* Confirm New Password */}
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-neutral-700"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="h-11 border-neutral-200 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button onClick={handleUpdatePassword} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
