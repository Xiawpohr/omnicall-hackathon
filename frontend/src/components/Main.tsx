'use client'

import { Box } from "@chakra-ui/react"
import { type ReactNode } from "react"

export default function Main({
  children
}: {
  children: ReactNode
}) {
  return (
    <Box as='main' h='calc(100vh - 77px)'>
      {children}
    </Box>
  )
}