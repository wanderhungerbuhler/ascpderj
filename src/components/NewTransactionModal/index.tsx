import app from "@/../services/firebaseConfig";
import { collection, doc, getFirestore, onSnapshot, onSnapshotsInSync, serverTimestamp, updateDoc } from "firebase/firestore";
import { FormEvent, useContext, useRef, useState } from "react";
import Modal from 'react-modal';
import { AuthContext } from '@/hooks/authContext';

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

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  data: OrderProps | null;
}

import { Container } from './styles';

export function NewTransactionModal({ data, isOpen, onRequestClose }: NewTransactionModalProps) {
  const [idFuncional, setIDFuncional] = useState('');
  const [nomeServidor, setNomeServidor] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataAssoc, setDataAssoc] = useState('');
  const [catAssoc, setCatAssoc] = useState('');
  const [matricula, setMatricula] = useState('');
  const [condicao, setCondicao] = useState('');
  const [cargo, setCargo] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [bairro, setBairro] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [cep, setCep] = useState('');

  const { user } = useContext(AuthContext);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const dataProps = {
      idFuncional,
      nomeServidor,
      cpf,
      dataAssoc,
      catAssoc,
      matricula,
      condicao,
      cargo,
      email,
      endereco,
      telefone,
      bairro,
      municipio,
      cep
    };

    const db = getFirestore(app);
    const frankDocRef = doc(db, "users", `${data?.id}`);

    await updateDoc(frankDocRef, {
      idFuncional: idFuncional ? idFuncional : data?.idFuncional,
      nomeServidor: nomeServidor ? nomeServidor : data?.nomeServidor,
      cpf: cpf ? cpf : data?.cpf,
      dataAssoc: dataAssoc ? dataAssoc : data?.dataAssoc,
      catAssoc: catAssoc ? catAssoc : data?.catAssoc,
      matricula: matricula ? matricula : data?.matricula,
      condicao: condicao ? condicao : data?.condicao,
      cargo: cargo ? cargo : data?.cargo,
      email: email ? email : data?.email,
      endereco: endereco ? endereco : data?.endereco,
      telefone: telefone ? telefone : data?.telefone,
      bairro: bairro ? bairro : data?.bairro,
      municipio: municipio ? municipio : data?.municipio,
      cep: cep ? cep : data?.cep,
      usuario: user?.email,
    });

    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container onSubmit={handleSubmit}>
        <h2>Atualizar Associado</h2>
        <input placeholder="ID Funcional" name="idFuncional" defaultValue={data?.idFuncional || idFuncional} onChange={e => setIDFuncional(e.currentTarget.value)} />
        <input placeholder="Nome Completo" defaultValue={data?.nomeServidor} onChange={e => setNomeServidor(e.target.value)} />
        <input placeholder="CPF" defaultValue={data?.cpf} onChange={e => setCpf(e.target.value)} />
        <input placeholder="Data Assoc." defaultValue={data?.dataAssoc} onChange={e => setDataAssoc(e.target.value)} />
        <input placeholder="Cat. Assoc." defaultValue={data?.catAssoc} onChange={e => setCatAssoc(e.target.value)} />
        <input placeholder="Matrícula" defaultValue={data?.matricula} onChange={e => setMatricula(e.target.value)} />
        <input placeholder="Condição" defaultValue={data?.condicao} onChange={e => setCondicao(e.target.value)} />
        <input placeholder="Cargo" defaultValue={data?.cargo} onChange={e => setCargo(e.target.value)} />
        <input placeholder="E-mail" defaultValue={data?.email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Endereço" defaultValue={data?.endereco} onChange={e => setEndereco(e.target.value)} />
        <input placeholder="Telefone" defaultValue={data?.telefone} onChange={e => setTelefone(e.target.value)} />
        <input placeholder="Bairro" defaultValue={data?.bairro} onChange={e => setBairro(e.target.value)} />
        <input placeholder="Município" defaultValue={data?.municipio} onChange={e => setMunicipio(e.target.value)} />
        <input placeholder="CEP" defaultValue={data?.cep} onChange={e => setCep(e.target.value)} />
        <button type="submit">Atualizar</button>
      </Container>
    </Modal >
  )
}


