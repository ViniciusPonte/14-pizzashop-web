import { useTranslation } from 'react-i18next'

import { OrderStatusType } from '@/api/get-orders'

interface OrderStatusProps {
  status: OrderStatusType
}

interface StatusProps {
  label: string
  dotColor: string
}

export function OrderStatus({ status }: OrderStatusProps) {
  const { t } = useTranslation()

  const orderStatusMap: Record<OrderStatusType, StatusProps> = {
    pending: { label: t('pending'), dotColor: 'bg-slate-400' },
    canceled: { label: t('canceled'), dotColor: 'bg-rose-500' },
    delivered: { label: t('delivered'), dotColor: 'bg-emerald-500' },
    delivering: { label: t('delivering'), dotColor: 'bg-amber-400' },
    processing: { label: t('in_preparation'), dotColor: 'bg-amber-400' },
  }

  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-2 w-2 rounded-full ${orderStatusMap[status].dotColor}`}
      />
      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status].label}
      </span>
    </div>
  )
}
