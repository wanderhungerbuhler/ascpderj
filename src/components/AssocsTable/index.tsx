import { Container } from "@/styles/components/AssocsTable/style";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption
} from '@chakra-ui/react';

import { VscFilePdf } from 'react-icons/vsc';
import { RiEditLine } from 'react-icons/ri';
import { NewTransactionModal } from "../NewTransactionModal";
import { useState } from "react";

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

interface DataProps {
  dataProps: OrderProps[] | null;
}

export function AssocsTable({ dataProps }: DataProps) {
  const [dd, setDD] = useState<OrderProps | null>(null);
  const [isNewTransactionModal, setIsNewTransactionModal] = useState(false);

  function handleOpenNewTransactionModal(d: OrderProps) {
    setIsNewTransactionModal(true);
    setDD(d);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModal(false);
  }

  return (
    <>
      <Container>

        <NewTransactionModal data={dd} isOpen={isNewTransactionModal} onRequestClose={handleCloseNewTransactionModal} />

        <Table variant='simple' colorScheme='facebook'>
          <TableCaption>Relatório de Associados ASCPDERJ</TableCaption>
          <Thead>
            <Tr>
              <Th>Id Funcional</Th>
              <Th>Nome</Th>
              <Th>Cat. Assoc.</Th>
              <Th>Matrícula</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>

            {dataProps?.map(d => (
              <Tr key={d.id}>
                <Td>{d.idFuncional}</Td>
                <Td>{d.nomeServidor}</Td>
                <Td>{d.catAssoc}</Td>
                <Td>{d.matricula}</Td>
                <Td>
                  <RiEditLine size={20} style={{ cursor: 'pointer' }} onClick={() => handleOpenNewTransactionModal(d)} />
                  <VscFilePdf size={20} style={{ cursor: 'pointer' }} />
                </Td>
              </Tr>
            ))}

          </Tbody>
        </Table>
      </Container>
    </>
  )
}


