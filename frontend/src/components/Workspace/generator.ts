import * as Blockly from 'blockly'
import { parseUnits } from 'viem'

const Order = {
  ATOMIC: 0,
};

export const omnicallAstGenerator = new Blockly.Generator('OmnicallAST')

omnicallAstGenerator.forBlock['field_chain'] = function(block) {
  const chainValue = block.getFieldValue('chain')
  const code = JSON.stringify({
    type: 'chain',
    value: chainValue
  })
  return [code, Order.ATOMIC]
}

omnicallAstGenerator.forBlock['field_token'] = function(block) {
  const tokenValue = block.getFieldValue('token')
  const code = JSON.stringify({
    type: 'token',
    value: tokenValue
  })
  return [code, Order.ATOMIC]
}

omnicallAstGenerator.forBlock['field_bigint'] = function(block) {
  const amount = block.getFieldValue('amount')
  const decimal = block.getFieldValue('decimal')
  const code = JSON.stringify({
    type: 'bigint',
    value: parseUnits(String(amount), Number(decimal)).toString()
  })
  return [code, Order.ATOMIC]
}

omnicallAstGenerator.forBlock['start'] = function (block, generator) {
  const chainValue = generator.valueToCode(block, 'chain', Order.ATOMIC);
  const chain = JSON.parse(chainValue)
  const operationsValue = generator.statementToCode(block, 'operations')
  const operations = JSON.parse(operationsValue)
  return JSON.stringify({
    type:'start',
    inputs: [
      chain,
      operations
    ]
  })
}

omnicallAstGenerator.forBlock['send_operations'] = function (block, generator) {
  const chainValue = generator.valueToCode(block, 'chain', Order.ATOMIC)
  const chain = JSON.parse(chainValue)
  const operationsValue = generator.statementToCode(block, 'operations')
  const operations = JSON.parse(operationsValue)
  return JSON.stringify({
    type:'send_operations',
    inputs: [
      chain,
      operations
    ]
  })
}

omnicallAstGenerator.forBlock['bridge_token'] = function (block, generator) {
  const chainValue = generator.valueToCode(block, 'chain', Order.ATOMIC)
  const chain = JSON.parse(chainValue)
  const tokenValue = generator.valueToCode(block, 'token', Order.ATOMIC)
  const token = JSON.parse(tokenValue)
  const amountValue = generator.valueToCode(block, 'amount', Order.ATOMIC)
  const amount = JSON.parse(amountValue)
  const operationsValue = generator.statementToCode(block, 'operations')
  const operations = JSON.parse(operationsValue)
  return JSON.stringify({
    type: 'bridge_token',
    inputs: [
      chain,
      token,
      amount,
      operations,
    ]
  })
}

omnicallAstGenerator.forBlock['call'] = function (block, generator) {
  const callValue = generator.valueToCode(block, 'call', Order.ATOMIC)
  const call = JSON.parse(callValue)
  return JSON.stringify({
    type: 'call',
    ...call
  })
}

omnicallAstGenerator.forBlock['variable_set'] = function (block, generator) {
  const variable = block.getFieldValue('variable')
  const callValue = generator.valueToCode(block, 'call', Order.ATOMIC)
  const call = JSON.parse(callValue)
  return JSON.stringify({
    type: 'variable_set',
    ...call,
    output: {
      heapAddress: variable,
      startIndex: 0,
    }
  })
}

omnicallAstGenerator.forBlock['variable_get'] = function (block) {
  const variable = block.getFieldValue('variable')
  const code = JSON.stringify({
    type: 'variable_get',
    value: variable
  })
  return [
    code,
    Order.ATOMIC
  ]
}

omnicallAstGenerator.forBlock['amm_swap'] = function (block, generator) {
  const inputTokenValue = generator.valueToCode(block, 'input_token', Order.ATOMIC)
  const inputToken = JSON.parse(inputTokenValue)
  const outputTokenValue = generator.valueToCode(block, 'output_token', Order.ATOMIC)
  const outputToken = JSON.parse(outputTokenValue)
  const amountValue = generator.valueToCode(block, 'amount', Order.ATOMIC)
  const amount = JSON.parse(amountValue)
  const code = JSON.stringify({
    type: 'call',
    target: '',
    value: undefined,
    inputs: [
      inputToken,
      outputToken,
      amount
    ]
  })
  return [
    code,
    Order.ATOMIC
  ]
}
