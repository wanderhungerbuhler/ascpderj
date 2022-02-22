import React, { useContext, useEffect, useState } from 'react';

import { Container, Content, Search, ListPageSearch } from '@/styles/pages/Dashboard/styles';

import { Menu } from '@/components/Menu';
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
  const [listPageSearch, setListPageSearch] = useState(Number(25));

  const [resultSearch, setResultSearch] = useState<OrderProps[] | null>(null);

  useEffect(() => {
    const db = getFirestore(app)
    onSnapshot(query(collection(db, "users"), where("nomeServidor", ">", `${search}`), orderBy("nomeServidor", "asc"), limit(listPageSearch)), snap => {
      const data = snap.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
      setResultSearch(data as any);
      console.log(resultSearch)
    })
  }, [search, listPageSearch])

  return (
    <Container>
      <Menu />
      <Content>

        <Search type="text" name="searchAssocs" placeholder="Digite um nome ou parte dele"
          onChange={e => setSearch(e.target.value)} />

        <ListPageSearch onChange={e => setListPageSearch(e.target.value)}>
          <option selected>25</option>
          <option>50</option>
          <option>100</option>
          <option>1000</option>
        </ListPageSearch>

        {user && <AssocsTable dataProps={!resultSearch ? tV : resultSearch} />}
      </Content>
    </Container >
  )
}
