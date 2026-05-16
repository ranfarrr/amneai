import { GitBranch } from 'lucide-react';
import BaseCard from './BaseCard';

export default function DataFlowCard({ dataFlow }) {
  return (
    <BaseCard icon={GitBranch} title="Data Flow">
      <ol className="space-y-3">
        {dataFlow.map((step, index) => (
          <li key={index} className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary bg-opacity-20 text-primary flex items-center justify-center text-sm font-semibold">
              {index + 1}
            </span>
            <span className="text-slate-300 leading-relaxed">{step}</span>
          </li>
        ))}
      </ol>
    </BaseCard>
  );
}

// Made with Bob
