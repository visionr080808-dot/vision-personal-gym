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

/** ご利用までの流れ：01 お問い合わせ（封筒） */
export function MailIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="5" y="11" width="38" height="26" rx="3" />
      <path d="M6 13l18 14 18-14" />
    </svg>
  );
}

/** ご利用までの流れ：02 無料カウンセリング（対話） */
export function ChatIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M8 10h32a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H20l-8 7v-7h-4a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4Z" />
      <circle cx="16" cy="21" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="24" cy="21" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="32" cy="21" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** ご利用までの流れ：03 体験トレーニング（ダンベル） */
export function DumbbellIcon({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="4" y="19" width="8" height="10" rx="1.8" />
      <rect x="36" y="19" width="8" height="10" rx="1.8" />
      <rect x="10" y="16" width="4" height="16" rx="1.2" />
      <rect x="34" y="16" width="4" height="16" rx="1.2" />
      <path d="M14 24h20" />
    </svg>
  );
}

/** ご利用までの流れ：04 ご入会・トレーニング開始（バッジ） */
export function BadgeCheckIcon({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="24" cy="19" r="13" />
      <path d="M18 19.5l4 4 8-9" />
      <path d="M15.5 30l-3 9 6-2.5 3.5 3" />
      <path d="M32.5 30l3 9-6-2.5-3.5 3" />
    </svg>
  );
}
