export default function BaseCard({ icon: Icon, title, children, className = '' }) {
  return (
    <div className={`bg-bg-card rounded-xl p-6 shadow-lg border border-slate-600 hover:border-primary transition-all duration-300 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        {Icon && (
          <div className="bg-primary bg-opacity-20 p-2 rounded-lg">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        )}
        <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
      </div>
      <div className="text-text-secondary space-y-3">
        {children}
      </div>
    </div>
  );
}

// Made with Bob
