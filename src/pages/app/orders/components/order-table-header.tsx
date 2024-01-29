import { useTranslation } from 'react-i18next'

import { TableHead, TableRow } from '@/components/ui/table'

export function OrderTableHeader() {
  const { t } = useTranslation()
  return (
    <TableRow>
      <TableHead className="w-[64px]"></TableHead>
      <TableHead className="w-[140px]">{t('id')}</TableHead>
      <TableHead className="w-[180px]">{t('carried_out')}</TableHead>
      <TableHead className="w-[140px]">{t('status')}</TableHead>
      <TableHead>{t('client')}</TableHead>
      <TableHead className="w-[140px]">{t('order_total')}</TableHead>
      <TableHead className="w-[164px]"></TableHead>
      <TableHead className="w-[132px]"></TableHead>
    </TableRow>
  )
}
