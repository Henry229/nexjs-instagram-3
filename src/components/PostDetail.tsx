import { Comment, FullPost, SimplePost } from '@/models/post';
import Image from 'next/image';
import useSWR from 'swr';
import PostUserAvatar from './PostUserAvatar';
import ActionBar from './ActionBar';
import CommentForm from './CommentForm';
import Avatar from './Avatar';
import useFullPost from '@/hooks/post';
import useMe from '@/hooks/me';

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, userImage, username, image, createdAt, likes } = post;
  const { post: data, postComment } = useFullPost(id);
  // const { user } = useMe();
  const comments = data?.comments;
  // const handlePostComment = (comment: Comment) => {
  // postComment(comment);
  // postComment({ comment, username: user.username, image: user.image });
  // };

  return (
    <section className='flex w-full h-full'>
      {/* 너비는 지정하되 높이는 부모에 따라 달라지게 만들어줄꺼 그럴려면 fill */}
      <div className='relative basis-3/5'>
        <Image
          className='object-cover'
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          sizes='650px'
        />
      </div>
      <div className='flex flex-col w-full basis-2/5'>
        <PostUserAvatar image={userImage} username={username} />
        <ul className='h-full p-4 mb-1 overflow-y-auto border-t border-gray-200'>
          {comments &&
            comments.map(
              ({ image, username: commentUsername, comment }, index) => (
                <li key={index} className='flex items-center mb-1'>
                  <Avatar
                    image={image}
                    size='small'
                    highlight={commentUsername === username}
                  />
                  <div className='ml-2'>
                    <span className='mr-1 font-bold'>{commentUsername}</span>
                    <span>{comment}</span>
                  </div>
                </li>
              )
            )}
        </ul>
        <ActionBar post={post} onComment={postComment} />
        {/* <CommentForm onPostComment={handlePostComment} /> */}
      </div>
    </section>
  );
}
