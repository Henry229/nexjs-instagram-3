import Navbar from '@/components/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import AuthContext from '@/contexts/AuthContext';
import SWRConfigContext from '@/contexts/SWRConfigContext';

const openSan = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Instagram',
    template: 'Instagram | %s',
  },
  description: 'Instagram Photos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={openSan.className}>
      <body className='w-full overflow-auto bg-gray-50'>
        <AuthContext>
          <header className='sticky top-0 z-10 bg-white border-b'>
            <div className='max-w-screen-xl mx-auto'>
              <Navbar />
            </div>
          </header>
          <main className='flex justify-center w-full max-w-screen-xl mx-auto'>
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
        <div id='portal' />
      </body>
    </html>
  );
}
