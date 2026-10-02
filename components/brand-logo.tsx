import Image from "next/image";

export function BrandLogo({
  alt,
  className,
  priority = false,
  sizes,
}: {
  alt: string;
  className?: string;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <Image
      src="/brand/logo.webp"
      alt={alt}
      width={1024}
      height={1024}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
