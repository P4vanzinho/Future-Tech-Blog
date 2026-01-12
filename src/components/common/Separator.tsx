export function Separator({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`bg-dark-15 relative left-1/2 h-px w-screen -translate-x-1/2 ${className}`.trim()}
    />
  );
}
