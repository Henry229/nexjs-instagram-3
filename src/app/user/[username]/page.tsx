import { getUserForProfile } from '@/services/user';

type Props = {
  params: { username: string };
};

export default async function UserPage({ params: { username } }: Props) {
  const user = await getUserForProfile(username);
  return <div>UserPage</div>;
}
