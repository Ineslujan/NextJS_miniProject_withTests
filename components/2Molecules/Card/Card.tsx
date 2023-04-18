import React from 'react';
import styles from '../../../styles/Components.module.scss';

// import Component
import OneLink from '../../1Atoms/OneLink/OneLink';
import Paragraph from '../../1Atoms/Paragraph/Paragraph';
import Title from '../../1Atoms/Title/Title';

interface CardType {
  title: string
  subTitle: string
  text: string
  limit: number
  infoLink: {
    name: string
    path: string
  }
}

export default function Card({
  title, subTitle, text, infoLink, limit,
}: CardType) {
  return (
    <article className={styles.card}>
      <Title text={title} level={2} />
      <Title text={subTitle} level={3} />
      <Paragraph text={text} limit={limit} />
      <OneLink infoLink={infoLink} />
    </article>
  );
}
