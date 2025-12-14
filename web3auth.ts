// web/src/utils/web3auth.ts
import { Web3Auth } from '@web3auth/modal';
import { CHAIN_NAMESPACES, IProvider, WALLET_ADAPTERS } from '@web3auth/base';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';

const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID || 'BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ';

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: '0x27A5', // 10143 in hex - Monad Testnet
  rpcTarget: 'https://testnet-rpc.monad.xyz',
  displayName: 'Monad Testnet',
  blockExplorer: 'https://testnet.monadscan.io',
  ticker: 'MON',
  tickerName: 'Monad',
};

// Extended class to fix the TS2741 error by implementing the missing currentChain property
class FixedEthereumPrivateKeyProvider extends EthereumPrivateKeyProvider {
  public currentChain: string = chainConfig.chainId;
  
  constructor(options: any) {
    super(options);
    this.currentChain = chainConfig.chainId;
  }
}

const privateKeyProvider = new FixedEthereumPrivateKeyProvider({
  config: { chainConfig },
});

export const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: 'sapphire_devnet', // Use 'sapphire_mainnet' for production
  chainConfig,
  privateKeyProvider,
  uiConfig: {
    appName: 'BidStream',
    mode: 'dark',
    loginMethodsOrder: ['google', 'apple', 'github', 'twitter'],
    defaultLanguage: 'en',
    theme: {
      primary: '#22d3ee', // cyan-400
    },
  },
});

export async function initWeb3Auth() {
  try {
    await web3auth.initModal();
    return web3auth;
  } catch (error) {
    console.error('Error initializing Web3Auth:', error);
    throw error;
  }
}

export async function loginWithEmail() {
  try {
    const provider = await web3auth.connect();
    return provider;
  } catch (error) {
    console.error('Error logging in with email:', error);
    throw error;
  }
}

export async function loginWithSocial(loginProvider: 'google' | 'apple' | 'github' | 'twitter') {
  try {
    const provider = await web3auth.connectTo(WALLET_ADAPTERS.AUTH, {
      loginProvider,
    });
    return provider;
  } catch (error) {
    console.error(`Error logging in with ${loginProvider}:`, error);
    throw error;
  }
}

export async function getUserInfo() {
  try {
    const user = await web3auth.getUserInfo();
    return user;
  } catch (error) {
    console.error('Error getting user info:', error);
    return null;
  }
}

export async function logout() {
  try {
    await web3auth.logout();
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
}

export function getProvider(): IProvider | null {
  return web3auth.provider;
}

export function isConnected(): boolean {
  return web3auth.connected;
}