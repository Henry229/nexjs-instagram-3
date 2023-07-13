import { SimplePost } from '@/models/post';
import Avatar from './Avatar';
import Image from 'next/image';
import HeartIcon from './ui/icons/HeartIcon';
import BookmarkIcon from './ui/icons/BookmarkIcon';
import { parseDate } from '@/util/data';
import SmileIcon from './ui/icons/SmileIcon';

type Props = {
  post: SimplePost;
};

export default function PostListCard({ post }: Props) {
  const { userImage, username, image, likes, comments, text, createdAt } = post;
  return (
    <article className='border border-gray-200 rounded-lg shadow-md'>
      <div className='flex items-center p-2'>
        <Avatar image={userImage} size='medium' highlight />
        <span className='ml-2 font-bold text-gray-900'>{username}</span>
      </div>
      <Image
        className='object-cover w-full aspect-square'
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        // priority={priority}
        // onClick={() => setOpenModal(true)}
      />
      <div className='flex justify-between px-4 m-2'>
        <HeartIcon />
        <BookmarkIcon />
      </div>
      <div className='px-4 py-1'>
        {/* likes?.length ?? 0 likes가 있고 length가 있으면 쓰고 없으면 0 */}
        <p className='mb-2 text-sm font-bold'>
          {`${likes?.length ?? 0} ${likes?.length > 1 ? 'likes' : 'like'}`}{' '}
        </p>
        <p>
          <span className='mr-1 font-bold'>{username}</span>
          {text}
        </p>
        <p className='my-2 text-xs uppercase text-neutral-500'>
          {parseDate(createdAt)}
        </p>
        <form className='flex items-center border-t border-neutral-300'>
          <SmileIcon />
          <input
            className='w-full p-3 ml-2 border-none outline-none'
            type='text'
            placeholder='Add a comment...'
          />
          <button className='ml-2 font-bold text-sky-500'>Post</button>
        </form>
      </div>
    </article>
  );
}
