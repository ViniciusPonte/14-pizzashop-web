import { useTranslation } from 'react-i18next'

import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function OrderDetailsSkeleton() {
  const { t } = useTranslation()
  return (
    <div className="space-y-6">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="text-muted-foreground">Status</TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-20" />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">
              {t('client')}
            </TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-[164px]" />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">
              {t('phone')}
            </TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-[140px]" />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">
              {t('email')}
            </TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-[200px]" />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">
              {t('carried_out')}
            </TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-[148px]" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('product')}</TableHead>
            <TableHead className="text-right">{t('quantity')}</TableHead>
            <TableHead className="text-right">{t('price')}</TableHead>
            <TableHead className="text-right">{t('subtotal')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 2 }).map((_, i) => {
            return (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-5 w-[140px]" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="ml-auto h-5  w-3" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="ml-auto h-5  w-12" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="ml-auto h-5  w-12" />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>{t('order_total')}</TableCell>
            <TableCell className="text-right font-medium">
              <Skeleton className="h-5 w-20" />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
