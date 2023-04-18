import React from 'react';
import Head from 'next/head';
import { v4 as uuidv4 } from 'uuid';
import { PostType } from '../../interfaces/interfaces';
import getDatas from '../../data/requests';
import Card from '../../components/2Molecules/Card/Card';
import Title from '../../components/1Atoms/Title/Title';
import Paragraph from '../../components/1Atoms/Paragraph/Paragraph';

import stylesBlog from '../../styles/Blog.module.scss';
import styles from '../../styles/Home.module.scss';

export default function Blog({ posts }: { posts: PostType[] }) {
  return (
    <>
      <Head>
        <title>Code.io - Blog</title>
        <meta name="description" content="Listes des articles du blog" />
      </Head>

      <main className={styles.main}>
        <Title text="Bienvenue sur le Blog" level={1} />
        <Paragraph text="Voici les articles" limit={0} />
        <section className={stylesBlog.blogSection}>
          {posts.map((post: PostType) => (
            <Card
              key={uuidv4()}
              title={post.title}
              subTitle=""
              text={post.body}
              limit={20}
              infoLink={{ name: 'Lire cet article', path: `blog/${post.id}` }}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const posts: PostType[] | null = await getDatas('posts');

  return {
    props: {
      posts,
    },
  };
}
