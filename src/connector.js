import { InjectedConnector } from '@web3-react/injected-connector'

// Other possible connectors
// import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
// import { WalletLinkConnector } from '@web3-react/walletlink-connector';
// import { LedgerConnector } from '@web3-react/ledger-connector';
// import { BscConnector } from '@binance-chain/bsc-connector';

export const injected = new InjectedConnector({
  supportedChainIds: [97],
});

// refer to https://github.com/NoahZinsmeister/web3-react 
// for all available connectors