import { User } from '@/models/user';

declare module 'next-auth' {
  interface Session {
    user: User;
  }
}
