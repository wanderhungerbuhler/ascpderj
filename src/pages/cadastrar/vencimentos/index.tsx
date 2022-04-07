import React, { useCallback, useState } from 'react';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { Input } from '@/components/Form/Input';
import { InputCurrency } from '@/components/Form/InputCurrency';
import { Header } from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, onSnapshot, query, serverTimestamp, where } from 'firebase/firestore';
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
  idFuncional: Yup.string().required('Preencher campo vazio: Apenas números são aceitos'),
  valorVencimento: Yup.string().optional(),
  dataInicial: Yup.date().typeError("Preencha o campo vazio").optional().nullable(),
  dataFinal: Yup.date().typeError("Preencha o campo vazio - Lembre-se: A Data Final não pode ser inferior a Data Inicial")
    .min(Yup.ref('dataInicial'), "A Data Final não pode ser inferior a Data Inicial")
    .optional()
});

export default function CadastrarVencimentos(data: OrderProps) {
  const { register, handleSubmit, formState, reset, resetField } = useForm({
    resolver: yupResolver(schemaRegister)
  });

  const { errors } = formState;

  const [userExists, setUserExists] = useState<OrderProps | null>(null)

  async function handleUserExists(e: OrderProps) {
    const db = getFirestore(app);

    const response = await getDocs(query(collection(db, `${process.env.NEXT_PUBLIC_FIREBASEDB}`), where("idFuncional", "==", `${String(e)}`)))
    const users = response.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data(),
      }
    })
    setUserExists(users[0] as any)
  }


  const handleSubmitRegister: SubmitHandler<OrderProps | FieldValues> = async (form, event) => {
    event?.preventDefault();

    resetField('nomeServidor');

    const db = getFirestore(app);

    await addDoc(collection(db, "history_salary"), {
      idFuncional: form?.idFuncional,
      nomeServidor: form?.nomeServidor,
      valorVencimento: form?.valorVencimento,
      dataInicial: form?.dataInicial.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      dataFinal: form?.dataFinal.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      updated_at: new Date().toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }),
    });

    alert('Cadastrado com sucesso!');
    resetField('nomeServidor');
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
              type="number"
              error={errors?.idFuncional}
              {...register('idFuncional')}
              onBlur={(e) => handleUserExists(String(e.target.value) as any)}
            />

            <Input
              w="90%"
              label="Nome do Servidor"
              placeholder="Nome do Servidor"
              value={userExists?.nomeServidor}
              type="text"
              {...register('nomeServidor')}
            />

            <InputCurrency
              w="90%"
              label="Valor do Vencimento (R$)"
              placeholder="Valor do Vencimento (R$)"
              decimalsLimit={1}
              decimalScale={2}
              error={errors?.valorVencimento}
              {...register('valorVencimento')}
            />


            <Input
              w="90%"
              label="Data Inicial (00/00/0000)"
              placeholder="Data Inicial"
              type="date"
              error={errors?.dataInicial}
              {...register('dataInicial')}
            />

            <Input
              w="90%"
              label="Data Final (00/00/0000)"
              placeholder="Data Final"
              type="date"
              defaultValue={data?.dataFinal}
              error={errors?.dataFinal}
              {...register('dataFinal')}
            />

            {userExists && <Button type="submit" mt="7" colorScheme="blue" size="lg" isLoading={formState.isSubmitting}>Cadastrar</Button>}
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
