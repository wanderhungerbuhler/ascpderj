import React from 'react';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { Input } from '@/components/Form/Input';
import { Header } from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { addDoc, collection, doc, getFirestore, serverTimestamp } from 'firebase/firestore';
import app from '@/../services/firebaseConfig';
import { RiSave2Fill } from 'react-icons/ri';

interface OrderProps {
  id: string;
  idFuncional: string;
  nomeServidor: string;

  valorVencimento?: string;
  dataInicial?: string;
  dataFinal?: string;
}

const schemaRegister = Yup.object().shape({
  valorVencimento: Yup.string().required('Preencher campo vazio'),
  dataInicial: Yup.string().required('Preencher campo vazio'),
  dataFinal: Yup.string().required('Preencher campo vazio'),
});

export default function CadastrarVencimentos(data: OrderProps) {
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(schemaRegister)
  });

  const { errors } = formState;

  const handleSubmitRegister: SubmitHandler<OrderProps | FieldValues> = async (form, event) => {
    event?.preventDefault();

    const db = getFirestore(app);

    await addDoc(collection(db, "history_salary"), {
      idFuncional: form?.idFuncional,
      valorVencimento: form?.valorVencimento,
      dataInicial: form?.dataInicial,
      dataFinal: form?.dataFinal,
      updated_at: serverTimestamp(),
    });

    alert('Cadastrado com sucesso!');
    reset();
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1280} mx="auto" px="6">
        <Sidebar />

        <Box w="100%" borderRadius="8" bg="gray.800" p="8" ml="12">

          <Heading w="100%" mt="7" mb="7">Cadastro de Vencimentos</Heading>

          <Box as="form" w="70%" display="flex" flexWrap="wrap" justifyContent="space-between"
            onSubmit={handleSubmit(handleSubmitRegister)} >
            <Input
              w="90%"
              label="ID Funcional"
              placeholder="ID Funcional do Servidor"
              error={errors?.valorVencimento}
              {...register('idFuncional')}
            />

            <Input
              w="90%"
              label="Valor do Vencimento (R$)"
              placeholder="Valor do Vencimento (R$)"
              error={errors?.valorVencimento}
              {...register('valorVencimento')}
            />

            <Input
              w="90%"
              label="Data Inicial (00/00/0000)"
              placeholder="Data Inicial"
              error={errors?.dataInicial}
              {...register('dataInicial')}
            />

            <Input
              w="90%"
              label="Data Final (00/00/0000)"
              placeholder="Data Final"
              defaultValue={data?.dataFinal}
              error={errors?.dataFinal}
              {...register('dataFinal')}
            />

            <Button type="submit" mt="7" colorScheme="blue" size="lg" isLoading={formState.isSubmitting}>Cadastrar</Button>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
