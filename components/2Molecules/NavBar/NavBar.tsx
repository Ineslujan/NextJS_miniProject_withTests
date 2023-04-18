import React from 'react';
import OneLink from '../../1Atoms/OneLink/OneLink';
import styles from '../../../styles/Components.module.scss';

export default function NavBar() {
  return (
    <nav className={styles.navBar}>
      <OneLink infoLink={{ name: 'Accueil', path: '' }} />
      <OneLink infoLink={{ name: 'Blog', path: 'blog' }} />
      <OneLink infoLink={{ name: 'Liste', path: 'users' }} />
    </nav>
  );
}
