import {
  GetServerSideProps, GetServerSidePropsContext,
} from 'next';
import Head from 'next/head';
import React from 'react';
import Paragraph from '../../components/1Atoms/Paragraph/Paragraph';
import Title from '../../components/1Atoms/Title/Title';
import getDatas from '../../data/requests';
import { PostType } from '../../interfaces/interfaces';

import styles from '../../styles/Home.module.scss';

export default function Article({ currentData }: { currentData: PostType }) {
  return (
    <>
      <Head>
        <title>Code.io - {currentData.title}</title>
        <meta name="description" content={`Article sur le sujet "${currentData.title}"`} />
      </Head>

      <main className={styles.main}>
        <Title
          text={currentData.title}
          level={1}
        />
        <Paragraph
          text={currentData.body}
          limit={0}
        />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const slug = context.params?.article;

  if (Number.isNaN(Number(slug))) {
    return {
      notFound: true,
    };
  }

  const data: PostType[] | null = await getDatas('posts', Number(slug));

  if (data === null) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      currentData: data,
    },
  };
};
