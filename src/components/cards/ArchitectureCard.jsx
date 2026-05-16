import { Boxes } from 'lucide-react';
import BaseCard from './BaseCard';

export default function ArchitectureCard({ architecture }) {
  return (
    <BaseCard icon={Boxes} title="Architecture">
      {Object.entries(architecture).map(([layer, components]) => (
        <div key={layer} className="mb-4 last:mb-0">
          <h4 className="text-lg font-semibold text-primary capitalize mb-2">
            {layer}
          </h4>
          <div className="space-y-2 pl-4 border-l-2 border-slate-600">
            {typeof components === 'object' && !Array.isArray(components) ? (
              Object.entries(components).map(([name, description]) => (
                <div key={name} className="text-sm">
                  <span className="font-medium text-slate-200">{name}:</span>
                  <span className="text-slate-400 ml-2">{description}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">{components}</p>
            )}
          </div>
        </div>
      ))}
    </BaseCard>
  );
}

// Made with Bob
