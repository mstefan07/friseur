type BarberPoleIconProps = {
  className?: string;
};

export function BarberPoleIcon({ className = "" }: BarberPoleIconProps) {
  return (
    <span
      className={`barber-pole-icon inline-flex shrink-0 items-center justify-center rounded-sm border border-[#d3ae73]/32 bg-[#0a0a08]/75 p-[3px] shadow-[0_0_10px_rgba(211,174,115,0.1)] transition duration-300 group-hover:border-[#d3ae73]/55 group-hover:shadow-[0_0_14px_rgba(211,174,115,0.22)] ${className}`}
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
            <rect width="3" height="9" fill="#b83232" />
            <rect x="3" width="3" height="9" fill="#f4efe6" />
            <rect x="6" width="3" height="9" fill="#1e3a5f" />
          </pattern>
          <linearGradient id="barberPoleCap" x1="10" y1="0" x2="10" y2="1">
            <stop offset="0%" stopColor="#e8c992" />
            <stop offset="100%" stopColor="#a67c42" />
          </linearGradient>
          <linearGradient id="barberPoleFrame" x1="0" y1="0" x2="20" y2="44">
            <stop offset="0%" stopColor="#d3ae73" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#8a6234" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="barberPoleSheen" x1="5" y1="8" x2="15" y2="36">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <rect
          x="4"
          y="7"
          width="12"
          height="30"
          rx="6"
          stroke="url(#barberPoleFrame)"
          strokeWidth="0.75"
        />

        <ellipse cx="10" cy="8" rx="5.5" ry="2.2" fill="url(#barberPoleCap)" />
        <ellipse cx="10" cy="36" rx="5.5" ry="2.2" fill="url(#barberPoleCap)" />

        <g clipPath="url(#barberPoleBody)">
          <rect
            className="barber-pole-stripes"
            x="5"
            y="-10"
            width="10"
            height="56"
            fill="url(#barberPolePattern)"
          />
          <rect
            x="5"
            y="8"
            width="10"
            height="28"
            rx="5"
            fill="url(#barberPoleSheen)"
          />
        </g>
      </svg>
    </span>
  );
}
