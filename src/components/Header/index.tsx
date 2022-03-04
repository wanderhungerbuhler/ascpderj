import React, { useContext } from 'react';
import { Avatar, Box, Button, Flex, HStack, Icon, IconButton } from '@chakra-ui/react';


import Image from 'next/image';

import { GrPowerShutdown } from 'react-icons/gr';

import logoSvg from '@/assets/logo.svg';
import { AuthContext } from '@/hooks/authContext';
import { RiLogoutBoxRLine } from 'react-icons/ri';

export function Header() {
  const { logOut, user } = useContext(AuthContext);

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
      justifyContent="space-around"
      alignItems="center"
    >
      <Image src={logoSvg} width={170} height={90} />

      <Box display="flex" justifyContent="center" alignItems="center">
        <HStack borderRightWidth={1} borderColor="gray.700">
          <Avatar name={user?.email} src={user?.photoURL} mr="2" />
        </HStack>

        <Button
          type="submit"
          aria-label='Search database'
          as="button"
          size="sm"
          ml="2"
          mr="1"
          borderRadius={100}
          fontSize="sm"
          bg="none"
          leftIcon={<RiLogoutBoxRLine fontSize={17} />}
          cursor="pointer"
          outline="none"
          _focus={{
            outline: "none"
          }}
          _hover={{
            bgColor: "gray.500"
          }}
          onClick={logOut}
        >Sair</Button>
      </Box>

    </Flex >
  )
}
