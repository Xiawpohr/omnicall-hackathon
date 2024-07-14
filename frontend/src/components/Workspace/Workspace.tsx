"use client"

import { Box, Button, Flex, Spacer } from "@chakra-ui/react"
import { useRef } from "react"
import { useBlocklyWorkspace } from "react-blockly"
import * as Blockly  from "blockly"
import { blocks } from "./blocks"
import { toolbox } from "./toolbox"
import { omnicallAstGenerator } from "./generator"
import encodeOmnicallData from "@/utils/encodeOmnicallData"

Blockly.defineBlocksWithJsonArray(blocks)

export default function Workspace() {
  const blocklyRef = useRef(null)

  const { workspace } = useBlocklyWorkspace({
    ref: blocklyRef,
    toolboxConfiguration: toolbox,
    workspaceConfiguration: {}
  })

  const send = () => {
    if (!workspace) {
      return
    }
    const code = omnicallAstGenerator.workspaceToCode(workspace)
    console.log(code)

    const codeJson = JSON.parse(code)
    const encoded = encodeOmnicallData(codeJson)
  }

  return (
    <Box h="100%">
      <Flex px={6} py={2} borderBottomWidth={1} borderBottomColor='gray.200'>
        <Spacer />
        <Button colorScheme='blue' onClick={send}>Send</Button>
      </Flex>
      <Box ref={blocklyRef} h="calc(100% - 57px)"/>
    </Box>
  )
}
