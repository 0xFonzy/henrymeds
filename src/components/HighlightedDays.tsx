import { PickersDay, PickersDayProps } from '@mui/x-date-pickers';

function HighlightedDay(props: PickersDayProps<Date> & { highlightedDays?: number[] }) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.getDate()) >= 0;

  return (
    <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} sx={{backgroundColor: isSelected ? '#DFF0ED' : 'inherit'}}/>
  );
}

export default HighlightedDay;