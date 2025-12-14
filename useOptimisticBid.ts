// web/src/hooks/useOptimisticBid.ts
import { useState } from 'react';

// Demo-safe stub: no wagmi, no async, no contract calls.
export function useOptimisticBid(_auctionId: number) {
  const [pending, setPending] = useState(false);

  function placeBid(_valueEth: string) {
    if (pending) return;
    // Simulate instantaneous success without side effects
    setPending(true);
    // Immediately clear (no async/await)
    setPending(false);
  }

  return { pending, placeBid };
}