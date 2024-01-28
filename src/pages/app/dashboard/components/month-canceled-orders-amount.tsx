import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

import { getMonthCanceledOrdersAmount } from '@/api/get-month-canceled-orders-amount'
import { DiffPercentage } from '@/components/diff-percentage'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { MetricCardSkeleton } from './metric-card-skeleton'

export function MonthCanceledOrdersAmount() {
  const { data: monthCanceledOrdersAmount, isFetching } = useQuery({
    queryFn: getMonthCanceledOrdersAmount,
    queryKey: ['metrics', 'month-canceled-orders-amount'],
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {isFetching ? (
          <MetricCardSkeleton />
        ) : (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthCanceledOrdersAmount?.amount}
            </span>
            <p className="text-xs text-muted-foreground">
              <DiffPercentage
                diff={monthCanceledOrdersAmount?.diffFromLastMonth ?? 0}
                isCancel
              />{' '}
              em relação ao mes passado
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
