import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { getMonthOrdersAmount } from '@/api/get-month-orders-amount'
import { DiffPercentage } from '@/components/diff-percentage'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { MetricCardSkeleton } from './metric-card-skeleton'

export function MonthOrdersAmount() {
  const { t } = useTranslation()
  const { data: monthOrdersAmount, isFetching } = useQuery({
    queryFn: getMonthOrdersAmount,
    queryKey: ['metrics', 'month-orders-amount'],
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          {t('orders_month')}
        </CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {isFetching ? (
          <MetricCardSkeleton />
        ) : (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthOrdersAmount?.amount}
            </span>
            <p className="text-xs text-muted-foreground">
              <DiffPercentage
                diff={monthOrdersAmount?.diffFromLastMonth ?? 0}
              />{' '}
              {t('compared_to_last_month')}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
