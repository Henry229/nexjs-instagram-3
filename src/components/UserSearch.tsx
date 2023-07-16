'use client';

import { SearchUser } from '@/models/user';
import { FormEvent, useState } from 'react';
import useSWR from 'swr';
import GridSpinner from './ui/GridSpinner';
import UserCard from './UserCard';
import useDebounce from '@/hooks/debounce';

export default function UserSearch() {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword);
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<SearchUser[]>(`/api/search/${debouncedKeyword}`);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className='flex flex-col items-center w-full max-w-2xl mx-auto my-4'>
      <form className='w-full mb-4 ml-2' onSubmit={onSubmit}>
        <input
          className='w-full p-3 text-xl border border-gray-400 rounded-lg outline-none'
          type='text'
          autoFocus
          placeholder='Search for a Name of User'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
      {error && <p>Something must be wrong!!😵‍💫</p>}
      {isLoading && <GridSpinner />}
      {!isLoading && !error && users?.length === 0 && <p>No users found</p>}
      <ul className='w-full p-4'>
        {users &&
          users.map((user) => (
            <li key={user.username}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
}
