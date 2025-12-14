// web/src/utils/wagmiClient.ts
import { createConfig, http } from 'wagmi';
import { monadTestnet } from './chainConfig';

export const wagmiConfig = createConfig({
  chains: [monadTestnet],
  transports: {
    [monadTestnet.id]: http(),
  },
});

export { monadTestnet as chains };