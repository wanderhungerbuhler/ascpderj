import React from 'react';

import { Header } from '@/components/Header';

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

interface DataProps {
  data: OrderProps;
}

export default function User({ data }: DataProps) {

  console.log(data);

  return (
    <>
      <Header />
    </>
  )
}
