import format from 'date-fns/format';

import { DATE_FORMAT, TIME_FORMAT } from './constants';

export const formatDate = timestamp => format(timestamp, DATE_FORMAT);

export const formatTime = timestamp => format(timestamp, TIME_FORMAT);

export const formatDateWithTime = timestamp =>
  `${formatDate(timestamp)} at ${formatTime(timestamp)}`;
