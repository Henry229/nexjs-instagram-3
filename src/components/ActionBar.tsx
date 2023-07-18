import HeartIcon from './ui/icons/HeartIcon';
import BookmarkIcon from './ui/icons/BookmarkIcon';
import { parseDate } from '@/util/date';
import { useState } from 'react';
import HeartFillIcon from './ui/icons/HeartFillIcon';
import ToggleButton from './ui/ToggleButton';
import BookmarkFillIcon from './ui/icons/BookmarkFillIcon';
import { SimplePost } from '@/models/post';
import { useSession } from 'next-auth/react';
import { useSWRConfig } from 'swr';

type Props = {
  post: SimplePost;
};

export default function ActionBar({ post }: Props) {
  const { id, likes, username, text, createdAt } = post;
  const { data: session } = useSession();
  const user = session?.user;

  const liked = user ? likes.includes(user.username) : false;
  console.log('>>>liked', liked);

  const [bookmarked, setBookmarked] = useState(false);
  const { mutate } = useSWRConfig();
  const handleLike = (like: boolean) => {
    fetch('api/likes', {
      method: 'PUT',
      body: JSON.stringify({ id, like }),
    }).then(() => mutate('/api/posts'));
    // like를 업데이트 했으면 SWR에게 전체 cache를 update해달라고 하는 것
  };
  return (
    <>
      <div className='flex justify-between px-4 my-2'>
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={setBookmarked}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className='px-4 py-1'>
        {/* likes?.length ?? 0 likes가 있고 length가 있으면 쓰고 없으면 0 */}
        <p className='mb-2 text-sm font-bold'>
          {`${likes?.length ?? 0} ${likes?.length > 1 ? 'likes' : 'like'}`}
        </p>
        {text && (
          <p>
            <span className='mr-1 font-bold'>{username}</span>
            {text}
          </p>
        )}
        <p className='my-2 text-xs uppercase text-neutral-500'>
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
}
