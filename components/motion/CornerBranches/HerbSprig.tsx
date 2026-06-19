interface HerbSprigProps {
  className?: string
}

// Чист SVG за билкова клонка — цветът идва от currentColor (контролира се отвън).
export function HerbSprig({ className }: HerbSprigProps) {
  return (
    <svg className={className} viewBox="0 0 120 220" fill="none" aria-hidden="true">
      <path
        d="M60 216 C 55 178 65 152 60 122 C 55 92 67 64 60 26"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <ellipse cx="0" cy="0" rx="16" ry="6" transform="translate(46 70) rotate(-32)" fill="currentColor" />
      <ellipse cx="0" cy="0" rx="16" ry="6" transform="translate(76 96) rotate(28)" fill="currentColor" />
      <ellipse cx="0" cy="0" rx="14" ry="5.5" transform="translate(44 110) rotate(-30)" fill="currentColor" />
      <ellipse cx="0" cy="0" rx="14" ry="5.5" transform="translate(78 138) rotate(26)" fill="currentColor" />
      <ellipse cx="0" cy="0" rx="12" ry="5" transform="translate(48 152) rotate(-26)" fill="currentColor" />
      <ellipse cx="0" cy="0" rx="10" ry="4.5" transform="translate(72 178) rotate(22)" fill="currentColor" />
      <circle cx="60" cy="24" r="4" fill="currentColor" />
    </svg>
  )
}
