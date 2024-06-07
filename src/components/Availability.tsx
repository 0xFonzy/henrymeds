import moment from 'moment-timezone';
import { DateCalendar, TimeField } from '@mui/x-date-pickers';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format, isSameDay } from 'date-fns';
import { getTimeZoneAbbreviation } from '../lib/timezone';
import { Add, Close } from '@mui/icons-material';
import { Schedule, ScheduleDate, TimeSlot } from '../models/Schedule';
import { scheduleData } from '../mock/schedule';
import { getNewScheduleDate } from '../lib/schedule';
import HighlightedDay from './HighlightedDays';
import { addTimeSlot, changeTime, removeTimeSlot } from '../lib/timeSlots';
import { Container } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { saveSchedule } from '../api/schedule';


function Availability() {
  const tzAbbreviation = getTimeZoneAbbreviation(moment.tz.guess());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [schedule, setSchedule] = useState<Schedule>(scheduleData);
  const scheduleDate: ScheduleDate = schedule.dates.find(scheduleDate => isSameDay(scheduleDate.date, selectedDate)) || getNewScheduleDate(selectedDate);
  const highlightedDays = schedule.dates.filter(date => date.timeSlots.length).map(date => date.date.getDate());
  const scheduleMutation = useMutation({
    mutationFn: (newSchedule: Schedule) => saveSchedule(newSchedule)
  })

  const handleAddSlot = (selectedDate: Date) => {
    setSchedule(prev => addTimeSlot(prev, selectedDate));
  };

  const handleRemoveSlot = (dateId: string, timeSlotIndex: number) => {
    setSchedule(prev => removeTimeSlot(prev, dateId, timeSlotIndex));
  };

  const handleChangeTime = (dateId: string, timeSlotIndex: number, updatedTimeSlot: TimeSlot) => {
    setSchedule(prev => changeTime(prev, dateId, timeSlotIndex, updatedTimeSlot));
  };

  const handleCalendarChange = (newValue: Date) => {
    setSelectedDate(newValue);
  }

  const handleSaveAvailability = () => {
    scheduleMutation.mutate(schedule);
  };

  return (
    <Container maxWidth="md">
      <div className="p-6 bg-white shadow-lg rounded-xl min-h-[760px] mb-[200px]">
        <div className="flex items-center justify-between mb-8">
          <div className='flex flex-row items-center gap-4'>
            <img src="/images/provider.png" alt="Provider" width={75} height={75} />
            <h1 className="text-4xl text-dark-gray font-bold">Availability</h1>
          </div>
          <Link to="/clients">
            <button className="bg-green text-white font-semibold px-4 py-2 rounded-md">
                Booking Page
            </button>
          </Link>
        </div>
        <p className='text-dark-gray font-bold'>Set Your Availability</p>
        <p className="text-gray mb-4">Set times you are available to meet with <span className="text-green">clients</span></p>
        <div className='border-t border-gray opacity-20 pb-8'></div>

        <div className='flex flex-row justify-between px-16 gap-16'>
          <DateCalendar 
            value={selectedDate} 
            onChange={handleCalendarChange} 
            sx={{marginLeft: 0, marginRight: 0}}
            disablePast
            slots={{
              day: HighlightedDay
            }}
            slotProps={{
              day: {
                highlightedDays,
              } as any
            }}
          />
          <div className="flex flex-col gap-2 pt-4 min-w-[220px]">
            <div className='flex flex-row justify-between pb-2'>
              { selectedDate && <h2 className="text-dark-gray text-md font-light">{format(selectedDate, 'EEEE, MMMM d')}</h2>}
              <h2 className='text-dark-gray'>{tzAbbreviation}</h2>
            </div>
            {scheduleDate.timeSlots.map((slot, index) => (
              <div key={index} className="flex items-center mb-2 gap-2">
                <TimeField
                  value={slot.start}
                  onChange={(date) => {
                    if (date) handleChangeTime(scheduleDate.id, index, { start: date, end: slot.end })
                  }}
                  className='border border-green p-2 rounded mr-2 w-[120px]'
                  disablePast
                />
                <TimeField
                  value={slot.end}
                  onChange={(date) => {
                    if (date) handleChangeTime(scheduleDate.id, index, { start: slot.start, end: date })
                  }}
                  className='border border-green p-2 rounded mr-2 w-[120px]'
                  slotProps={{ textField: { className: 'border border-green p-2 rounded mr-2 w-[120px]'}}}
                  disablePast
                />
                <button onClick={() => handleRemoveSlot(scheduleDate.id, index)}>
                  <Close sx={{height: 10, width: 10}}/>
                </button>
              </div>
            ))}
            <button onClick={() => handleAddSlot(selectedDate)} className="text-black mb-4">
              <Add sx={{height: 24, width: 24}}/>
            </button>
            <button onClick={handleSaveAvailability} className="bg-green text-white font-semibold px-4 py-2 rounded-md">Save Availability</button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Availability;
