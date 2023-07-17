import { searchUsers } from '@/services/user';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return searchUsers().then((data) => NextResponse.json(data));
}
