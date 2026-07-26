export function LineIcon({ className = "h-4 w-4" }: { className?: string }) {
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
      <path d="M21 11.2c0-4.3-4.1-7.8-9-7.8s-9 3.5-9 7.8c0 3.8 3.3 7 7.7 7.6.3.1.7.3.8.6.1.3 0 .8 0 1.1l-.1.8c0 .2-.2.9.7.5.9-.4 4.9-2.9 6.7-5 1.2-1.3 1.2-2.7 1.2-3.6Z" />
    </svg>
  );
}

export function InstagramIcon({
  className = "h-4 w-4",
}: {
  className?: string;
}) {
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
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

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
