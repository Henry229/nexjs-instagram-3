import useSWR from 'swr';

export default function FollowingBar() {
  const { data, isLoading, error } = useSWR('/api/hello');
  console.log(data);

  return <div>FollowingBar</div>;
}
