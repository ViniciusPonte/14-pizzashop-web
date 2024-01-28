import { api } from '@/lib/axios'

import { OrderStatusType } from './get-orders'

interface ICustomer {
  name: string
  email: string
  phone: string | null
}

interface IOrderItem {
  id: string
  priceInCents: number
  quantity: number
  product: {
    name: string
  }
}

interface GetOrderDetailsParams {
  orderId: string
}

interface GetOrderDetailsResponse {
  id: string
  createdAt: string
  status: OrderStatusType
  totalInCents: number
  customer: ICustomer
  orderItems: IOrderItem[]
}

export async function getOrderDetails({ orderId }: GetOrderDetailsParams) {
  const response = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`)

  return response.data
}
