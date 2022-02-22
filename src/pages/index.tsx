import React, { FormEvent, useContext, useEffect, useState } from 'react';
import app from '../../services/firebaseConfig';
import { browserLocalPersistence, getAuth, onAuthStateChanged, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';

import Image from 'next/image';

import logoSvg from '@/assets/logo.svg';

import { Container, Form } from '@/styles/pages/Home/styles';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function signIn(e: FormEvent) {
    e.preventDefault();

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password);

    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password);
      }).catch((error) => {
        console.log(error.code, error.message);
      });

  }

  return (
    <Container>
      <Form onSubmit={signIn}>
        <Image src={logoSvg} width={200} height={100} />
        <input type="text" name="email" placeholder="Digite seu e-mail" onChange={(e) => setEmail(e.currentTarget.value)} />
        <input type="password" name="password" placeholder="Digite sua senha" onChange={(e) => setPassword(e.currentTarget.value)} />
        <button type="submit">Entrar</button>
      </Form>
    </Container>
  )
}
