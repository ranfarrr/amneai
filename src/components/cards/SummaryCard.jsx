import { FileText } from 'lucide-react';
import BaseCard from './BaseCard';

export default function SummaryCard({ summary }) {
  return (
    <BaseCard icon={FileText} title="Summary">
      <p className="text-slate-300 leading-relaxed">{summary}</p>
    </BaseCard>
  );
}

// Made with Bob
