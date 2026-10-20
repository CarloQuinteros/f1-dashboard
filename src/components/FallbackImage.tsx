import { useState } from 'react'

interface FallbackImageProps {
  src?: string | null
  alt: string
  /** Shown in the placeholder, e.g. a driver code or team initials. */
  label: string
  className?: string
}

export function FallbackImage({ src, alt, label, className = '' }: FallbackImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)

  if (!src || failedSrc === src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`font-display flex items-center justify-center bg-black/20 text-current ${className}`}
      >
        {label}
      </div>
    )
  }

  return <img src={src} alt={alt} className={className} onError={() => setFailedSrc(src)} />
}
