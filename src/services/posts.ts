import { SimplePost } from '@/models/post';
import { client, urlFor } from './sanity';

// "username": author->username,
//post.author.username 을 post.username으로 간략하게 변경하는것
//아래를 projection이라고 한다.
const simplePostProjection = `
...,
"username": author->username,
"userImage": author->image,
"image": photo,
"likes": likes[]->username,
"text": comments[0].comment,
"comments": count(comments),
"id":_id,
"createdAt":_createdAt,
`;

export async function getFollowingPostsOf(username: string) {
  // author schema in Sanity를 보면 author에서 username을 ref하고 있다.
  // 로그인한 사용자의 포스트를 가져온다. 첫번째 쿼리
  //2번째 쿼리는 조인쿼리로 user와 username이 같은 걸 조인해서 following 배열의 username을 가져온다
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}"
    || author._ref in *[_type == "user" && username == "${username}"].following[]._ref] 
    | order(_createdAt desc){${simplePostProjection}}`
    )
    .then((posts) =>
      posts.map((post: SimplePost) => ({ ...post, image: urlFor(post.image) }))
    );
}
