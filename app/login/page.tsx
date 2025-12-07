'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Building2, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { loginSchema, type LoginFormData } from '@/lib/validations/auth';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string>('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoginError('');

      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setLoginError('Invalid email or password');
        return;
      }

      if (result?.ok) {
        router.push('/');
        router.refresh();
      }
    } catch {
      setLoginError('An unexpected error occurred');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Branding */}
      <div className="hidden w-1/2 bg-emerald-600 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">CoWork</span>
        </div>

        <div>
          <h1 className="text-4xl font-bold leading-tight text-white">
            Manage your
            <br />
            coworking spaces
            <br />
            with ease
          </h1>
          <p className="mt-4 text-lg text-emerald-100">
            The complete admin solution for coworking space management in Kerala
          </p>
        </div>

        <p className="text-sm text-emerald-200">
          © 2025 CoWork Kerala. All rights reserved.
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full items-center justify-center bg-white px-6 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-neutral-900">CoWork</span>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Welcome back
            </h2>
            <p className="mt-2 text-neutral-500">
              Sign in to access the admin dashboard
            </p>
          </div>

          {/* Error Message */}
          {loginError && (
            <div className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {loginError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-neutral-700"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register('email')}
                className={`h-11 border-neutral-200 ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-neutral-700"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password')}
                  className={`h-11 border-neutral-200 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="h-11 w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Footer Link */}
          <p className="mt-8 text-center text-sm text-neutral-500">
            <a
              href="#"
              className="text-emerald-600 hover:text-emerald-700 hover:underline"
            >
              Forgot your password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
