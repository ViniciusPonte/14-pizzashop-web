import { OrderStatusType } from '@/api/get-orders'

interface OrderStatusProps {
  status: OrderStatusType
}

interface StatusProps {
  label: string
  dotColor: string
}

const orderStatusMap: Record<OrderStatusType, StatusProps> = {
  pending: { label: 'Pendente', dotColor: 'bg-slate-400' },
  canceled: { label: 'Cancelado', dotColor: 'bg-rose-500' },
  delivered: { label: 'Entregue', dotColor: 'bg-emerald-500' },
  delivering: { label: 'Em entrega', dotColor: 'bg-amber-400' },
  processing: { label: 'Em preparo', dotColor: 'bg-amber-400' },
}

export function OrderStatus({ status }: OrderStatusProps) {
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
