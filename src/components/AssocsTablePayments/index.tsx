import { useState } from "react";
import { deleteDoc, doc, getFirestore } from 'firebase/firestore';

import { Flex, IconButton } from '@chakra-ui/react';
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

interface DataProps {
  data: OrderProps[] | null;
}

export function AssocsTablePayments({ data }: DataProps) {
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
    const deleteUsers = doc(db, `${process.env.NEXT_PUBLIC_FIREBASEDB}`, `${d.id}`);

    window.confirm("Deseja realmente excluir?") ? await deleteDoc(deleteUsers) : '';
  }

  return (
    <>
      <NewTransactionModal data={dd} isOpen={isNewTransactionModal} onRequestClose={handleCloseNewTransactionModal} />

      <Flex w="100%" maxWidth={980} mx="auto">
        <Box flex="1" borderRadius="8" bg="gray.800" p="7" mx="auto" mb="70">
          <Table w="100%" variant="simple" colorScheme="whiteAlpha">
            <TableCaption placement="bottom">Relatório de Associados ASCPDERJ</TableCaption>
            <Thead>
              <Tr>
                <Th>ID Func.</Th>
                <Th>Vlr. Venc.</Th>
                <Th>Dt. Inicial</Th>
                <Th>Dt. Final</Th>
                <Th>Últ. Atualização</Th>
              </Tr>
            </Thead>
            <Tbody>

              {data?.map(d => (
                <Tr key={d?.id}>
                  <Td>
                    <Box>
                      <Text fontSize="sm">{d?.idFuncional}</Text>
                    </Box>
                  </Td>

                  <Td>
                    <Box>
                      <Text fontWeight="bold" fontSize="sm">R${d?.valorVencimento}</Text>
                    </Box>
                  </Td>

                  <Td>
                    <Box>
                      <Text fontSize="sm">{d?.dataInicial}</Text>
                    </Box>
                  </Td>

                  <Td>
                    <Box>
                      <Text fontSize="sm">{d?.dataFinal}</Text>
                    </Box>
                  </Td>

                  <Td>
                    <Box>
                      <Text fontSize="sm">{d?.updated_at}</Text>
                    </Box>
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
