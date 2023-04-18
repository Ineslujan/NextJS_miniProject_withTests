import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import Title from '../components/1Atoms/Title/Title';
import Paragraph from '../components/1Atoms/Paragraph/Paragraph';
import Card from '../components/2Molecules/Card/Card';

function Home() {
  return (
    <>
      <Head> {/* toChange */}
        <title>Code.io</title>
        <meta name="description" content="Little exercise about the Udemy training" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Title level={1} text="Bienvenue sur Code.io" />
        <Paragraph text="Le blog communautaire des afficionados de développement web." limit={0} />
        <Card
          title="Lisez les articles"
          subTitle=""
          // subTitle="Maximisez votre culture web"
          limit={0}
          text="Chaque auteur tente de vous apporter le plus de valeur possible par article"
          infoLink={{ name: 'Visite le blog', path: 'blog' }}
        />
        <Card
          title="Faites un tour vers la liste des membres"
          subTitle="Faites-vous des amis"
          limit={0}
          text="Ajoutez, invitez et discutez avec les différents membres."
          infoLink={{ name: 'Découvre la liste des membres', path: 'users' }}
        />
      </main>
    </>
  );
}

export default Home;
