import HeartIcon from './ui/icons/HeartIcon';
import BookmarkIcon from './ui/icons/BookmarkIcon';
import { parseDate } from '@/util/date';
import HeartFillIcon from './ui/icons/HeartFillIcon';
import ToggleButton from './ui/ToggleButton';
import BookmarkFillIcon from './ui/icons/BookmarkFillIcon';
import { Comment, SimplePost } from '@/models/post';
import usePosts from '@/hooks/posts';
import useMe from '@/hooks/me';
import CommentForm from './CommentForm';

type Props = {
  post: SimplePost;
  children?: React.ReactNode;
  // onComment: (comment: Comment) => void;
};

export default function ActionBar({ post, children }: Props) {
  const { id, likes, createdAt } = post;
  const { user, setBookmark } = useMe();
  const { setLike } = usePosts();

  const liked = user ? likes.includes(user.username) : false;
  const bookmarked = user?.bookmarks.includes(id) ?? false;

  const handleLike = (like: boolean) => {
    user && setLike(post, user.username, like);
  };

  const handleBookmark = (bookmark: boolean) => {
    user && setBookmark(id, bookmark);
  };

  // const handleComment = (comment: string) => {
  // user && onComment({ comment, username: user.username, image: user.image });
  // };

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
          onToggle={handleBookmark}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className='px-4 py-1'>
        {/* likes?.length ?? 0 likes가 있고 length가 있으면 쓰고 없으면 0 */}
        <p className='mb-2 text-sm font-bold'>
          {`${likes?.length ?? 0} ${likes?.length > 1 ? 'likes' : 'like'}`}
        </p>
        {children}
        <p className='my-2 text-xs uppercase text-neutral-500'>
          {parseDate(createdAt)}
        </p>
      </div>
      {/* <CommentForm onPostComment={handleComment} /> */}
    </>
  );
}
