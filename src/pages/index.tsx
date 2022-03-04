import React, { FormEvent, useState } from 'react';
import app from '../../services/firebaseConfig';
import { browserLocalPersistence, getAuth, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';

import Image from 'next/image';

import logoSvg from '@/assets/logo.svg';
import { Flex, Button, Stack } from '@chakra-ui/react';
import { Input } from '@/components/Form/Input';

// import { Container, Form } from '@/styles/pages/Home/styles';

export default function SignIn() {
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
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">

      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        onSubmit={signIn}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column">

        <Image src={logoSvg} width={70} height={60} />

        <Stack spacing="4" mt="4">
          <Input name="email" type="email" label="E-mail" onChange={e => setEmail(e.currentTarget.value)} />
          <Input name="password" type="password" label="Senha" onChange={e => setPassword(e.currentTarget.value)} />
        </Stack>

        <Button type="submit" mt="7" colorScheme="blue" size="lg">Entrar</Button>
      </Flex>

    </Flex>
  )
}
