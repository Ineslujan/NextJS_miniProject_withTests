import React from 'react';

import styles from '../../../styles/Components.module.scss';

interface PropsType {
  text: string
  limit: number
}

export default function Paragraph({ text, limit }: PropsType) {
  return (
    <p data-testid="paragraphtest" className={styles.paragraph}>{limit === 0 || limit >= text.length ? text : text.slice(0, limit).concat('...')}</p>
  );
}
