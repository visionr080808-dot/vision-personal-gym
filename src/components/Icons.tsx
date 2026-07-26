export function PhoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M5.5 4h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3c0 1.1-.9 2-2 2C10.6 20.5 3.5 13.4 3.5 6c0-1.1.9-2 2-2Z" />
    </svg>
  );
}
