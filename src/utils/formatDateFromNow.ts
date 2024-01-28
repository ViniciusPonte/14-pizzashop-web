import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatDateFromNow(date: string) {
  return formatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true,
  })
}
