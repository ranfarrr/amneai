import { FileCode } from 'lucide-react';
import BaseCard from './BaseCard';

export default function KeyFilesCard({ keyFiles }) {
  return (
    <BaseCard icon={FileCode} title="Key Files">
      <div className="space-y-4">
        {keyFiles.map((item, index) => (
          <div key={index} className="bg-slate-700 bg-opacity-50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-start gap-2 mb-2">
              <FileCode className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
              <code className="text-sm font-mono text-primary break-all">
                {item.file}
              </code>
            </div>
            <p className="text-sm text-slate-300 pl-6">{item.reason}</p>
          </div>
        ))}
      </div>
    </BaseCard>
  );
}

// Made with Bob
