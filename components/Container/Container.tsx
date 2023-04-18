import React from 'react';
import NavBar from '../2Molecules/NavBar/NavBar';

interface PropsType {
  children: React.ReactNode;
}

export default function Container({ children }: PropsType) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
