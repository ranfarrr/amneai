import { MapPin } from 'lucide-react';
import BaseCard from './BaseCard';

export default function EntryPointsCard({ entryPoints }) {
  return (
    <BaseCard icon={MapPin} title="Entry Points">
      <div className="space-y-3">
        {Object.entries(entryPoints).map(([task, description]) => (
          <div key={task} className="bg-slate-700 bg-opacity-50 rounded-lg p-4 border border-slate-600">
            <h4 className="text-sm font-semibold text-secondary mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="capitalize">{task.replace(/_/g, ' ')}</span>
            </h4>
            <p className="text-sm text-slate-300 pl-6">{description}</p>
          </div>
        ))}
      </div>
    </BaseCard>
  );
}

// Made with Bob
