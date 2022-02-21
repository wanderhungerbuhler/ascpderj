import { Container } from "./styles";
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
  dataProps: OrderProps[];
}

export function AssocsTable({ dataProps }: DataProps) {

  return (
    <Container>
      <Table>
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
              <Td style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <RiEditLine size={17} style={{ cursor: 'pointer' }} />
                <VscFilePdf size={17} style={{ cursor: 'pointer' }} />
              </Td>
            </Tr>
          ))}

        </Tbody>
      </Table>
    </Container>
  )
}


