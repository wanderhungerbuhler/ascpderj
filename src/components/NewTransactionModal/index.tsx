import React, { FormEvent, useContext, useState } from "react";
import app from "@/../services/firebaseConfig";
import { addDoc, collection, doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";

import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { Input } from "@/components/Form/Input";

import Modal from 'react-modal';
import { RiSave2Fill } from "react-icons/ri";
import { Box, Button, Divider, Flex, Heading, Select } from "@chakra-ui/react";

import { AuthContext } from '@/hooks/authContext';

interface OrderProps {
  id: string;
  idFuncional: string;
  nomeServidor: string;
  cpf: string;
  dataAssoc: string;
  catAssoc: string;
  matricula: string;
  condicao: string;
  cargo: string;
  email: string;
  endereco: string;
  telefone: string;
  bairro: string;
  municipio: string;
  cep: string;

  valorVencimento?: string;
  dataInicial?: string;
  dataFinal?: string;
  valorDesconto?: string;
  formaPagamento?: string;
  banco?: string;
  agencia?: string;
  conta?: string;
}

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  data: OrderProps | null;
}

const schemaRegister = Yup.object().shape({
  // valorVencimento: Yup.string().required('Preencher campo vazio'),
  // dataInicial: Yup.string().required('Preencher campo vazio'),
  // dataFinal: Yup.string().required('Preencher campo vazio'),

  // valorDesconto: Yup.string().required('Preencher campo vazio'),
  // banco: Yup.string().required('Preencher campo vazio'),
  // agencia: Yup.string().required('Preencher campo vazio'),
  // conta: Yup.string().required('Preencher campo vazio'),
});

