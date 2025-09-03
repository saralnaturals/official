"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLanguage } from '@/lib/i18n';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const { t } = useLanguage();
  const { login, user } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
  });

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      router.push('/investments');
    }
  }, [user, router]);

  const onSubmit = async (values: LoginFormValues) => {
    const result = await login(values.email, values.password);
    
    if (result.success) {
      router.push('/investments');
    } else {
      setError('root', { message: result.error || 'Login failed' });
    }
  };

  const RegisterForm = () => {
    const registerSchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
      name: z.string().min(2),
      phone: z.string().optional(),
    });

    type RegisterFormValues = z.infer<typeof registerSchema>;

    const { register: registerUser } = useAuth();
    const [showRegPassword, setShowRegPassword] = useState(false);

    const {
      register: registerField,
      handleSubmit: handleRegSubmit,
      formState: { errors: regErrors, isSubmitting: isRegSubmitting },
      setError: setRegError,
    } = useForm<RegisterFormValues>({
      resolver: zodResolver(registerSchema),
    });

    const onRegSubmit = async (values: RegisterFormValues) => {
      const result = await registerUser(values.email, values.password, values.name, values.phone);
      
      if (result.success) {
        router.push('/investments');
      } else {
        setRegError('root', { message: result.error || 'Registration failed' });
      }
    };

    return (
      <form onSubmit={handleRegSubmit(onRegSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-amber-900 dark:text-neutral-200 mb-1">
            {t('contact.name')}
          </label>
          <input
            {...registerField('name')}
            className="w-full px-3 py-2 border border-amber-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 text-amber-900 dark:text-neutral-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter your full name"
          />
          {regErrors.name && (
            <p className="text-red-500 text-sm mt-1">{regErrors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-900 dark:text-neutral-200 mb-1">
            {t('contact.email')}
          </label>
          <input
            {...registerField('email')}
            type="email"
            className="w-full px-3 py-2 border border-amber-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 text-amber-900 dark:text-neutral-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter your email"
          />
          {regErrors.email && (
            <p className="text-red-500 text-sm mt-1">{regErrors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-900 dark:text-neutral-200 mb-1">
            {t('contact.phone')} (Optional)
          </label>
          <input
            {...registerField('phone')}
            type="tel"
            className="w-full px-3 py-2 border border-amber-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 text-amber-900 dark:text-neutral-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter your phone number"
          />
          {regErrors.phone && (
            <p className="text-red-500 text-sm mt-1">{regErrors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-900 dark:text-neutral-200 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              {...registerField('password')}
              type={showRegPassword ? 'text' : 'password'}
              className="w-full px-3 py-2 pr-10 border border-amber-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 text-amber-900 dark:text-neutral-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowRegPassword(!showRegPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-amber-600 dark:text-neutral-400 hover:text-amber-800 dark:hover:text-neutral-200"
            >
              {showRegPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {regErrors.password && (
            <p className="text-red-500 text-sm mt-1">{regErrors.password.message}</p>
          )}
        </div>

        {regErrors.root && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
            <p className="text-red-700 dark:text-red-300 text-sm">{regErrors.root.message}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isRegSubmitting}
          className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          {isRegSubmitting ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    );
  };

  if (user) {
    return null; // Will redirect
  }

  return (
    <main className="min-h-screen bg-amber-50 dark:bg-neutral-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-amber-900 dark:text-neutral-100">
            {isRegistering ? t('auth.createAccount') : t('auth.welcome')}
          </h1>
          <p className="mt-2 text-amber-700 dark:text-neutral-400">
            {isRegistering 
              ? 'Join Saral Naturals investment community'
              : 'Sign in to your investment account'
            }
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-800 shadow-lg rounded-lg p-8 border border-amber-200 dark:border-neutral-700">
          {!isRegistering ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-amber-900 dark:text-neutral-200 mb-1">
                  {t('contact.email')}
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-3 py-2 border border-amber-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 text-amber-900 dark:text-neutral-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-900 dark:text-neutral-200 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full px-3 py-2 pr-10 border border-amber-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 text-amber-900 dark:text-neutral-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-amber-600 dark:text-neutral-400 hover:text-amber-800 dark:hover:text-neutral-200"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <Link
                  href="/forgot-password"
                  className="text-sm text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300"
                >
                  Forgot your password?
                </Link>
              </div>

              {errors.root && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
                  <p className="text-red-700 dark:text-red-300 text-sm">{errors.root.message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          ) : (
            <RegisterForm />
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-amber-700 dark:text-neutral-400">
              {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 font-medium"
              >
                {isRegistering ? 'Sign In' : 'Create Account'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}