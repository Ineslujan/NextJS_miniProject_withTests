import React from 'react';
import styles from '../../../styles/Components.module.scss';

interface PropsType {
  text: string
  level: number
}

export default function Title({ text, level }: PropsType) {
  const CustomTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <CustomTag className={styles.title}>{text}</CustomTag>
  );
}
