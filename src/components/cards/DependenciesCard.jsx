import { Package } from 'lucide-react';
import BaseCard from './BaseCard';

export default function DependenciesCard({ dependencies }) {
  return (
    <BaseCard icon={Package} title="Dependencies">
      <div className="space-y-4">
        {/* External Services */}
        {dependencies.external_services && dependencies.external_services.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-secondary mb-2">External Services</h4>
            <ul className="space-y-2 pl-4">
              {dependencies.external_services.map((service, index) => (
                <li key={index} className="text-sm text-slate-300 list-disc">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* NPM Packages */}
        {dependencies.npm_packages && Object.keys(dependencies.npm_packages).length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-secondary mb-2">NPM Packages</h4>
            <div className="space-y-1 pl-4">
              {Object.entries(dependencies.npm_packages).map(([pkg, description]) => (
                <div key={pkg} className="text-sm">
                  <code className="text-primary font-mono">{pkg}</code>
                  <span className="text-slate-400 ml-2">- {description}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Runtime Requirements */}
        {dependencies.runtime_requirements && dependencies.runtime_requirements.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-secondary mb-2">Runtime Requirements</h4>
            <ul className="space-y-2 pl-4">
              {dependencies.runtime_requirements.map((req, index) => (
                <li key={index} className="text-sm text-slate-300 list-disc">
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </BaseCard>
  );
}

// Made with Bob
