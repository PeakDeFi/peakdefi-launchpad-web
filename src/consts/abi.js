export const SALE_ABI = `[
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "tierWeights",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "tierPoints",
				"type": "uint256[]"
			}
		],
		"name": "addTiers",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "calculateTokenForTier",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "depositTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "extrimalWithdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "numberOfWinners",
				"type": "uint256"
			}
		],
		"name": "make_lottary",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "participate",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "registerForSale",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "amountPaid",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timeParticipated",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tierId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "userWallet",
						"type": "address"
					}
				],
				"internalType": "struct PeakDefiSale.ParticipationCreate[]",
				"name": "usersData",
				"type": "tuple[]"
			}
		],
		"name": "setParticipatedExternal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_registrationTimeStarts",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_registrationTimeEnds",
				"type": "uint256"
			}
		],
		"name": "setRegistrationTime",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenPriceInBUSD",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amountOfTokensToSell",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_saleStart",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_saleEnd",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_tokensUnlockTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_minimumTokenDeposit",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isBSCNetwork",
				"type": "bool"
			}
		],
		"name": "setSaleParams",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_saleStart",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_saleEnd",
				"type": "uint256"
			}
		],
		"name": "setSaleTime",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "userWallet",
						"type": "address"
					}
				],
				"internalType": "struct PeakDefiSale.UserStake[]",
				"name": "usersStake",
				"type": "tuple[]"
			}
		],
		"name": "setUserDeposit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "_unlockingTimes",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_percents",
				"type": "uint256[]"
			}
		],
		"name": "setVestingParams",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "users",
				"type": "address[]"
			},
			{
				"internalType": "uint256",
				"name": "tierId",
				"type": "uint256"
			}
		],
		"name": "setWhitelistUsers",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_admin",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_allocationStaking",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "updateTokenPriceInBUSD",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawEarnings",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawLeftover",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawLeftOverUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "portionIds",
				"type": "uint256[]"
			}
		],
		"name": "withdrawMultiplePortions",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "portionId",
				"type": "uint256"
			}
		],
		"name": "withdrawTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "addressToRoundRegisteredFor",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "allocationStakingContract",
		"outputs": [
			{
				"internalType": "contract IAllocationStaking",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "BUSDToken",
		"outputs": [
			{
				"internalType": "contract IERC20Extented",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenPercent",
				"type": "uint256"
			}
		],
		"name": "calculateAmountWithdrawingPortionPub",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getClaimedInfo",
		"outputs": [
			{
				"internalType": "bool[]",
				"name": "",
				"type": "bool[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getVestingInfo",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isParticipated",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isWhitelisted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "loteryWallets",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "numberOfParticipants",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "registration",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "registrationTimeStarts",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "registrationTimeEnds",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "numberOfRegistrants",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sale",
		"outputs": [
			{
				"internalType": "contract IERC20Extented",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "isCreated",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "earningsWithdrawn",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "leftoverWithdrawn",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "tokenPriceInBUST",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountOfTokensToSell",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalBUSDRaised",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "saleEnd",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "saleStart",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokensUnlockTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "minimumTokenDeposit",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "configRunned",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isBSCNetwork",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tierIdToTier",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "participants",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tierWeight",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "BUSTDeposited",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "minToStake",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "maxToStake",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenForTier",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokensDeposited",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalTierWeight",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "unSoldToken",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userToParticipation",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amountPaid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timeParticipated",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tierId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isTokenLeftWithdrawn",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userToStakeInfo",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "userWallet",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "vestingPercentPerPortion",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "vestingPortionsUnlockTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "Whitelist",
		"outputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "userTierId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "allowToBuy",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]`

export const TOKEN_ABI = `[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]`

export const REFERRAL_ABI = `[
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_isContractActive",
				"type": "bool"
			}
		],
		"name": "changeContractActive",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_moderator",
				"type": "address"
			}
		],
		"name": "changeModerator",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_updatePrice",
				"type": "uint256"
			}
		],
		"name": "changeUpdatePrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claimReward",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_rewardDecrease",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_refferals",
				"type": "uint256"
			}
		],
		"name": "decreaseUserReward",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "extrimalWithdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "fundReward",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_rewardIncrease",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_refferals",
				"type": "uint256"
			}
		],
		"name": "increaseUserReward",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "requestUpdate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_erc20",
				"type": "address"
			}
		],
		"name": "setRewardToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "_users",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_rewards",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_numberOfRefferal",
				"type": "uint256[]"
			}
		],
		"name": "setUserReward",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_updateCommission",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_isContractActive",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "get_contract_info",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get_contract_info_admin",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isContractActive",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "updateCommission",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userInfo",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "reward",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalEarned",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "numberOfRefferal",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]`

export const  FAKE_CONTRACT = `[
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "tierWeights",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "tierPoints",
				"type": "uint256[]"
			}
		],
		"name": "addTiers",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "calculateTokenForTier",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "depositTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "extrimalWithdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "participate",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "registerForSale",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_registrationTimeStarts",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_registrationTimeEnds",
				"type": "uint256"
			}
		],
		"name": "setRegistrationTime",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_saleOwner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenPriceInBUSD",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amountOfTokensToSell",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_saleStart",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_saleEnd",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_tokensUnlockTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_minimumTokenDeposit",
				"type": "uint256"
			}
		],
		"name": "setSaleParams",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "_unlockingTimes",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_percents",
				"type": "uint256[]"
			}
		],
		"name": "setVestingParams",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "users",
				"type": "address[]"
			},
			{
				"internalType": "uint256",
				"name": "tierId",
				"type": "uint256"
			}
		],
		"name": "setWhitelistUsers",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_admin",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_allocationStaking",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "updateTokenPriceInBUSD",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawEarnings",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawLeftover",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "portionIds",
				"type": "uint256[]"
			}
		],
		"name": "withdrawMultiplePortions",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "portionId",
				"type": "uint256"
			}
		],
		"name": "withdrawTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "portionId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenToWithdraw",
				"type": "uint256"
			}
		],
		"name": "withdrawTokensFirstPortion",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "addressToRoundRegisteredFor",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "allocationStakingContract",
		"outputs": [
			{
				"internalType": "contract IAllocationStaking",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "BUSDToken",
		"outputs": [
			{
				"internalType": "contract IERC20Extented",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenPercent",
				"type": "uint256"
			}
		],
		"name": "calculateAmountWithdrawingPortionPub",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getVestingInfo",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isParticipated",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isWhitelisted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "loteryWallets",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "numberOfParticipants",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "registration",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "registrationTimeStarts",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "registrationTimeEnds",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "numberOfRegistrants",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sale",
		"outputs": [
			{
				"internalType": "contract IERC20Extented",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "isCreated",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "earningsWithdrawn",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "leftoverWithdrawn",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "saleOwner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenPriceInBUST",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountOfTokensToSell",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalBUSDRaised",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "saleEnd",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "saleStart",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokensUnlockTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "minimumTokenDeposit",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "configRunned",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tierIdToTier",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "participants",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tierWeight",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "BUSTDeposited",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "minToStake",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "maxToStake",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenForTier",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokensDeposited",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalTierWeight",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "unSoldToken",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userToParticipation",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amountPaid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timeParticipated",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tierId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isTokenLeftWithdrawn",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "vestingPercentPerPortion",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "vestingPortionsUnlockTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "Whitelist",
		"outputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "userTierId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "allowToBuy",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]`