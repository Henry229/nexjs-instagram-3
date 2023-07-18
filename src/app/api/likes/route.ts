import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { dislikePost, likePost } from '@/services/posts';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  // body를 풀어서 {id, like}로 했다
  const { id, like } = await req.json();

  if (!id || like === undefined) {
    return new Response('Bad Request', { status: 400 });
  }

  const request = like ? likePost : dislikePost;

  return request(id, user.id)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
