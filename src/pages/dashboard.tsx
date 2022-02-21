import React from 'react';
import { GetStaticProps } from 'next';
import app from '../../services/firebaseConfig';
import { getFirestore, collection, getDocs, query, limit, orderBy } from "firebase/firestore";

import { Container, Content } from '@/styles/pages/Dashboard/styles';

import { Menu } from '@/components/Menu';
import { AssocsTable } from '@/components/AssocsTable';

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
  data: OrderProps[];
}

export default function Dashboard({ data }: DataProps) {
  return (
    <Container>
      <Menu />

      <Content>
        <AssocsTable dataProps={data} />
      </Content>
    </Container >
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const db = getFirestore(app);

  const data = await getDocs(query(collection(db, "users"), orderBy("nomeServidor"), limit(20)))
    .then(response => response.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    }) as OrderProps[])
    .catch(error => {
      console.log(error.code)
    });

  return {
    props: {
      data,
    },
    revalidate: 60 * 60 * 24
  }
}


