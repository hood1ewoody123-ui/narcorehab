import { cn } from "@/lib/utils";

type PainsLinkProps = {
  href: string;
  children: string;
  className?: string;
};

export function PainsLink({ href, children, className }: PainsLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 font-body text-sm text-graphite transition-colors hover:text-teal",
        className,
      )}
    >
      <span>{children}</span>
      <span
        aria-hidden
        className="inline-block transition-transform duration-300 ease-out-expo group-hover:translate-x-1.5"
      >
        →
      </span>
    </a>
  );
}

export default PainsLink;
