import { useState } from "react";
import { deleteDoc, doc, getFirestore } from 'firebase/firestore';

import { Flex, FormControl, IconButton } from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  Text,
  Button,
  Icon
} from '@chakra-ui/react';

import { VscFilePdf } from 'react-icons/vsc';
import { RiDeleteBin7Line, RiPencilLine } from 'react-icons/ri';
import { NewTransactionModal } from "../NewTransactionModal";

import app from "@/../services/firebaseConfig";
import { useRouter } from "next/router";

interface HSProps {
  valorVencimento: string;
  dataInicial: string;
  dataFinal: string;
}

interface HPProps {
  valorDesconto: string;
  formaPagamento: string;
  banco: string;
  agencia: string;
  conta: string;
}

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
  historySalary: HSProps;
  historyPayment: HPProps;
}

interface DataProps {
  dataProps: OrderProps[] | null;
}

export function AssocsTable({ dataProps }: DataProps) {
  const [dd, setDD] = useState<OrderProps | null>(null);
  const [isNewTransactionModal, setIsNewTransactionModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  function handleOpenNewTransactionModal(d: OrderProps) {
    setIsNewTransactionModal(true);
    setDD(d);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModal(false);
  }

  function handleOpenPDF(d: OrderProps) {
    setIsOpen(true);
    router.push(`/dashboard/${d?.id}`)
  }

  async function handleDelete(d: OrderProps) {
    const db = getFirestore(app);
    const deleteUsers = doc(db, "associates", `${d.id}`);

    window.confirm("Deseja realmente excluir?") ? await deleteDoc(deleteUsers) : '';
  }

  return (
    <>
      <NewTransactionModal data={dd} isOpen={isNewTransactionModal} onRequestClose={handleCloseNewTransactionModal} />

      <Flex width="100%" maxWidth={980} mx="auto">
        <Box flex="1" borderRadius="8" bg="gray.800" p="7" mt="7" mx="auto" mb="70">
          <Table w="100%" variant="simple" colorScheme="whiteAlpha">
            <TableCaption placement="bottom">Relatório de Associados ASCPDERJ</TableCaption>
            <Thead>
              <Tr>
                <Th>Id Funcional</Th>
                <Th>Nome</Th>
                <Th>Cat. Assoc.</Th>
                <Th>Cargo</Th>
                <Th>Matrícula</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>

              {dataProps?.map(d => (
                <Tr key={d.id}>
                  <Td>
                    <Box>
                      <Text fontSize="sm">{d.idFuncional}</Text>
                    </Box>
                  </Td>

                  <Td>
                    <Box>
                      <Text fontWeight="bold" fontSize="sm">{d.nomeServidor}</Text>
                    </Box>
                  </Td>

                  <Td>
                    <Box>
                      <Text fontSize="sm">{d.catAssoc}</Text>
                    </Box>
                  </Td>

                  <Td>
                    <Box>
                      <Text fontSize="sm">{d.cargo}</Text>
                    </Box>
                  </Td>

                  <Td>
                    <Box>
                      <Text fontSize="sm">{d.matricula}</Text>
                    </Box>
                  </Td>

                  <Td>
                    <IconButton
                      aria-label='Update Associates'
                      as="button"
                      size="xs"
                      mr="1"
                      fontSize="sm"
                      bg="0"
                      color="gray.50"
                      icon={<RiPencilLine fontSize={17} />}
                      cursor="pointer"
                      outline="none"
                      _focus={{
                        outline: "none"
                      }}
                      _hover={{
                        bg: "gray.700"
                      }}
                      onClick={() => handleOpenNewTransactionModal(d)}
                    />

                    <IconButton
                      aria-label='Open PDF Associated'
                      as="button"
                      size="xs"
                      mr="1"
                      fontSize="sm"
                      bg="0"
                      color="gray.50"
                      icon={<VscFilePdf fontSize={17} />}
                      cursor="pointer"
                      outline="none"
                      _focus={{
                        outline: "none"
                      }}
                      _hover={{
                        bg: "gray.700"
                      }}
                      onClick={() => handleOpenPDF(d)}
                    />

                    <IconButton
                      aria-label='Delete Associates'
                      as="button"
                      size="xs"
                      mr="1"
                      fontSize="sm"
                      bg="0"
                      color="red"
                      icon={<RiDeleteBin7Line fontSize={17} />}
                      cursor="pointer"
                      outline="none"
                      _focus={{
                        outline: "none"
                      }}
                      _hover={{
                        bg: "gray.700"
                      }}
                      onClick={() => handleDelete(d)}
                    >Atualizar</IconButton>
                  </Td>
                </Tr>
              ))}

            </Tbody>
          </Table>
        </Box>
      </Flex>
    </>
  )
}


