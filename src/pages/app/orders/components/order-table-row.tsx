import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowRight, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { approveOrder } from '@/api/approve-order'
import { cancelOrder } from '@/api/cancel-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import { GetOrdersResponse, IOrder, OrderStatusType } from '@/api/get-orders'
import { OrderStatus } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDateFromNow } from '@/utils/formatDateFromNow'

import { OrderDetails } from '.'

export interface OrderTableRowProps {
  order: IOrder
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  function updateOrderStatusOnCache(status: OrderStatusType) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })

    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((cachedOrder) => {
          if (cachedOrder.orderId === order.orderId) {
            return {
              ...cachedOrder,
              status,
            }
          }

          return cachedOrder
        }),
      })
    })
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancellingOrder } =
    useMutation({
      mutationFn: () => cancelOrder({ orderId: order.orderId }),
      onSuccess() {
        updateOrderStatusOnCache('canceled')
      },
    })

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: () => approveOrder({ orderId: order.orderId }),
      onSuccess() {
        updateOrderStatusOnCache('processing')
      },
    })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: () => dispatchOrder({ orderId: order.orderId }),
      onSuccess() {
        updateOrderStatusOnCache('delivering')
      },
    })

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: () => deliverOrder({ orderId: order.orderId }),
      onSuccess() {
        updateOrderStatusOnCache('delivered')
      },
    })

  interface StatusProps {
    label: string
    callback: () => void
    disableButton: boolean
  }

  const orderStatusHandler: Record<OrderStatusType, StatusProps | null> = {
    pending: {
      label: t('approve'),
      callback: approveOrderFn,
      disableButton: isApprovingOrder,
    },
    processing: {
      label: t('delivering'),
      callback: dispatchOrderFn,
      disableButton: isDispatchingOrder,
    },
    delivering: {
      label: t('delivered'),
      callback: deliverOrderFn,
      disableButton: isDeliveringOrder,
    },
    canceled: null,
    delivered: null,
  }

  const shouldDisableCancelButton =
    !['pending', 'processing'].includes(order.status) || isCancellingOrder

  return (
    <TableRow>
      <TableCell>
        <OrderDetails orderId={order.orderId} />
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDateFromNow(order.createdAt)}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {formatCurrency(order.total / 100)}
      </TableCell>
      <TableCell>
        {orderStatusHandler[order.status] && (
          <Button
            onClick={() => orderStatusHandler[order.status]?.callback()}
            variant="outline"
            disabled={orderStatusHandler[order.status]?.disableButton}
            size="xs"
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            {orderStatusHandler[order.status]?.label}
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          onClick={() => cancelOrderFn()}
          disabled={shouldDisableCancelButton}
          variant="ghost"
          size="xs"
        >
          <X className="mr-2 h-3 w-3" />
          {t('cancel')}
        </Button>
      </TableCell>
    </TableRow>
  )
}
