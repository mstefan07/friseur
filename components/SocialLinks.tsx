import { FaInstagram, FaTiktok } from "react-icons/fa6";

type SocialPlatform = "instagram" | "tiktok";

type SocialLink = {
  label: string;
  href: string;
  platform: SocialPlatform;
};

const iconMap = {
  instagram: FaInstagram,
  tiktok: FaTiktok,
} as const;

type SocialLinksProps = {
  links: SocialLink[];
  variant?: "dark" | "light";
  size?: "sm" | "md";
};

export function SocialLinks({
  links,
  variant = "dark",
  size = "md",
}: SocialLinksProps) {
  const boxSize = size === "sm" ? "size-10" : "size-11";
  const iconSize = size === "sm" ? "size-4" : "size-5";

  const styles =
    variant === "light"
      ? "border border-[#171511]/14 text-[#171511] hover:border-[#8a6234] hover:bg-[#8a6234] hover:text-[#f3ead9]"
      : "border border-[#d3ae73]/30 text-[#f7f1e7] hover:border-[#d3ae73] hover:bg-[#d3ae73]/12 hover:text-[#f0d49e]";

  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link) => {
        const Icon = iconMap[link.platform];

        return (
          <a
            key={link.platform}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            aria-label={link.label}
            className={`inline-flex ${boxSize} items-center justify-center transition ${styles}`}
          >
            <Icon className={iconSize} aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}
