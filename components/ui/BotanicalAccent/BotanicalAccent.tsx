import styles from './BotanicalAccent.module.css'

type Corner = 'tl' | 'tr' | 'bl' | 'br'
type Tone = 'olive' | 'cream'

interface BotanicalAccentProps {
  corner?: Corner
  tone?: Tone
  className?: string
}

export function BotanicalAccent({ corner = 'tr', tone = 'olive', className }: BotanicalAccentProps) {
  const classNames = [styles.accent, styles[corner], className].filter(Boolean).join(' ')
  const toneStyle = tone === 'cream' ? { color: 'var(--cream)', opacity: 0.16 } : undefined

  return (
    <svg className={classNames} style={toneStyle} viewBox="0 0 200 380" fill="none" aria-hidden="true">
      <path
        d="M104 378 C 96 330 110 296 100 252 C 92 214 108 178 98 138 C 92 104 102 70 100 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <ellipse cx="0" cy="0" rx="26" ry="9" transform="translate(72 300) rotate(-34)" fill="currentColor" />
      <ellipse cx="0" cy="0" rx="26" ry="9" transform="translate(128 268) rotate(32)" fill="currentColor" />
      <ellipse cx="0" cy="0" rx="24" ry="8.5" transform="translate(70 236) rotate(-32)" fill="currentColor" />
      <ellipse cx="0" cy="0" rx="24" ry="8.5" transform="translate(126 206) rotate(30)" fill="currentColor" />
      <ellipse cx="0" cy="0" rx="22" ry="8" transform="translate(72 176) rotate(-30)" fill="currentColor" />
      <ellipse cx="0" cy="0" rx="22" ry="8" transform="translate(124 148) rotate(28)" fill="currentColor" />
      <ellipse cx="0" cy="0" rx="18" ry="7" transform="translate(76 120) rotate(-28)" fill="currentColor" />
      <ellipse cx="0" cy="0" rx="16" ry="6.5" transform="translate(118 96) rotate(26)" fill="currentColor" />
      <ellipse cx="0" cy="0" rx="12" ry="5" transform="translate(86 70) rotate(-24)" fill="currentColor" />
      <circle cx="100" cy="16" r="5" fill="currentColor" />
    </svg>
  )
}
