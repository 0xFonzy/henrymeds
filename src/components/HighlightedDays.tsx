import { PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import { isSameDay } from 'date-fns';

function HighlightedDay(props: PickersDayProps<Date> & { highlightedDays?: Date[] }) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected = highlightedDays.some(date => isSameDay(date, day));

  return (
    <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} sx={{backgroundColor: isSelected ? '#DFF0ED' : 'inherit'}}/>
  );
}

export default HighlightedDay;