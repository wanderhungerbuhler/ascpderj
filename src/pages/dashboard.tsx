import React, { useContext, useEffect, useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, GetStaticProps } from 'next';
import app from '../../services/firebaseConfig';
import { getFirestore, collection, getDocs, query, limit, orderBy, onSnapshot } from "firebase/firestore";

import { Container, Content } from '@/styles/pages/Dashboard/styles';

import { Menu } from '@/components/Menu';
import { AssocsTable } from '@/components/AssocsTable';
import { AuthContext } from '@/hooks/authContext';

export default function Dashboard() {
  const { user, tV } = useContext(AuthContext);

  return (
    <Container>
      <Menu />
      <Content>
        {user && <AssocsTable dataProps={tV} />}
      </Content>
    </Container >
  )
}
