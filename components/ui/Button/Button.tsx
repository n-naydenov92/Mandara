import type { ReactNode } from 'react'
import { LocaleLink } from '@/components/ui/LocaleLink/LocaleLink'
import type { Locale } from '@/lib/i18n/settings'
import styles from './Button.module.css'

type ButtonVariant = 'solid' | 'outline' | 'link'

interface BaseProps {
  children: ReactNode
  variant?: ButtonVariant
  className?: string
}

type ButtonProps =
  | (BaseProps & { href: string; lng: Locale; type?: never })
  | (BaseProps & { href?: never; lng?: never; type?: 'button' | 'submit' })

export function Button(props: ButtonProps) {
  const { children, variant = 'solid', className } = props
  const classNames = [styles.btn, styles[variant], className].filter(Boolean).join(' ')

  if (props.href !== undefined) {
    return (
      <LocaleLink lng={props.lng} href={props.href} className={classNames}>
        {children}
      </LocaleLink>
    )
  }

  return (
    <button type={props.type ?? 'button'} className={classNames}>
      {children}
    </button>
  )
}
