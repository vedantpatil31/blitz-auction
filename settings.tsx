// web/src/pages/settings.tsx
import { AppLayout } from '../components/layout/AppLayout';

export default function SettingsPage() {
  return (
    <AppLayout>
      <h1 className="text-xl font-semibold text-slate-100 mb-2">Settings</h1>
      <p className="text-xs text-slate-500 mb-4">
        Optional controls for demo. In a full product, this is where you would
        manage preferences, gas settings, and notification rules.
      </p>
      <div className="rounded-2xl bg-slate-950/70 border border-slate-800 p-4 text-sm text-slate-300">
        <p className="mb-2">Nothing to configure yet.</p>
        <p className="text-slate-500 text-xs">
          Keep the focus on the Blitz Arena and parallelism demo.
        </p>
      </div>
    </AppLayout>
  );
}