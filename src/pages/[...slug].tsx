import { Button, Flex, IconButton } from '@chakra-ui/react';
import {
  Box,
  Text
} from '@chakra-ui/react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import app from '@/../services/firebaseConfig';
import { useRouter } from 'next/router';
import { VscFilePdf } from 'react-icons/vsc';
import { BiArrowBack } from 'react-icons/bi';
import { GetServerSideProps } from 'next';

interface OrderProps {
  associates: {
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
}

export default function AssocsPDF({ associates }: OrderProps) {
  const router = useRouter();

  return (
    <Flex width="100%" height="100%" mx="auto">
      <Box flex="1" borderRadius="8" color="gray.800" bg="gray.50" p="7" mx="auto">
        <Flex width="50%" height="50px" mx="auto" justifyContent="center" alignItems="center">
          <Button
            aria-label='Open PDF Associated'
            as="button"
            size="xs"
            mr="1"
            p="5"
            fontSize="sm"
            bg="gray.700"
            color="gray.50"
            leftIcon={<BiArrowBack fontSize={17} />}
            cursor="pointer"
            outline="none"
            _focus={{
              outline: "none"
            }}
            _hover={{
              bg: "gray.600"
            }}
            onClick={() => router.push('/dashboard')}
          >Voltar</Button>

          <Button
            aria-label='Open PDF Associated'
            as="button"
            size="xs"
            mr="1"
            p="5"
            fontSize="sm"
            bg="blue.700"
            color="gray.50"
            leftIcon={<VscFilePdf fontSize={17} />}
            cursor="pointer"
            outline="none"
            _focus={{
              outline: "none"
            }}
            _hover={{
              bg: "blue.600"
            }}
            onClick={() => window.print()}
          >imprimir</Button>
        </Flex>

        <Text fontWeight="bold">ID Funcional:</Text>
        <Text mb="4">{associates?.idFuncional}</Text>

        <Text fontWeight="bold">Nome Completo:</Text>
        <Text mb="4">{associates?.nomeServidor}</Text>

        <Text fontWeight="bold">CPF:</Text>
        <Text mb="4">{associates?.cpf}</Text>

        <Text fontWeight="bold">Data Associação:</Text>
        <Text mb="4">{associates?.dataAssoc}</Text>

        <Text fontWeight="bold">Categoria Associação:</Text>
        <Text mb="4">{associates?.catAssoc}</Text>

        <Text fontWeight="bold">Matrícula:</Text>
        <Text mb="4">{associates?.matricula}</Text>

        <Text fontWeight="bold">Condição:</Text>
        <Text mb="4">{associates?.condicao}</Text>

        <Text fontWeight="bold">Cargo:</Text>
        <Text mb="4">{associates?.cargo}</Text>

        <Text fontWeight="bold">E-mail:</Text>
        <Text mb="4">{associates?.email}</Text>

        <Text fontWeight="bold">Endereço:</Text>
        <Text mb="4">{associates?.endereco}</Text>

        <Text fontWeight="bold">Telefone:</Text>
        <Text mb="4">{associates?.telefone}</Text>

        <Text fontWeight="bold">Bairro:</Text>
        <Text mb="4">{associates?.bairro}</Text>

        <Text fontWeight="bold">Município:</Text>
        <Text mb="4">{associates?.municipio}</Text>

        <Text fontWeight="bold">CEP:</Text>
        <Text mb="4">{associates?.cep}</Text>
      </Box>
    </Flex>
  )
};


export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const [, q] = params?.slug as any;

  const db = getFirestore(app);
  const data = await getDoc(doc(db, "associates", `${q}`)).then(response => {
    return {
      id: response.id,
      ...response.data(),
    }
  })

  return {
    props: {
      associates: data,
    },

  }
}
