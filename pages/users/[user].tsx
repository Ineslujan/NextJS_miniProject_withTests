import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import React from 'react';
import Paragraph from '../../components/1Atoms/Paragraph/Paragraph';
import Title from '../../components/1Atoms/Title/Title';
import getDatas from '../../data/requests';
import { UserType } from '../../interfaces/interfaces';

import styles from '../../styles/Home.module.scss';

export default function User({ currentData }: { currentData: UserType }) {
  return (
    <>
      <Head>
        <title>Code.io - {currentData.name}</title>
        <meta name="description" content={`Utilisateur : "${currentData.name}"`} />
      </Head>

      <main className={styles.main}>
        <Title
          text={currentData.name}
          level={1}
        />
        <Title
          text={`Username : ${currentData.username}`}
          level={2}
        />
        <table>
          <tbody>
            <tr>
              <td>
                <Paragraph
                  text={`Username : ${currentData.username}`}
                  limit={0}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Paragraph
                  text={`Email : ${currentData.email}`}
                  limit={0}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Paragraph
                  text={`Site Web : ${currentData.website}`}
                  limit={0}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Paragraph
                  text={`Téléphone : ${currentData.phone}`}
                  limit={0}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
}

// --- Version with the same request as getStaticPaths ---
// export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
//   const slug = context.params?.user;

//   const datas: UserType[] | null = await getDatas('users');

//   if (!datas || datas.length === 0 || !Array.isArray(datas)) {
//     return {
//       notFound: true,
//     };
//   }

//   const currentData = datas?.find((data: UserType) => data.id.toString() === slug);

//   return {
//     props: {
//       currentData,
//     },
//   };
// };

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const slug = context.params?.user;

  const datas: UserType[] | null = await getDatas('users', Number(slug));

  if (datas === null) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      currentData: datas,
    },
  };
};

export async function getStaticPaths() {
  const dataPath: UserType[] | null = await getDatas('users');

  const paths = dataPath?.map((path) => {
    const key = path.id.toString();
    return { params: { user: key } };
  });

  return {
    paths,
    fallback: false,
  };
}