export function NewTransactionModal({ data, isOpen, onRequestClose }: NewTransactionModalProps) {
  const { user } = useContext(AuthContext);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaRegister)
  })

  // USER
  const [idFuncional, setIDFuncional] = useState('');
  const [nomeServidor, setNomeServidor] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataAssoc, setDataAssoc] = useState('');
  const [catAssoc, setCatAssoc] = useState('');
  const [matricula, setMatricula] = useState('');
  const [condicao, setCondicao] = useState('');
  const [cargo, setCargo] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [bairro, setBairro] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [cep, setCep] = useState('');

  // HISTORY SALARY
  const [valorVencimento, setValorVencimento] = useState('');
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');

  // HISTORY PAYMENT
  const [valorDesconto, setValorDesconto] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('');
  const [banco, setBanco] = useState('');
  const [agencia, setAgencia] = useState('');
  const [conta, setConta] = useState('');

  const handleSubmitRegister: SubmitHandler<OrderProps | FieldValues> = async (dataR, event) => {
    event?.preventDefault();

    const db = getFirestore(app);

    console.log(dataR)

    await updateDoc(doc(db, "associates", `${data?.id}`), {
      idFuncional: idFuncional ? idFuncional : dataR?.idFuncional,
      nomeServidor: nomeServidor ? nomeServidor : dataR?.nomeServidor,
      cpf: cpf ? cpf : dataR?.cpf,
      dataAssoc: dataAssoc ? dataAssoc : dataR?.dataAssoc,
      catAssoc: catAssoc ? catAssoc : dataR?.catAssoc,
      matricula: matricula ? matricula : dataR?.matricula,
      condicao: condicao ? condicao : dataR?.condicao,
      cargo: cargo ? cargo : dataR?.cargo,
      email: email ? email : dataR?.email,
      endereco: endereco ? endereco : dataR?.endereco,
      telefone: telefone ? telefone : dataR?.telefone,
      bairro: bairro ? bairro : dataR?.bairro,
      municipio: municipio ? municipio : dataR?.municipio,
      cep: cep ? cep : dataR?.cep,
      update_by: user?.email,

      // valorVencimento: valorVencimento ? valorVencimento : dataR?.valorVencimento,
      // dataInicial: dataInicial ? dataInicial : dataR?.dataInicial,
      // dataFinal: dataInicial ? dataInicial : dataR?.dataFinal,

      // valorDesconto: valorDesconto ? valorDesconto : dataR?.valorDesconto,
      // formaPagamento: formaPagamento ? formaPagamento : dataR?.formaPagamento,
      // banco: banco ? banco : dataR?.banco,
      // agencia: agencia ? agencia : dataR?.agencia,
      // conta: conta ? conta : dataR?.conta,
    });

    // await addDoc(collection(db, "history_salary"), {
    //   id: `${data?.id}`,
    //   nomeServidor: `${data?.nomeServidor}`,
    //   historySalary: {
    //     valorVencimento: valorVencimento ? valorVencimento : dataR?.valorVencimento,
    //     dataInicial: dataInicial ? dataInicial : dataR?.dataInicial,
    //     dataFinal: dataInicial ? dataInicial : dataR?.dataFinal,
    //   },
    // });

    // await addDoc(collection(db, "history_payment"), {
    //   id: `${data?.id}`,
    //   nomeServidor: `${data?.nomeServidor}`,
    //   historyPayment: {
    //     valorDesconto: valorDesconto ? valorDesconto : dataR?.valorDesconto,
    //     formaPagamento: formaPagamento ? formaPagamento : dataR?.formaPagamento,
    //     banco: banco ? banco : dataR?.banco,
    //     agencia: agencia ? agencia : dataR?.agencia,
    //     conta: conta ? conta : dataR?.conta,
    //   }
    // });

    onRequestClose();

    // CADASTRO ASSSOCIADO
    setIDFuncional('');
    setNomeServidor('');
    setCpf('');
    setDataAssoc('');
    setCatAssoc('');
    setMatricula('');
    setCondicao('');
    setCargo('');
    setEmail('');
    setEndereco('');
    setTelefone('');
    setBairro('');
    setMunicipio('');
    setCep('');


    // HISTORY SALARY
    setValorVencimento('');
    setDataInicial('');
    setDataFinal('');

    // HISTORY PAYMENT
    setValorDesconto('');
    setBanco('');
    setFormaPagamento('');
    setAgencia('');
    setConta('');
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Flex
        as="form"
        width="100%"
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="row"
        flexWrap="wrap"
        onSubmit={handleSubmit(handleSubmitRegister)}
      >

        <Heading w="100%" mb="7">Dados Básicos</Heading>

        <Box flex="1" mr="100">
          <Input
            label="ID Funcional"
            placeholder="ID Funcional"
            id="idFuncional"
            defaultValue={data?.idFuncional || idFuncional}
            error={errors?.idFuncional}
            {...register('idFuncional')}
          />

          <Input
            label="Nome Completo"
            placeholder="Nome Completo"
            defaultValue={data?.nomeServidor || nomeServidor}
            error={errors?.nomeServidor}
            {...register('nomeServidor')}
          />

          <Input
            label="CPF"
            placeholder="CPF"
            defaultValue={data?.cpf || cpf}
            error={errors?.cpf}
            {...register('cpf')}
          />
          <Input
            label="Data Assoc."
            placeholder="Data Assoc."
            defaultValue={data?.dataAssoc || dataAssoc}
            error={errors?.dataAssoc}
            {...register('dataAssoc')}
          />
          {/* <Input name="catAssoc" label="Cat. Assoc." placeholder="Cat. Assoc." defaultValue={data?.catAssoc} onChange={e => setCatAssoc(e.target.value)} /> */}
          <label style={{ color: '#718096', margin: '8px 12px 8px 0', display: 'block' }}>Cat. Assoc</label>
          <Select
            variant="filled"
            height="3rem"
            outline="none"
            bg="gray.900"
            _hover={{
              bg: "gray.900",
              cursor: "pointer"
            }}
            _focus={{
              outline: "none"
            }}
            {...register('catAssoc')}
          >
            <option style={{ background: '#181B23', color: '#FFFFFF' }} disabled selected defaultValue={data?.catAssoc}>{data?.catAssoc}</option>
            <option style={{ background: '#181B23', color: '#FFFFFF' }} value="ATIVO-EFETIVO">ATIVO-EFETIVO</option>
            <option style={{ background: '#181B23', color: '#FFFFFF' }} value="INATIVO-EFETIVO">INATIVO-EFETIVO</option>
          </Select>

          <Input
            label="Matrícula"
            placeholder="Matrícula"
            defaultValue={data?.matricula}
            error={errors?.matricula}
            {...register('matricula')}
          />

          {/* <Input name="condicao" label="Condição" placeholder="Condição" defaultValue={data?.condicao} onChange={e => setCondicao(e.target.value)} /> */}
          <label style={{ color: '#718096', margin: '8px 12px 8px 0', display: 'block' }}>Condição</label>
          <Select
            variant="filled"
            height="3rem"
            outline="none"
            bg="gray.900"
            _hover={{
              bg: "gray.900",
              cursor: "pointer"
            }}
            _focus={{
              outline: "none"
            }}
            {...register('condicao')}
          >
            <option style={{ background: '#181B23', color: '#FFFFFF' }} disabled selected defaultValue={data?.condicao}>{data?.condicao}</option>
            <option style={{ background: '#181B23', color: '#FFFFFF' }} value="ATIVO">ATIVO</option>
            <option style={{ background: '#181B23', color: '#FFFFFF' }} value="APOSENTADO">APOSENTADO</option>
          </Select>
        </Box>

        <Box flex="1">
          {/* <Input name="cargo" label="Cargo" placeholder="Cargo" defaultValue={data?.cargo} onChange={e => setCargo(e.target.value)} /> */}
          <label style={{ color: '#718096', margin: '8px 12px 8px 0', display: 'block' }}>Cargo</label>
          <Select
            variant="filled"
            height="3rem"
            outline="none"
            bg="gray.900"
            _hover={{
              bg: "gray.900",
              cursor: "pointer"
            }}
            _focus={{
              outline: "none"
            }}
            {...register('cargo')}
          >
            <option style={{ background: '#181B23', color: '#FFFFFF' }} disabled selected defaultValue={data?.cargo}>{data?.cargo}</option>
            <option style={{ background: '#181B23', color: '#FFFFFF' }} value="Analista de Sistemas">Analista de Sistemas</option>
            <option style={{ background: '#181B23', color: '#FFFFFF' }} value="Assistente Administrativo">Assistente Administrativo</option>
            <option style={{ background: '#181B23', color: '#FFFFFF' }} value="Programador de Produção, Computação e Desenvolvimento">Programador de Produção, Computação e Desenvolvimento</option>
            <option style={{ background: '#181B23', color: '#FFFFFF' }} value="Técnico de Suporte, Computação e Processamento">Técnico de Suporte, Computação e Processamento</option>
          </Select>

          <Input
            label="E-mail"
            placeholder="E-mail"
            defaultValue={data?.email}
            error={errors?.email}
            {...register('email')}
          />

          <Input
            label="Endereço"
            placeholder="Endereço"
            defaultValue={data?.endereco}
            error={errors?.endereco}
            {...register('endereco')}
          />

          <Input
            label="Telefone"
            placeholder="Telefone"
            defaultValue={data?.telefone}
            error={errors?.telefone}
            {...register('telefone')}
          />

          <Input
            label="Bairro"
            placeholder="Bairro"
            defaultValue={data?.bairro}
            error={errors?.bairro}
            {...register('bairro')}
          />
          <Input
            label="Munícipio"
            placeholder="Município"
            defaultValue={data?.municipio}
            error={errors?.municipio}
            {...register('municipio')}
          />
          <Input
            label="CEP"
            placeholder="CEP"
            defaultValue={data?.cep}
            error={errors?.cep}
            {...register('cep')}
          />
        </Box>

        {/* <Divider mt="10" colorScheme="whiteAlpha" />

        <Heading w="100%" mt="7" mb="7">Histórico de Vencimentos</Heading>

        <Box w="100%" display="flex" justifyContent="space-between">
          <Input
            w="95%"
            label="Valor do Vencimento (R$)"
            placeholder="Valor do Vencimento (R$)"
            defaultValue={data?.valorVencimento}
            error={errors?.valorVencimento}
            {...register('valorVencimento')}
          />


          <Input
            w="95%"
            label="Data Inicial (00/00/0000)"
            placeholder="Data Inicial"
            defaultValue={data?.dataInicial}
            error={errors?.dataInicial}
            {...register('dataInicial')}
          />

          <Input
            w="95%"
            label="Data Final (00/00/0000)"
            placeholder="Data Final"
            defaultValue={data?.dataFinal}
            error={errors?.dataFinal}
            {...register('dataFinal')}
          />
        </Box>

        <Divider mt="10" colorScheme="whiteAlpha" />

        <Heading w="100%" mt="7" mb="7" display="flex" alignItems="center">Histórico de Pagamento <Heading size="md" ml="2" mt="2" fontWeight="normal" color="gray.500">- (Desconto em Folha e Boleto Bancário)</Heading></Heading>

        <Box w="100%" display="flex" justifyContent="space-between" alignItems="center">
          <Input
            w="95%"
            label="Valor do Desconto (%)"
            placeholder="Valor do Desconto (%)"
            defaultValue={data?.valorDesconto}
            error={errors?.valorDesconto}
            {...register('valorDesconto')}
          />

          <Box w="100%" display="flex" flexWrap="wrap" alignItems="center">
            <label style={{ display: 'flex', flexWrap: 'wrap', color: '#718096', margin: '8px 12px 8px 0' }}>Forma de Pagamento</label>
            <Select
              variant="filled"
              height="3rem"
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
              <option style={{ background: '#181B23', color: '#FFFFFF' }} disabled selected defaultValue={data?.formaPagamento}>{data?.formaPagamento}</option>
              <option style={{ background: '#181B23', color: '#FFFFFF' }} value="Boleto Bancario">Boleto Bancário</option>
              <option style={{ background: '#181B23', color: '#FFFFFF' }} value="Desconto em Folha">Desconto em Folha</option>
            </Select>
          </Box>
        </Box>

        <Box w="100%" display="flex" justifyContent="space-between" alignItems="center">
          <Input
            w="95%"
            label="Banco"
            placeholder="Banco"
            defaultValue={data?.banco}
            error={errors?.banco}
            {...register('banco')}
          />

          <Input
            w="95%"
            label="Agência"
            placeholder="Agência"
            defaultValue={data?.agencia}
            error={errors?.agencia}
            {...register('agencia')}
          />

          <Input
            w="95%"
            label="Conta"
            placeholder="Conta"
            defaultValue={data?.conta}
            error={errors?.conta}
            {...register('conta')}
          />
        </Box> */}

        <Box w="100%" mt="7" display="flex" justifyContent="flex-end">
          <Button
            type="button"
            aria-label='Cancel Update Associates'
            size="lg"
            mr="1"
            fontSize="sm"
            bg="gray.500"
            cursor="pointer"
            outline="none"
            onClick={onRequestClose}
            _focus={{
              outline: "none",
            }}
            _hover={{
              bg: "gray.600"
            }}
          >Cancelar</Button>

          <Button
            type="submit"
            aria-label='Update Associates'
            size="lg"
            mr="1"
            fontSize="sm"
            bg="blue.500"
            leftIcon={<RiSave2Fill fontSize={17} />}
            cursor="pointer"
            outline="none"
            _focus={{
              outline: "none"
            }}
            _hover={{
              bg: "blue.600"
            }}
          >Atualizar</Button>
        </Box>

      </Flex>

    </Modal >
  )
}


