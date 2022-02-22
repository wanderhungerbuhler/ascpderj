import { AuthProvider } from '@/hooks/authContext';
import GlobalStyles from '@/styles/globalStyles';
import { ChakraProvider } from '@chakra-ui/react';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraProvider>
        <GlobalStyles />
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  )
}

export default MyApp
