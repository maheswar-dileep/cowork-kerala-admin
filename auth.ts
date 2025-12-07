import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import axios from 'axios';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8091/api/v1';

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          try {
            // Use direct axios call without session interceptor
            const res = await axios.post(`${API_BASE_URL}/auth/login`, {
              email,
              password,
            });
            const data = res.data;

            if (data.success) {
              // Return user object expected by NextAuth
              return {
                id: data.user.id,
                email: data.user.email,
                name: data.user.name,
                role: data.user.role,
                token: data.token,
              };
            }
          } catch (error) {
            console.error('Login error:', error);
            if (axios.isAxiosError(error)) {
              console.error('Auth API error:', error.response?.data);
            }
          }
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
