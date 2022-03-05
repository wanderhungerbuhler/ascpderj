import app from "@/../services/firebaseConfig";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { FormEvent, useContext, useState } from "react";
import Modal from 'react-modal';
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
}

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  data: OrderProps | null;
}

import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { Input } from "../Form/Input";
import { RiSave2Fill } from "react-icons/ri";

export function NewTransactionModal({ data, isOpen, onRequestClose }: NewTransactionModalProps) {
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

  const { user } = useContext(AuthContext);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const db = getFirestore(app);

    await updateDoc(doc(db, "associates", `${data?.id}`), {
      idFuncional: idFuncional ? idFuncional : data?.idFuncional,
      nomeServidor: nomeServidor ? nomeServidor : data?.nomeServidor,
      cpf: cpf ? cpf : data?.cpf,
      dataAssoc: dataAssoc ? dataAssoc : data?.dataAssoc,
      catAssoc: catAssoc ? catAssoc : data?.catAssoc,
      matricula: matricula ? matricula : data?.matricula,
      condicao: condicao ? condicao : data?.condicao,
      cargo: cargo ? cargo : data?.cargo,
      email: email ? email : data?.email,
      endereco: endereco ? endereco : data?.endereco,
      telefone: telefone ? telefone : data?.telefone,
      bairro: bairro ? bairro : data?.bairro,
      municipio: municipio ? municipio : data?.municipio,
      cep: cep ? cep : data?.cep,
      usuario: user?.email,
    });

    onRequestClose();

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
        onSubmit={handleSubmit}
      >

        <Heading w="100%" mb="7">Atualização Cadastral</Heading>

        <Box flex="1" mr="100">
          <Input name="idfuncional" label="ID Funcional" placeholder="ID Funcional" id="idFuncional" defaultValue={data?.idFuncional || idFuncional} onChange={e => setIDFuncional(e.currentTarget.value)} />
          <Input name="nomeServidor" label="Nome Completo" placeholder="Nome Completo" defaultValue={data?.nomeServidor} onChange={e => setNomeServidor(e.target.value)} />
          <Input name="cpf" label="CPF" placeholder="CPF" defaultValue={data?.cpf} onChange={e => setCpf(e.target.value)} />
          <Input name="dataAssoc" label="Data Assoc." placeholder="Data Assoc." defaultValue={data?.dataAssoc} onChange={e => setDataAssoc(e.target.value)} />
          <Input name="catAssoc" label="Cat. Assoc." placeholder="Cat. Assoc." defaultValue={data?.catAssoc} onChange={e => setCatAssoc(e.target.value)} />
          <Input name="matricula" label="Matrícula" placeholder="Matrícula" defaultValue={data?.matricula} onChange={e => setMatricula(e.target.value)} />
          <Input name="condicao" label="Condição" placeholder="Condição" defaultValue={data?.condicao} onChange={e => setCondicao(e.target.value)} />
        </Box>

        <Box flex="1" >
          <Input name="cargo" label="Cargo" placeholder="Cargo" defaultValue={data?.cargo} onChange={e => setCargo(e.target.value)} />
          <Input name="email" label="E-mail" placeholder="E-mail" defaultValue={data?.email} onChange={e => setEmail(e.target.value)} />
          <Input name="endereco" label="Endereço" placeholder="Endereço" defaultValue={data?.endereco} onChange={e => setEndereco(e.target.value)} />
          <Input name="telefone" label="Telefone" placeholder="Telefone" defaultValue={data?.telefone} onChange={e => setTelefone(e.target.value)} />
          <Input name="bairro" label="Bairro" placeholder="Bairro" defaultValue={data?.bairro} onChange={e => setBairro(e.target.value)} />
          <Input name="municipio" label="Munícipio" placeholder="Município" defaultValue={data?.municipio} onChange={e => setMunicipio(e.target.value)} />
          <Input name="cep" label="CEP" placeholder="CEP" defaultValue={data?.cep} onChange={e => setCep(e.target.value)} />
        </Box>

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


