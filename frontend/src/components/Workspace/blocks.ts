export const blocks = [
  {
    "type": "field_chain",
    "tooltip": "select chain",
    "helpUrl": "",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "chain",
        "options": [
          [
            "Ethereum Sepolia",
            "sepolia"
          ],
          [
            "Arbitrum Testnet",
            "arbitrumSepolia"
          ],
          [
            "Base Testnet",
            "baseSepolia"
          ],
          [
            "Optimism Testnet",
            "optimismSepolia"
          ]
        ]
      },
      {
        "type": "input_dummy",
        "name": "chain",
        "align": "RIGHT"
      }
    ],
    "output": ["sepolia", "arbitrumSepolia", "baseSepoliat", "optimismSepolia"],
    "colour": 165,
    "inputsInline": false
  },
  {
    "type": "field_token",
    "tooltip": "select token",
    "helpUrl": "",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "token",
        "options": [
          [
            "ETH",
            "eth"
          ],
          [
            "USDC",
            "usdc"
          ],
          [
            "TKNA",
            "tkna"
          ],
          [
            "TKNB",
            "tknb"
          ]
        ]
      },
      {
        "type": "input_dummy",
        "name": "token",
        "align": "RIGHT"
      }
    ],
    "output": ["eth", "usdc", "tkna", "tknb"],
    "colour": 165,
    "inputsInline": false
  },
  {
    "type": "field_bigint",
    "tooltip": "typing big number",
    "helpUrl": "",
    "message0": "Amount %1 with decimal %2 %3",
    "args0": [
      {
        "type": "field_number",
        "name": "amount",
        "value": 0
      },
      {
        "type": "field_number",
        "name": "decimal",
        "value": 0,
        "min": 0,
        "max": 18,
        "precision": 1
      },
      {
        "type": "input_dummy",
        "name": "token",
        "align": "RIGHT"
      }
    ],
    "output": "BigInt",
    "colour": 165,
    "inputsInline": false
  },
  {
    "type": "start",
    "tooltip": "",
    "helpUrl": "",
    "message0": "Start on chain %1 %2 End %3",
    "args0": [
      {
        "type": "input_value",
        "name": "chain",
        "check": ["sepolia", "arbitrumSepolia", "baseSepoliat", "optimismSepolia"]
      },
      {
        "type": "input_statement",
        "name": "operations"
      },
      {
        "type": "input_end_row",
        "name": "NAME"
      }
    ],
    "colour": 225
  },
  {
    "type": "send_operations",
    "tooltip": "",
    "helpUrl": "",
    "message0": "Send operations to %1 Chain %2 Do %3",
    "args0": [
      {
        "type": "input_dummy",
        "name": "label"
      },
      {
        "type": "input_value",
        "name": "chain",
        "align": "RIGHT",
        "check": ["sepolia", "arbitrumSepolia", "baseSepoliat", "optimismSepolia"]
      },
      {
        "type": "input_statement",
        "name": "operations",
        "align": "RIGHT"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 225
  },
  {
    "type": "bridge_token",
    "tooltip": "Bridge token",
    "helpUrl": "",
    "message0": "Bridge token to %1 Chain  %2 Token %3 Amount %4 Do %5",
    "args0": [
      {
        "type": "input_dummy",
        "name": "label"
      },
      {
        "type": "input_value",
        "name": "chain",
        "align": "RIGHT",
        "check": ["sepolia", "arbitrumSepolia", "baseSepoliat", "optimismSepolia"]
      },
      {
        "type": "input_value",
        "name": "token",
        "align": "RIGHT",
        "check": ["eth", "usdc", "tkna", "tknb"]
      },
      {
        "type": "input_value",
        "name": "amount",
        "align": "RIGHT",
        "check": "BigInt"
      },
      {
        "type": "input_statement",
        "name": "operations"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 225,
    "inputsInline": false
  },
  {
    "type": "variable_get",
    "tooltip": "get variable",
    "helpUrl": "",
    "message0": "Get %1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "variables",
        "options": [
          [
            "A",
            "0"
          ],
          [
            "B",
            "1"
          ],
          [
            "C",
            "2"
          ],
          [
            "D",
            "3"
          ]
        ]
      },
      {
        "type": "input_dummy",
        "name": "NAME"
      }
    ],
    "output": null,
    "colour": 45
  },
  {
    "type": "variable_set",
    "tooltip": "",
    "helpUrl": "",
    "message0": "Set %1 to %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "variable",
        "options": [
          [
            "A",
            "0"
          ],
          [
            "B",
            "1"
          ],
          [
            "C",
            "2"
          ],
          [
            "D",
            "3"
          ]
        ]
      },
      {
        "type": "input_value",
        "name": "call"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 45
  },
  {
    "type": "call",
    "tooltip": "",
    "helpUrl": "",
    "message0": "Call %1",
    "args0": [
      {
        "type": "input_value",
        "name": "call"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 45
  },
  {
    "type": "amm_swap",
    "tooltip": "",
    "helpUrl": "",
    "message0": "Swap token %1 for token %2 with amount %3",
    "args0": [
      {
        "type": "input_value",
        "name": "input_token",
        "align": "RIGHT",
        "check": ["eth", "usdc", "tkna", "tknb"]
      },
      {
        "type": "input_value",
        "name": "output_token",
        "align": "RIGHT",
        "check": ["eth", "usdc", "tkna", "tknb"]
      },
      {
        "type": "input_value",
        "name": "amount",
        "align": "RIGHT",
        "check": "BigInt"
      }
    ],
    "output": null,
    "colour": 300
  }
]
