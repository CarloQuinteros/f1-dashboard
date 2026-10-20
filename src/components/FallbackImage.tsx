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
        className={`flex items-center justify-center bg-slate-200 font-semibold text-slate-600 ${className}`}
      >
        {label}
      </div>
    )
  }

  return <img src={src} alt={alt} className={className} onError={() => setFailedSrc(src)} />
}
