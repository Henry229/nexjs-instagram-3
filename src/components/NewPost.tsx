'use client';

import { AuthUser } from '@/models/user';
import PostUserAvatar from './PostUserAvatar';
import FilesIcon from './ui/icons/FilesIcon';
import Button from './ui/Button';
import { ChangeEvent, DragEvent, FormEvent, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import GridSpinner from './ui/GridSpinner';

type Props = {
  user: AuthUser;
};

export default function NewPost({ user: { username, image } }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };
  const handleDrag = (e: DragEvent) => {
    if (e.type === 'dragenter') {
      setDragging(true);
    } else if (e.type === 'dragleave') {
      setDragging(false);
    }
  };
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    // useRef를 사용치 하고 onChange 이벤트를 텍스트를 받을 경우 Rerendering이 발생하여 화면의 깜빡임이 발생한다.
    // 이를 방지하기 위해 useRef를 사용한다. 이 textRef를 textArea에 ref로 이것과 연결한다.
    formData.append('text', textRef.current?.value ?? '');

    fetch('/api/posts', { method: 'POST', body: formData }) //
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        // api로 db에 insert가 제대로 이뤄졌다면 홈 경로로 이동한다.
        router.push('/');
      })
      .catch((err) => setError(err.toString()))
      .finally(() => setLoading(false));
  };
  return (
    <section className='flex flex-col items-center w-full max-w-xl mt-6'>
      {loading && (
        <div className='absolute inset-0 z-20 text-center pt-[30%] bg-sky-500/20'>
          <GridSpinner />
        </div>
      )}
      {error && (
        <p className='w-full p-4 mb-4 font-bold text-center text-red-600 bg-red-100'>
          {error}
        </p>
      )}
      <PostUserAvatar username={username} image={image ?? ''} />
      <form className='flex flex-col w-full mt-2' onSubmit={handleSubmit}>
        {/* accept=image/*의 의미는 어떤 확장자의 image는 다 받는다. */}
        {/* className=hidden은 input창을 안보이게 한다는 것 */}
        <input
          className='hidden'
          type='file'
          name='input'
          id='input-upload'
          accept='image/*'
          onChange={handleChange}
        />
        <label
          className={`w-full h-60 flex flex-col items-center justify-center ${
            !file && 'border-2 border-sky-500 border-dashed'
          }`}
          htmlFor='input-upload'
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && (
            <div className='absolute inset-0 z-10 pointer-events-none bg-sky-500/20'></div>
          )}
          {!file && (
            <div className='flex flex-col items-center pointer-events-none'>
              <FilesIcon />
              <p>Drag and Drop your image here or click</p>
            </div>
          )}
          {file && (
            <div className='relative w-full aspect-square'>
              <Image
                className='object-cover'
                src={URL.createObjectURL(file)}
                alt='local file'
                fill
                sizes='650px'
              />
            </div>
          )}
        </label>
        <textarea
          className='text-lg border-2 outline-none border-neutral-300'
          name='text'
          id='input-text'
          required
          rows={10}
          placeholder={'Write a caption...'}
          ref={textRef}
        />
        <Button text='Publish' onClick={() => {}} />
      </form>
    </section>
  );
}
