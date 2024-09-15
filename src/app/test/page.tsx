'use client'

import Head from 'next/head';

const IconTest = () => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Icon Test</title>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@latest/fonts/remixicon.css"
          rel="stylesheet"
        />
      </Head>
      <div>
        <i className="ri-record-mail-line" style={{ fontSize: '24px', color: 'black' }}></i>
        <i className="ri-close-circle-line" style={{ fontSize: '24px', color: 'black' }}></i>
      </div>
    </>
  );
};

export default IconTest;

