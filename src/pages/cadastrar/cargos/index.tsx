import React, { useCallback, useState } from 'react';
import { Alert, Box, Button, Flex, Heading } from '@chakra-ui/react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { Input } from '@/components/Form/Input';
import { Header } from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, onSnapshot, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import app from '@/../services/firebaseConfig';
import { RiSave2Fill } from 'react-icons/ri';

interface OrderProps {
  nomeCargo?: string;
}

const schemaRegister = Yup.object().shape({
  nomeCargo: Yup.string().required('Preencher campo vazio'),
});

export default function Cargos() {
  const { register, handleSubmit, formState, reset, resetField } = useForm({
    resolver: yupResolver(schemaRegister)
  });

  const { errors } = formState;

  const [cargoExists, setCargoExists] = useState<OrderProps[] | undefined>(undefined)

  async function handleCargoExists(e: OrderProps) {
    const db = getFirestore(app);

    const response = await getDocs(query(collection(db, "cargos"), where("nomeCargo", "==", `${e}`)))
    const cargos = response.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data(),
      }
    })
    setCargoExists(cargos as any)
  }


  const handleSubmitRegister: SubmitHandler<OrderProps | FieldValues> = async (form, event) => {
    event?.preventDefault();

    if (cargoExists?.[0]?.nomeCargo === form?.nomeCargo) {
      alert('Cargo já existe em sistema');
    } else {
      const db = getFirestore(app);
      await addDoc(collection(db, "cargos"), {
        nomeCargo: form?.nomeCargo
      });

      alert('Cadastrado com sucesso!');
      resetField('nomeCargo');
    }

  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1280} mx="auto" px="6">
        <Sidebar />

        <Box w="100%" borderRadius="8" bg="gray.800" p="8" ml="12">

          <Heading w="100%" mt="7" mb="7">Cadastro de Novos Cargos</Heading>

          <Box as="form" w="70%" display="flex" flexWrap="wrap" justifyContent="space-between"
            onSubmit={handleSubmit(handleSubmitRegister)} >
            <Input
              w="90%"
              label="Nome do Cargo"
              placeholder="Nome do Cargo"
              error={errors?.nomeCargo}
              {...register('nomeCargo')}
              onBlur={(e) => handleCargoExists(String(e.target.value) as any)}
            />
            <Button type="submit" mt="7" colorScheme="blue" size="lg" isLoading={formState.isSubmitting}>Cadastrar</Button>
          </Box>

        </Box>
      </Flex>
    </Box>
  )
}
