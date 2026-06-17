type BarberPoleIconProps = {
  className?: string;
};

export function BarberPoleIcon({ className = "" }: BarberPoleIconProps) {
  return (
    <span
      className={`barber-pole-icon inline-flex shrink-0 items-center justify-center ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 20 44"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="barberPoleBody">
            <rect x="5" y="8" width="10" height="28" rx="5" />
          </clipPath>
          <pattern
            id="barberPolePattern"
            patternUnits="userSpaceOnUse"
            width="9"
            height="9"
            patternTransform="rotate(38)"
          >
            <rect width="3" height="9" fill="#c73e3a" />
            <rect x="3" width="3" height="9" fill="#f7f1e7" />
            <rect x="6" width="3" height="9" fill="#2a4f82" />
          </pattern>
          <linearGradient id="barberPoleCap" x1="10" y1="0" x2="10" y2="1">
            <stop offset="0%" stopColor="#ece2cf" />
            <stop offset="55%" stopColor="#c9a56a" />
            <stop offset="100%" stopColor="#8a6234" />
          </linearGradient>
          <linearGradient id="barberPoleSheen" x1="5" y1="8" x2="15" y2="36">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        <ellipse cx="10" cy="8" rx="5.5" ry="2.2" fill="url(#barberPoleCap)" />
        <ellipse cx="10" cy="36" rx="5.5" ry="2.2" fill="url(#barberPoleCap)" />

        <g clipPath="url(#barberPoleBody)">
          <g className="barber-pole-spin">
            <rect x="5" y="-10" width="10" height="56" fill="url(#barberPolePattern)" />
          </g>
          <rect x="5" y="8" width="10" height="28" rx="5" fill="url(#barberPoleSheen)" />
        </g>
      </svg>
    </span>
  );
}
