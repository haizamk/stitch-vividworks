import { useState } from "react";
import { cx } from "../../lib/cx.ts";

type PreviewImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  eager?: boolean;
  className?: string;
};

export function PreviewImage({ src, alt, width, height, eager = false, className }: PreviewImageProps) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const loaded = loadedSrc === src;
  const failed = failedSrc === src;

  return (
    <div className={cx("relative bg-surface", className)}>
      {!loaded && !failed ? (
        <div className="absolute inset-0 animate-pulse bg-[#e7edf5]" role="status">
          <span className="sr-only">Sedang memuatkan pratonton…</span>
        </div>
      ) : null}
      {failed ? (
        <div className="absolute inset-0 grid place-items-center px-4 text-center text-sm text-muted" role="status">
          Pratonton tidak dapat dipaparkan.
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoadedSrc(src)}
          onError={() => setFailedSrc(src)}
          className={cx(
            "absolute inset-0 h-full w-full object-cover object-top",
            loaded ? "opacity-100" : "opacity-0",
          )}
        />
      )}
    </div>
  );
}
