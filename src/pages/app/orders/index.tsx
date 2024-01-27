import { Helmet } from 'react-helmet-async'

import { Pagination } from '@/components/pagination'
import { Table, TableBody, TableHeader } from '@/components/ui/table'

import { OrderFilters, OrderTableHeader, OrderTableRow } from './components'

export function Orders() {
  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

        <div className="space-y-2.5">
          <OrderFilters />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <OrderTableHeader />
              </TableHeader>
              <TableBody>
                <OrderTableRow />
              </TableBody>
            </Table>
          </div>

          <Pagination pageIndex={0} totalCount={105} perPage={10} />
        </div>
      </div>
    </>
  )
}
