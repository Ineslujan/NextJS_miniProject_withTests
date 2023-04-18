import Link from 'next/link';
import React from 'react';
import styles from '../../../styles/Components.module.scss';

interface PropsType {
  infoLink: {
    name: string
    path: string
  }
}

export function assertNoSlashAtStart(str: string): asserts str is string {
  if (str.startsWith('/')) {
    throw new Error(`String must not start with a slash (/) => ${str}`);
  }
}

export default function OneLink({ infoLink }: PropsType) {
  assertNoSlashAtStart(infoLink.path);

  return (
    <Link className={styles.oneLink} href={infoLink.path !== '' ? `/${infoLink.path}` : '/'}>{infoLink.name}</Link>
  );
}
