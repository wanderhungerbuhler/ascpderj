import type { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '@/hooks/authContext';

import { theme } from '@/styles/theme';
import GlobalStyles from '@/styles/globalStyles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
        <GlobalStyles />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
