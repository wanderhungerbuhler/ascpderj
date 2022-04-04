import React, { useContext, useEffect, useState } from 'react';
import { Flex, Input, Icon, Select, Box, Stack, Text, Link as ChrackraLink, Heading } from '@chakra-ui/react';
import Link from 'next/link';

import { RiContactsLine, RiDashboard2Line, RiMoneyDollarBoxLine, RiSearchLine } from 'react-icons/ri';

import { Header } from '@/components/Header';
import { AssocsTableVenc } from '@/components/AssocsTableVenc';
import { AuthContext } from '@/hooks/authContext';

import app from '../../../../services/firebaseConfig';
import { getFirestore, onSnapshot, query, collection, orderBy, limit, where, Firestore, startAt, endAt } from 'firebase/firestore';
import Sidebar from '@/components/Sidebar';

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
  updated_at?: string;
}

export default function Vencimentos() {
  const { user, tV } = useContext(AuthContext);

  const [search, setSearch] = useState('');
  const [listPageSearchSelected, setListPageSearchSelected] = useState(Number(10));
  const [resultSearch, setResultSearch] = useState<OrderProps[] | null>(null);

  const formatedSearch = search.toLocaleUpperCase().trim();

  useEffect(() => {
    const db = getFirestore(app);
    onSnapshot(query(collection(db, "history_salary"), where("idFuncional", ">=", `${formatedSearch}`),
      orderBy("idFuncional", "asc"), startAt(formatedSearch), endAt(`${formatedSearch}\uf8ff`), limit(listPageSearchSelected)), snap => {
        const data = snap.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        })
        setResultSearch(data as any);
      })
  }, [formatedSearch, listPageSearchSelected])

  return (
    <>
      <Header />
      <Flex maxWidth={810} alignItems="center" m="auto" mt="70">
        <Flex
          as="label"
          flex="1"
          px="6"
          py="3.5"
          height={50}
          maxWidth={400}
          alignSelf="center"
          color="gray.200"
          position="relative"
          bg="gray.800"
          borderRadius="8"
        >
          <Input
            type="text"
            name="searchAssocs"
            color="gray.50"
            variant="unstyled"
            placeholder="Busque pelo nome do servidor"
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
          height={50}
          maxWidth={100}
          alignSelf="center"
          color="gray.200"
          position="relative"
          bg="gray.800"
          borderRadius={7}
          _hover={{
            bg: "gray.800",
            cursor: "pointer"
          }}
          _focus={{
            outline: "none"
          }}
          onChange={e => setListPageSearchSelected(Number(e.target.value))}
        >
          <option selected>10</option>
          <option style={{ background: '#181B23', color: '#FFFFFF' }} value="25">25</option>
          <option style={{ background: '#181B23', color: '#FFFFFF' }} value="50">50</option>
          <option style={{ background: '#181B23', color: '#FFFFFF' }} value="100">100</option>
          <option style={{ background: '#181B23', color: '#FFFFFF' }} value="1000">1000</option>
        </Select>


      </Flex>

      <Flex w="100%" my="6" maxWidth={1280} mx="auto">
        <Sidebar />
        {user && <AssocsTableVenc data={!resultSearch ? tV : resultSearch} />}
      </Flex>

    </>
  )
}
