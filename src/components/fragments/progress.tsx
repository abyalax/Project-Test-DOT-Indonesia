
type ProgressProps = {
    value: number; // 0 - 100
};

export function Progress({ value }: ProgressProps) {

    const clampedValue = Math.max(0, Math.min(100, value));

    return (
        <div className="w-full h-4 bg-gray-200 rounded overflow-hidden">
            <div
                className="h-full bg-slate-600 transition-all duration-300"
                style={{ width: `${clampedValue}%` }}
            />
        </div>
    );
}
