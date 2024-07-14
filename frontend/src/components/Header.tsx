'use client'

import { Flex, Spacer, Text } from '@chakra-ui/react'
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export default function Header() {
  return (
    <Flex as='header' px={6} py={2} borderBottomWidth={1} borderBottomColor='gray.200'>
      <Text as='h1' fontSize='3xl'>Omnicall</Text>
      <Spacer />
      <DynamicWidget />
    </Flex>
  )
}
