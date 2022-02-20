import React, { useState, FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import app from '../../../services/firebaseConfig';
import { getAuth, signOut } from 'firebase/auth';

import { GrPowerShutdown } from 'react-icons/gr';

import { Container } from '@/styles/components/Menu/styles';

import logoSvg from '@/assets/logo.svg';

export function Menu() {
  const router = useRouter();

  function logOut(e: FormEvent) {
    e.preventDefault();

    const auth = getAuth(app);
    signOut(auth);
    router.push('/');
  }

  return (
    <Container>
      <header>
        <Image src={logoSvg} width={170} height={90} />
        <GrPowerShutdown size={20} onClick={logOut} style={{ cursor: 'pointer' }} />
      </header>
    </Container>
  )
}
