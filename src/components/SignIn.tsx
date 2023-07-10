'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';
import ColorButton from './ui/ColorButton';

type Props = {
  providers: Record<string, ClientSafeProvider>;
};

export default function SignIn({ providers }: Props) {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => (
        <ColorButton
          key={id}
          text={`Sign with ${name}`}
          onClick={() => signIn(id)}
          // size='big'
        />
      ))}
    </>
  );
}
