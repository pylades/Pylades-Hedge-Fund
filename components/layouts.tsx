import React, { ReactNode } from 'react';
import Head from 'next/head';
import { Navbar } from '.';

interface IPageLayout {
  title?: string;
  className?: string;
}

const Page: React.FC<IPageLayout> = ({ children, className, title = '/' }) => (
  <div className='px-6 max-w-xl mx-auto container '>
    <Head>
      <title>BlackPool Finance - {title}</title>
      <link rel='icon' href='/favicon.ico' />
      <meta
        name='description'
        content='BlackPool is the first decentralised autonomous organisation (DAO) built solely for NFT gaming and trading. We combine professional data analytics and machine learning in order to provide the best returns for our users.'
      />
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta name='og:title' content={title} />
      <meta property='og:type' content='website' />
      <link rel='preconnect' href='https://fonts.gstatic.com' />
      <link
        href='https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;400;700&display=swap'
        rel='stylesheet'
      />
    </Head>
    <header>
      <Navbar />
    </header>
    <main className={className}>{children}</main>
    <footer className='border-b border-dashed mt-6 mb-6 md:mb-0' />
  </div>
);

export { Page };
