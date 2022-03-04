import { createContext, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import app from '../../services/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { collection, getFirestore, limit, onSnapshot, orderBy, query } from "firebase/firestore";

interface AuthProvider {
  children: ReactNode;
}

interface User {
  uid: string;
  email: string;
  photoURL: string;
}

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

interface AuthContextDate {
  logOut(): Promise<void>;
  isAuthenticated: boolean;
  user: User | null;
  tV: OrderProps[] | null;
};

export const AuthContext = createContext<AuthContextDate>({} as AuthContextDate);

export function AuthProvider({ children }: AuthProvider) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = false;

  const [tV, setTv] = useState<OrderProps[] | null>(null);

  useEffect(() => {
    const db = getFirestore(app)
    onSnapshot(query(collection(db, "associates"), orderBy("nomeServidor"), limit(25)), snap => {
      const data = snap.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
      setTv(data as any);
    })

    const subscriber = getAuth(app).onAuthStateChanged((user) => {
      setUser(user as any);
    });

    { user ? router.push('/dashboard') : router.push('/') }

    return subscriber;

  }, [user]);

  async function logOut() {
    getAuth(app).signOut();
    router.push('/');
  }

  return (
    <AuthContext.Provider value={{ user, logOut, tV, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
