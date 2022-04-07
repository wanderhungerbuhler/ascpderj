import React, { useCallback, useState } from 'react';
import { Box, Button, Flex, Heading, Select } from '@chakra-ui/react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { Input } from '@/components/Form/Input';
import { Header } from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, onSnapshot, query, serverTimestamp, where } from 'firebase/firestore';
import app from '@/../services/firebaseConfig';
import { RiSave2Fill } from 'react-icons/ri';

import { InputCurrency } from '@/components/Form/InputCurrency';

interface OrderProps {
  id: string;
  idFuncional: string;
  nomeServidor: string;

  porcentagemDesconto?: string;
  valorDesconto?: string;
  formaPagamento?: string;
  banco?: string;
  agencia?: string;
  conta?: string;
}

const schemaRegister = Yup.object().shape({
  idFuncional: Yup.string().required('Preencher campo vazio: Apenas números são aceitos'),
  valorDesconto: Yup.string().optional(),
  formaPagamento: Yup.string().required('Preencher campo vazio.'),
  banco: Yup.string().required('Preencher campo vazio. Ex: Banco Bradesco'),
  agencia: Yup.string().required('Preencher campo vazio.'),
  conta: Yup.string().required('Preencher campo vazio.')
});

export default function CadastrarPagamentos(data: OrderProps) {
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

    const valorVencimento = 5000;
    const valorDesconto = parseFloat(form?.valorDesconto);

    const desconto = (valorVencimento / 100) * valorDesconto;

    const newDesconto = valorVencimento - desconto;

    const db = getFirestore(app);

    await addDoc(collection(db, "history_payments"), {
      idFuncional: `${form?.idFuncional}`,
      nomeServidor: form?.nomeServidor,
      porcentagemDesconto: form?.valorDesconto,
      valorDesconto: newDesconto,
      formaPagamento: form?.formaPagamento,
      banco: form?.banco,
      agencia: form?.agencia,
      conta: form?.conta,
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

          <Heading w="100%" mt="7" mb="7">Cadastro de Pagamentos</Heading>

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
              label="Valor do Desconto (%)"
              placeholder="Valor do Desconto (%)"
              decimalScale={1}
              error={errors?.valorVencimento}
              {...register('valorDesconto')}
            />

            <label htmlFor="formaPagamento" style={{ color: '#718096', margin: '8px 12px 8px 0', display: 'block' }}>Forma de Pagamento</label>
            <Select
              w="90%"
              variant="filled"
              height="3rem"
              id="formaPagamento"
              outline="none"
              bg="gray.900"
              _hover={{
                bg: "gray.900",
                cursor: "pointer"
              }}
              _focus={{
                outline: "none"
              }}
              {...register('formaPagamento')}
            >
              <option style={{ background: '#181B23', color: '#FFFFFF' }} disabled selected>Selecione uma opção</option>
              <option style={{ background: '#181B23', color: '#FFFFFF' }} value="Boleto Bancário">Boleto Bancário</option>
              <option style={{ background: '#181B23', color: '#FFFFFF' }} value="Folha de Pagamento">Folha de Pagamento</option>
            </Select>

            <Input
              w="90%"
              label="Banco"
              placeholder="Banco"
              error={errors?.banco}
              {...register('banco')}
            />

            <Input
              w="90%"
              label="Agência"
              type="number"
              placeholder="Agência"
              error={errors?.agencia}
              {...register('agencia')}
            />

            <Input
              w="90%"
              label="Conta"
              type="number"
              placeholder="Conta"
              error={errors?.conta}
              {...register('conta')}
            />

            {userExists && <Button type="submit" mt="7" colorScheme="blue" size="lg" isLoading={formState.isSubmitting}>Cadastrar</Button>}
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
