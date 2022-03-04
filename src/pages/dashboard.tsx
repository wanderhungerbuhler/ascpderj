import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Flex, Input, Icon, Box, Select } from '@chakra-ui/react';
import { RiSearchLine } from 'react-icons/ri';

import { Header } from '@/components/Header';
import { AssocsTable } from '@/components/AssocsTable';
import { AuthContext } from '@/hooks/authContext';

import app from '../../services/firebaseConfig';
import { getFirestore, onSnapshot, query, collection, orderBy, limit, where } from 'firebase/firestore';

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

export default function Dashboard() {
  const { user, tV } = useContext(AuthContext);

  const [search, setSearch] = useState('');
  const [listPageSearchSelected, setListPageSearchSelected] = useState(Number(10));

  const [resultSearch, setResultSearch] = useState<OrderProps[] | null>(null);

  console.log(listPageSearchSelected);

  useEffect(() => {
    const db = getFirestore(app)
    onSnapshot(query(collection(db, "associates"), where("nomeServidor", ">=", `${search}`), orderBy("nomeServidor", "asc"), limit(listPageSearchSelected)), snap => {
      const data = snap.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
      setResultSearch(data as any);
    })
  }, [search, listPageSearchSelected])

  return (
    <>
      <Header />
      <Flex maxWidth={980} justifyContent="space-between" mx="auto" mt="70">
        <Flex
          as="label"
          flex="1"
          py="4"
          px="8"
          maxWidth={400}
          alignSelf="center"
          color="gray.200"
          position="relative"
          bg="gray.800"
          borderRadius="full"
        >
          <Input
            type="text"
            name="searchAssocs"
            color="gray.50"
            variant="unstyled"
            placeholder="Digite uma parte do nome"
            _placeholder={{ color: "gray.400" }}
            onChange={e => setSearch(e.target.value)}
          />

          <Icon as={RiSearchLine} fontSize={20} />
        </Flex>

        <Select
          variant="filled"
          outline="none"
          flex="1"
          py="2"
          px="2"
          maxWidth={100}
          alignSelf="center"
          color="gray.200"
          position="relative"
          bg="gray.800"
          borderRadius={7}
          _hover={{
            bg: "gray.800"
          }}
          _focus={{
            outline: "none"
          }}
          onChange={e => setListPageSearchSelected(Number(e.target.value))}
        >
          <option selected>10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="1000">1000</option>
        </Select>
      </Flex>
      {user && <AssocsTable dataProps={!resultSearch ? tV : resultSearch} />}
    </>
  )
}
