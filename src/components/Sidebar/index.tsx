import React from 'react';
import { Box, Stack, Text, Icon, Link as ChrackraLink } from '@chakra-ui/react';

import { RiContactsLine, RiDashboard2Line, RiMoneyDollarBoxLine } from 'react-icons/ri';
import { ActiveLink } from '../ActiveLink';

export default function Sidebar() {
  return (
    <Box as="aside" w="auto" height="500" bg="gray.800" mx="auto" p="7" borderRadius="8">
      <Stack spacing="12" align="flex-start">
        <Box>
          <Text fontWeight="bold" color="gray.400" fontSize="small">GERAL</Text>
          <Stack spacing="4" mt="8" align="stretch">
            <ActiveLink href="/dashboard" passHref>
              <ChrackraLink display="flex" alignItems="center">
                <Icon as={RiDashboard2Line} fontSize="20" />
                <Text ml="4" fontWeight="medium">Dashboard</Text>
              </ChrackraLink>
            </ActiveLink>
          </Stack>
        </Box>

        <Box>
          <Text fontWeight="bold" color="gray.400" fontSize="small">CADASTRAR</Text>
          <Stack spacing="4" mt="8" align="stretch">
            <ActiveLink href="/cadastrar/vencimentos" passHref>
              <ChrackraLink display="flex" alignItems="center">
                <Icon as={RiMoneyDollarBoxLine} fontSize="20" />
                <Text ml="4" fontWeight="medium">Vencimentos</Text>
              </ChrackraLink>
            </ActiveLink>

            <ActiveLink href="#" passHref>
              <ChrackraLink display="flex" alignItems="center">
                <Icon as={RiMoneyDollarBoxLine} fontSize="20" />
                <Text ml="4" fontWeight="medium">Pagamentos</Text>
              </ChrackraLink>
            </ActiveLink>
          </Stack>
        </Box>

        <Box>
          <Text fontWeight="bold" color="gray.400" fontSize="small">HISTÓRICOS</Text>
          <Stack spacing="4" mt="8" align="stretch">
            <ActiveLink href="/historico/vencimentos" passHref>
              <ChrackraLink display="flex" alignItems="center">
                <Icon as={RiMoneyDollarBoxLine} fontSize="20" />
                <Text ml="4" fontWeight="medium">Vencimentos</Text>
              </ChrackraLink>
            </ActiveLink>

            <ActiveLink href="#" passHref>
              <ChrackraLink display="flex" alignItems="center">
                <Icon as={RiMoneyDollarBoxLine} fontSize="20" />
                <Text ml="4" fontWeight="medium">Pagamentos</Text>
              </ChrackraLink>
            </ActiveLink>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}
