interface DiffPercentageProps {
  diff: number
  isCancel?: boolean
}

export function DiffPercentage({ diff, isCancel }: DiffPercentageProps) {
  const textColor = diff < 0 || isCancel ? 'rose' : 'emerald'
  const textColorWhenCancel = diff < 0 ? 'emerald' : 'rose'

  const color = isCancel ? textColorWhenCancel : textColor

  const signal = diff < 0 ? '' : '+'

  return (
    <span className={`text-${color}-500 dark:text-${color}-400`}>
      {signal + diff}%
    </span>
  )
}
