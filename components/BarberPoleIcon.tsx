type BarberPoleIconProps = {
  className?: string;
};

export function BarberPoleIcon({ className = "" }: BarberPoleIconProps) {
  return (
    <span
      className={`barber-pole-icon inline-flex shrink-0 flex-col items-center ${className}`}
      aria-hidden="true"
    >
      <span className="barber-pole-cap" />
      <span className="barber-pole-cylinder">
        <span className="barber-pole-stripes" />
        <span className="barber-pole-sheen" />
      </span>
      <span className="barber-pole-cap" />
    </span>
  );
}
