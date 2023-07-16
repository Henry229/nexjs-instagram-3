import { AuthUser } from '@/models/user';

declare module 'next-auth' {
  interface Session {
    user: AuthUser;
  }
}
