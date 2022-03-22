import React, { useContext, useEffect, useState } from 'react';
import { Flex, Input, Icon, Select, Box, Stack, Text, Link } from '@chakra-ui/react';
import { RiContactsLine, RiDashboard2Line, RiMoneyDollarBoxLine, RiSearchLine } from 'react-icons/ri';

import { Header } from '@/components/Header';
import { AssocsTable } from '@/components/AssocsTable';
import { AuthContext } from '@/hooks/authContext';

import app from '../../services/firebaseConfig';
import { getFirestore, onSnapshot, query, collection, orderBy, limit, where, Firestore, startAt, endAt } from 'firebase/firestore';

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

export default function Dashboard() {
  const { user, tV } = useContext(AuthContext);

  const [search, setSearch] = useState('');
  const [listPageSearchSelected, setListPageSearchSelected] = useState(Number(10));
  const [resultSearch, setResultSearch] = useState<OrderProps[] | null>(null);

  const formatedSearch = search.toLocaleUpperCase().trim();

  const [listPageFilterSelected, setListPageFilterSelected] = useState('nomeServidor');

  console.log(listPageFilterSelected);

  useEffect(() => {
    const db = getFirestore(app);
    onSnapshot(query(collection(db, "associates"), where(`${listPageFilterSelected}`, ">=", `${formatedSearch}`),
      orderBy(`${listPageFilterSelected}`, "asc"), startAt(formatedSearch), endAt(`${formatedSearch}\uf8ff`), limit(listPageSearchSelected)), snap => {
        const data = snap.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        })
        setResultSearch(data as any);
      })
  }, [formatedSearch, listPageFilterSelected, listPageSearchSelected])

  // useEffect(() => {
  //   const db = getFirestore(app);
  //   onSnapshot(query(collection(db, "associates"), where("nomeServidor", ">=", `${formatedSearch}`) || where("catAssoc", "==", `${listPageFilterSelected}`),
  //     orderBy("nomeServidor", "asc"), startAt(formatedSearch), endAt(`${formatedSearch}\uf8ff`), limit(listPageSearchSelected)), snap => {
  //       const data = snap.docs.map(doc => {
  //         return {
  //           id: doc.id,
  //           ...doc.data()
  //         }
  //       })
  //       setResultSearch(data as any);
  //     })
  // }, [formatedSearch, listPageSearchSelected, listPageFilterSelected])

  return (
    <>
      <Header />
      <Flex maxWidth={810} alignItems="center" m="auto" mt="70">
        <Select
          variant="filled"
          outline="none"
          flex="1"
          py="2"
          px="2"
          height={50}
          width="auto"
          maxWidth={250}
          alignSelf="center"
          color="gray.300"
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
          onChange={(e) => setListPageFilterSelected(String(e.target.value))}
        >
          <option selected>Selecione o filtro por</option>
          <option style={{ background: '#181B23', color: '#FFFFFF' }} value="nomeServidor">Nome</option>
          <option style={{ background: '#181B23', color: '#FFFFFF' }} value="cargo">Cargo</option>
          <option style={{ background: '#181B23', color: '#FFFFFF' }} value="catAssoc">Cat. Assoc.</option>
          <option style={{ background: '#181B23', color: '#FFFFFF' }} value="matricula">Matrícula</option>
        </Select>

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
        <Box as="aside" w="auto" height="350" bg="gray.800" p="7" borderRadius="8">
          <Stack spacing="12" align="flex-start">
            <Box>
              <Text fontWeight="bold" color="gray.400" fontSize="small">GERAL</Text>
              <Stack spacing="4" mt="8" align="stretch">
                <Link display="flex" alignItems="center">
                  <Icon as={RiDashboard2Line} fontSize="20" />
                  <Text ml="4" fontWeight="medium">Dashboard</Text>
                </Link>

                <Link display="flex" alignItems="center">
                  <Icon as={RiContactsLine} fontSize="20" />
                  <Text ml="4" fontWeight="medium">Usuários</Text>
                </Link>
              </Stack>
            </Box>

            <Box>
              <Text fontWeight="bold" color="gray.400" fontSize="small">HISTÓRICOS</Text>
              <Stack spacing="4" mt="8" align="stretch">
                <Link display="flex" alignItems="center">
                  <Icon as={RiMoneyDollarBoxLine} fontSize="20" />
                  <Text ml="4" fontWeight="medium">Pagamentos</Text>
                </Link>

                <Link display="flex" alignItems="center">
                  <Icon as={RiMoneyDollarBoxLine} fontSize="20" />
                  <Text ml="4" fontWeight="medium">Vencimentos</Text>
                </Link>
              </Stack>
            </Box>
          </Stack>
        </Box>

        {user && <AssocsTable data={!resultSearch ? tV : resultSearch} />}
      </Flex>

    </>
  )
}
