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
      <div className='container'>
        <Head>
          <title>{title}</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <Nav></Nav>
        <main>{children}</main>

        <footer>Фуутер</footer>
      </div>

      <style jsx>{`
        .container {
          width: 1024px;
          margin: 0 auto;
          border: 1px solid #f3f3f3;
          min-height: 100vh;
          background-color: #ffffff;
        }

        main {
          padding: 1em;
          padding-bottom: 100px;
        }

        footer {
          position: fixed;
          bottom: 0;
          width: 1022px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          background-color: #f7f7f7;
          border-top: 1px solid #c5c5c5;
        }
      `}</style>
    </>
  );
}
