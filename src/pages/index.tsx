import React from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import app from '../../services/firebaseConfig';
import { browserLocalPersistence, getAuth, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import Image from 'next/image';

import logoSvg from '@/assets/logo.svg';
import { Flex, Button, Stack } from '@chakra-ui/react';
import { Input } from '@/components/Form/Input';

interface SignInFormData {
  email: string;
  password: string;
}

const schemaSignIn = Yup.object().shape({
  email: Yup.string().email('Digite um e-mail válido').required('E-mail obrigatório'),
  password: Yup.string().required('Senha obrigatória'),
})

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schemaSignIn)
  });

  const { errors } = formState;

  const signIn: SubmitHandler<SignInFormData | FieldValues> = async ({ email, password }, event) => {
    event?.preventDefault();

    const auth = getAuth(app);
    await signInWithEmailAndPassword(auth, email, password);

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
        onSubmit={handleSubmit(signIn)}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column">

        <Image src={logoSvg} width={70} height={60} />

        <Stack spacing="4" mt="4">
          <Input type="email" label="E-mail" error={errors?.email} {...register('email')} />
          <Input type="password" label="Senha" error={errors?.password} {...register('password')} />
        </Stack>

        <Button type="submit" mt="7" colorScheme="blue" size="lg" isLoading={formState.isSubmitting}>Entrar</Button>
      </Flex>

    </Flex>
  )
}
