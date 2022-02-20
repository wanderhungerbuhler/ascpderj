import GlobalStyles from '@/styles/globalStyles';
import { ChakraProvider } from '@chakra-ui/react';

import type { AppProps } from 'next/app';

import Home from '@/pages/index'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <GlobalStyles />
      <Component {...pageProps} />
    </ChakraProvider>
  )

}

export default MyApp
