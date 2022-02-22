import { createContext, ReactNode, useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/router";
import app from '../../services/firebaseConfig';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

interface AuthProvider {
  children: ReactNode;
}

interface User {
  uid: string;
  email: string;
}

interface AuthContextDate {
  logOUt(): Promise<void>;
  isAuthenticated: boolean;
  user: User | null;
};

export const AuthContext = createContext<AuthContextDate>({} as AuthContextDate);

export function AuthProvider({ children }: AuthProvider) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = false;

  async function logOUt() {
    getAuth(app).signOut();
    router.push('/');
  }

  useEffect(() => {
    getAuth(app).onAuthStateChanged((user) => {
      setUser(user as any);
    });

    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/', '/');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, logOUt, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
