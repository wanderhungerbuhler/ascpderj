import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';

import { Header } from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default function Usuarios() {
  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1280} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius="8" bg="gray.800" p="8" ml="12">
          <Flex mb="8" justifyContent="space-between" align="center">
            <Heading size="lg">Usuários</Heading>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
