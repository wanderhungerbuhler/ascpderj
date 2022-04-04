import React, { useCallback, useState } from 'react';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { Input } from '@/components/Form/Input';
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
  valorVencimento: Yup.string().required('Preencher campo vazio. Ex: 1,00').matches(/^\d+(?:\,\d{2,2})$/, "Coloque uma vírgula antes das 2 últimas casas decimais"),
  dataInicial: Yup.date().required('Preencher campo vazio').nullable(),
  dataFinal: Yup.date()
    .min(Yup.ref('dataInicial'), "A Data Final não pode ser inferior a Data de Início")
    .required('Preencher campo vazio')
    .nullable()
});

export default function CadastrarVencimentos(data: OrderProps) {
  const { register, handleSubmit, formState, reset } = useForm({
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

    const db = getFirestore(app);

    await addDoc(collection(db, "history_salary"), {
      idFuncional: form?.idFuncional,
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
              disabled
              placeholder="Nome do Servidor"
              value={userExists?.nomeServidor ? userExists?.nomeServidor : 'Não existe Servidor com o ID Funcional informado'}
              type="text"
              {...register('nomeServidor')}
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
