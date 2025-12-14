// web/src/components/HeroSection.tsx
import { useRouter } from 'next/router';

export function HeroSection() {
  const router = useRouter();

  return (
    <section className="flex flex-col lg:flex-row items-center justify-between gap-10 py-16">
      <div className="max-w-xl space-y-5">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-200">
          Parallel Auction Engine
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Live on Monad Testnet
        </span>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-50">
          Real-time blitz auctions,
          <span className="text-cyan-300"> in parallel</span>.
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-md">
          Watch manual traders and autonomous agents compete across multiple
          on-chain auctions, updating in the same block on Monad&apos;s
          parallel EVM.
        </p>
        <p className="text-xs text-slate-500">
          Built for Monad evm/accathon · Inspired by high-frequency markets
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => router.push('/dashboard')}
            className="px-5 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-medium text-sm hover:bg-cyan-300 transition shadow-[0_0_25px_rgba(34,211,238,0.45)]"
          >
            Enter Blitz Arena
          </button>
          <button
            onClick={() => router.push('/dashboard#metrics')}
            className="px-5 py-2.5 rounded-xl bg-slate-900/70 border border-slate-700 text-slate-200 text-sm hover:border-cyan-400 hover:text-cyan-200 transition"
          >
            View Parallel Metrics
          </button>
        </div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="absolute -inset-10 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />
        <div className="relative rounded-2xl border border-slate-800 bg-slate-950/70 backdrop-blur-xl shadow-2xl p-4">
          <div className="flex justify-between items-center mb-3 text-xs text-slate-400">
            <span>Blitz Auction Demo</span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Live
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-300 font-medium">Auction A</span>
                <span className="text-[10px] text-emerald-400">Agents</span>
              </div>
              <p className="text-[11px] text-slate-400 mb-1">
                Cool NFT · 00:12 left
              </p>
              <p className="text-lg font-semibold text-cyan-300">1.24 MON</p>
            </div>
            <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-300 font-medium">Auction B</span>
                <span className="text-[10px] text-sky-400">Manual</span>
              </div>
              <p className="text-[11px] text-slate-400 mb-1">
                Rare Comic · 00:19 left
              </p>
              <p className="text-lg font-semibold text-cyan-300">0.87 MON</p>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-slate-950/80 border border-slate-800 p-3 space-y-1.5">
            <p className="text-[11px] text-slate-400 mb-1">Auction Log</p>
            <div className="space-y-1.5 text-[11px] font-mono text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">12:30:01</span>
                <span className="text-slate-200">A · AutoBid → 1.24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">12:30:01</span>
                <span className="text-slate-200">B · Manual → 0.87</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">12:29:59</span>
                <span className="text-slate-200">A · AutoBid → 1.14</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}