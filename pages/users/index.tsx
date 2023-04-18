import React from 'react';
import Head from 'next/head';
import { v4 as uuidv4 } from 'uuid';
import { UserType } from '../../interfaces/interfaces';
import getDatas from '../../data/requests';
import Card from '../../components/2Molecules/Card/Card';
import Title from '../../components/1Atoms/Title/Title';

import stylesUser from '../../styles/Users.module.scss';
import styles from '../../styles/Home.module.scss';

export default function Users({ users }: { users: UserType[] }) {
  return (
    <>
      <Head>
        <title>Code.io - Utilisateurs</title>
        <meta name="description" content="Listes des utilisateurs du blog" />
      </Head>

      <main className={styles.main}>
        <Title text="La liste des utilisateurs" level={1} />
        <section className={stylesUser.usersSection}>
          {users.map((user: UserType) => (
            <Card
              key={uuidv4()}
              title={user.username}
              subTitle=""
              text=""
              limit={0}
              infoLink={{ name: 'Contacter', path: `users/${user.id}` }}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const users: UserType[] | null = await getDatas('users');

  return {
    props: {
      users,
    },
  };
}
