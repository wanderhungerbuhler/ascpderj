import React, { FormEvent, useEffect, useState } from 'react';
import app from '../../services/firebaseConfig';
import { browserLocalPersistence, getAuth, onAuthStateChanged, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';

import Image from 'next/image';

import logoSvg from '@/assets/logo.svg';

import { Container, Form } from '@/styles/pages/Home/styles';
import { useRouter } from 'next/router';

interface User {
  uid: string;
}

export default function Home() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const auth = getAuth(app);

    const subscriber = onAuthStateChanged(auth, userInfo => {
      setUser(userInfo);
    });

    return subscriber;
  }, []);

  function signIn(e: FormEvent) {
    e.preventDefault();

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then(response => {
        console.log(response.user.email)
      })
    setPersistence(auth, browserLocalPersistence)
  }

  if (user) {
    router.push('/dashboard');
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
