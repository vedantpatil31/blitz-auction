// web/src/utils/formatting.ts

export function formatEth(value: bigint | number, decimals = 4): string {
  const num =
    typeof value === 'bigint'
      ? Number(value) / 1e18
      : Number(value);
  if (!isFinite(num)) return '0';
  return num.toFixed(decimals);
}

export function formatTimeLeft(endTime: bigint | number): string {
  const end =
    typeof endTime === 'bigint' ? Number(endTime) * 1000 : Number(endTime) * 1000;
  const now = Date.now();
  const diff = Math.max(0, end - now);
  const totalSeconds = Math.floor(diff / 1000);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  const mm = m.toString().padStart(2, '0');
  const ss = s.toString().padStart(2, '0');
  return `${mm}:${ss}`;
}

export function formatNumber(num: number): string {
  return num.toLocaleString();
}