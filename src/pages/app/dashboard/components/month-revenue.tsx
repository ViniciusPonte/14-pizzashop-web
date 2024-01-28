import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getMonthRevenue } from '@/api/get-month-revenue'
import { DiffPercentage } from '@/components/diff-percentage'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/utils/formatCurrency'

import { MetricCardSkeleton } from './metric-card-skeleton'

export function MonthRevenue() {
  const { data: monthRevenue, isFetching } = useQuery({
    queryFn: getMonthRevenue,
    queryKey: ['metrics', 'month-revenue'],
  })

  const revenue = monthRevenue?.receipt ?? 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Receita total (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {isFetching ? (
          <MetricCardSkeleton />
        ) : (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {formatCurrency(revenue / 100)}
            </span>
            <p className="text-xs text-muted-foreground">
              <DiffPercentage diff={monthRevenue?.diffFromLastMonth ?? 0} /> em
              relação ao mes passado
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
