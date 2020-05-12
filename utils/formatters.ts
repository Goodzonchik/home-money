import { DateTime } from 'luxon';
const dateFormatter = (date: string) =>
  DateTime.fromISO(date).toFormat('dd.MM.yyyy');
export default dateFormatter;
