import { eachDayOfInterval, format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlataformDate';
import { MarkedDateProps, DayProps } from '.';
import theme from '../../styles/theme';

export function generateInterval(start: DayProps, end: DayProps) {
  let interval: MarkedDateProps = {};
  const teste = eachDayOfInterval({ start: new Date(start.timestamp), end: new Date(end.timestamp) })
  console.log(teste)
}
