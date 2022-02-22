import React, { useState, FormEvent, useContext } from 'react';
import Image from 'next/image';

import { GrPowerShutdown } from 'react-icons/gr';

import { Container } from '@/styles/components/Menu/styles';

import logoSvg from '@/assets/logo.svg';
import { AuthContext } from '@/hooks/authContext';

export function Menu() {
  const { logOUt } = useContext(AuthContext);

  return (
    <Container>
      <header>
        <Image src={logoSvg} width={170} height={90} />
        <GrPowerShutdown size={20} onClick={logOUt} style={{ cursor: 'pointer' }} />
      </header>
    </Container>
  )
}
