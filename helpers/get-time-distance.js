import { formatDistanceToNow } from "date-fns";
import { ru } from 'date-fns/locale/index.js';

export function getTimeDistance(date) {
    return formatDistanceToNow(new Date(date), { locale: ru })
}