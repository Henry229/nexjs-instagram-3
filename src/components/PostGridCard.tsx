import { SimplePost } from '@/models/post';
import Image from 'next/image';
import { useState } from 'react';
import ModalPortal from './ui/ModalPortal';
import PostModal from './PostModal';
import PostDetail from './PostDetail';
import { signIn, useSession } from 'next-auth/react';

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostGridCard({ post, priority = false }: Props) {
  const { userImage, username, image, likes, comments, text, createdAt } = post;
  const [openModal, setOpenModal] = useState(false);
  const { data: session } = useSession();
  const handleOpenPost = () => {
    if (!session?.user) {
      // 여기는 client component니까 redirect는 사용할 수 없고 useRoute나 nextjs에서 제공하는 signIn 을 사용한다.
      return signIn();
    }
    setOpenModal(true);
  };
  return (
    <div className='relative w-full aspect-square'>
      <Image
        className='object-cover'
        src={image}
        alt={`photo by ${username}`}
        fill
        sizes='650px'
        priority={priority}
        onClick={handleOpenPost}
      />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </div>
  );
}
