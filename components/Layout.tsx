import Head from 'next/head';
import { ReactNode } from 'react';
import Nav from './Nav';

export default function Layout({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <>
      <div className='layout'>
        <Head>
          <title>{title}</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <Nav></Nav>
        <main className='layout__content'>{children}</main>

        <footer className='layout__footer'>Фуутер</footer>
      </div>
    </>
  );
}
