import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { getDayOrdersAmount } from '@/api/get-day-orders-amount'
import { DiffPercentage } from '@/components/diff-percentage'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { MetricCardSkeleton } from './metric-card-skeleton'

export function DayOrdersAmount() {
  const { t } = useTranslation()
  const { data: dayOrdersAmount, isFetching } = useQuery({
    queryFn: getDayOrdersAmount,
    queryKey: ['metrics', 'day-orders-amount'],
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          {t('orders_day')}
        </CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {isFetching ? (
          <MetricCardSkeleton />
        ) : (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {dayOrdersAmount?.amount}
            </span>
            <p className="text-xs text-muted-foreground">
              <DiffPercentage diff={dayOrdersAmount?.diffFromYesterday ?? 0} />{' '}
              {t('compared_to_yesterday')}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
