interface DistanceSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const distances = [
  { value: '5', label: '5K', subtitle: '~25–35 min' },
  { value: '10', label: '10K', subtitle: '~50–70 min' },
  { value: '21', label: 'Semi', subtitle: '~1h45–2h30' },
  { value: '42', label: 'Marathon', subtitle: '~3h30–5h' },
];

export function DistanceSelector({ value, onChange }: DistanceSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {distances.map((distance) => (
        <button
          key={distance.value}
          type="button"
          onClick={() => onChange(distance.value)}
          className={`
            px-4 py-4 rounded-xl border-2 transition-all duration-200 text-left
            ${
              value === distance.value
                ? 'border-[#00CED1] bg-[#00CED1]/10 scale-[1.02]'
                : 'border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200 hover:bg-zinc-800'
            }
          `}
        >
          <span className={`block font-semibold ${value === distance.value ? 'text-[#00CED1]' : ''}`}>
            {distance.label}
          </span>
          <span className={`block text-xs mt-0.5 ${value === distance.value ? 'text-[#00CED1]/60' : 'text-zinc-600'}`}>
            {distance.subtitle}
          </span>
        </button>
      ))}
    </div>
  );
}
