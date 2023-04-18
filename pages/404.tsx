import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';

export default function The404() {
  return (
    <>
      <Head> {/* toChange */}
        <title>404 - Code.io</title>
        <meta name="description" content="Wrong way in Code.io" />
      </Head>

      <main className={styles.main}>
        <div>
          The404
        </div>
      </main>
    </>
  );
}
