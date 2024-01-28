import { api } from '@/lib/axios'

export interface GetOrdersQuery {
  pageIndex?: number | null
  orderId?: string | null
  customerName?: string | null
  status?: string | null
}

export type OrderStatusType =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

export interface IOrder {
  orderId: string
  createdAt: string
  status: OrderStatusType
  customerName: string
  total: number
}

export interface GetOrdersResponse {
  orders: IOrder[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getOrders({
  pageIndex,
  orderId,
  customerName,
  status,
}: GetOrdersQuery) {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex,
      orderId,
      customerName,
      status: status === 'all' ? null : status,
    },
  })

  return response.data
}
