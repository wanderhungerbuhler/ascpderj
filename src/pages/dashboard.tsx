import React, { useState, useEffect } from 'react';
import app from '../../services/firebaseConfig';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption
} from '@chakra-ui/react';
import { VscFilePdf } from 'react-icons/vsc';
import { RiEditLine } from 'react-icons/ri';

import { Container, Content } from '@/styles/pages/Dashboard/styles';

import { Menu } from '@/components/Menu';

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
  const [data, setData] = useState<OrderProps[] | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const db = getFirestore(app);

    async function getData() {
      const response = await getDocs(collection(db, "users"));

      const data = response.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }) as OrderProps[];
      console.log(data);
      setData(data);
      setLoading(true);
    };

    getData();
  }, []);

  return (
    <Container>
      <Menu />

      <Content>
        <Table size='sm' variant='striped' border='1px' borderColor='gray.200' colorScheme='facebook'>
          <TableCaption>Relatório de Associados ASCPDERJ</TableCaption>
          <Thead>
            <Tr>
              <Th>Id Funcional</Th>
              <Th>Nome</Th>
              <Th>CPF</Th>
              <Th>Data Assoc.</Th>
              <Th>Cat. Assoc.</Th>
              <Th>Matrícula</Th>
              {/*<Th>Condição</Th>
              <Th>Cargo</Th>
              <Th>Email</Th>
              <Th>Endereço</Th>
              <Th>Telefone</Th>
              <Th>Bairro</Th>
              <Th>Município</Th>
              <Th>CEP</Th> */}
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>

            {loading ? (
              data?.map(d => (
                <Tr key={d.id}>
                  <Td>{d.idFuncional}</Td>
                  <Td>{d.nomeServidor}</Td>
                  <Td>{d.cpf}</Td>
                  <Td>{d.dataAssoc}</Td>
                  <Td>{d.catAssoc}</Td>
                  <Td>{d.matricula}</Td>
                  {/* <Td>{d.condicao}</Td>
                  <Td>{d.cargo}</Td>
                  <Td>{d.email}</Td>
                  <Td>{d.endereco}</Td>
                  <Td>{d.telefone}</Td>
                  <Td>{d.bairro}</Td>
                  <Td>{d.municipio}</Td>
                  <Td>{d.cep}</Td> */}
                  <Td style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <RiEditLine size={17} style={{ cursor: 'pointer' }} />
                    <VscFilePdf size={17} style={{ cursor: 'pointer' }} />
                  </Td>
                </Tr>
              ))
            ) : (<p style={{ textAlign: 'center' }}>Carregando...</p>)}

          </Tbody>
        </Table>
      </Content>
    </Container >
  )
}

