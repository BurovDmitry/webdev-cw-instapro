import { formatDistanceToNow } from "date-fns";

export function getTimeDistance(date) {
    return formatDistanceToNow(date, { locale: 'ru' })
}