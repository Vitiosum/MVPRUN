interface DistanceSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const distances = [
  { value: '5', label: '5K' },
  { value: '10', label: '10K' },
  { value: '21', label: '21K (Semi)' },
  { value: '42', label: '42K (Marathon)' }
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
            px-6 py-4 rounded-lg border-2 transition-all duration-200
            ${
              value === distance.value
                ? 'border-[#00CED1] bg-[#00CED1]/10 text-[#00CED1]'
                : 'border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300'
            }
          `}
        >
          <span className="block">{distance.label}</span>
        </button>
      ))}
    </div>
  );
}
