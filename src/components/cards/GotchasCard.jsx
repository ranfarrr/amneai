import { AlertTriangle } from 'lucide-react';
import BaseCard from './BaseCard';

export default function GotchasCard({ gotchas }) {
  return (
    <BaseCard icon={AlertTriangle} title="Gotchas & Pitfalls" className="border-warning">
      <div className="space-y-3">
        {gotchas.map((gotcha, index) => (
          <div 
            key={index} 
            className="bg-warning bg-opacity-10 border border-warning border-opacity-30 rounded-lg p-4"
          >
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-200 leading-relaxed">{gotcha}</p>
            </div>
          </div>
        ))}
      </div>
    </BaseCard>
  );
}

// Made with Bob
