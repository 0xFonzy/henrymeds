import moment from "moment-timezone";
import { DateCalendar } from "@mui/x-date-pickers";
import { useState } from "react";
import { format, isSameDay } from "date-fns";
import { getTimeZoneAbbreviation } from "../lib/timezone";
import { Schedule, ScheduleDate } from "../models/Schedule";
import { scheduleData } from "../mock/schedule";
import { getNewScheduleDate } from "../lib/schedule";
import { Button, Container } from "@mui/material";
import { DateRange, WatchLater, CheckCircle } from "@mui/icons-material";
import { getFutureTimeSlots, getTimeSlotIntervals } from "../lib/intervals";
import HighlightedDay from "./HighlightedDays";
import AppointmentProfile from "./AppointmentProfile";
import CountdownTimer from "./CountdownTimer";

export type ScheduleStep = "select-time" | "confirm";
export const intervalMinutes = 15;
export const intervalHours = 24;
export const pendingConfirmationSeconds = 60*30;

function ScheduleAppointment() {
  const tzAbbreviation = getTimeZoneAbbreviation(moment.tz.guess());
  const [step, setStep] = useState<ScheduleStep>("select-time");
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [timerOn, setTimerOn] = useState(false);
  const schedule: Schedule = scheduleData;
  const scheduleDate: ScheduleDate = schedule.dates.find((scheduleDate) => isSameDay(scheduleDate.date, selectedDate)) || getNewScheduleDate(selectedDate);
  const highlightedDays = schedule.dates.filter((date) => date.timeSlots.length).map((date) => date.date.getDate());
  const intervals = getTimeSlotIntervals(getFutureTimeSlots(scheduleDate.timeSlots, intervalHours), intervalMinutes);

  const handleCalendarChange = (newValue: Date) => {
    setSelectedDate(newValue);
  };

  const handleTimeChange = (intervalIndex: number) => {
    setSelectedTime(intervals[intervalIndex]);
    setTimerOn(true);
    // call API to alert pending confirmation
  };

  const handleTimerEnd = () => {
    setSelectedTime(null);
    setTimerOn(false);
    // call API to alert pending confirmation cancelled
  }

  const handleConfirm = () => {
    setStep("confirm");
    setTimerOn(false);
    // call API to confirm appointment
  };

  return (
    <Container>
      <div className="p-6 bg-white shadow-lg rounded-xl min-h-[760px] mb-[200px]">
        { timerOn && <CountdownTimer initialSeconds={pendingConfirmationSeconds} start={timerOn} onTimerEnd={handleTimerEnd}/>}
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-row items-center gap-4 pt-8">
            <h1 className="text-4xl text-dark-gray font-bold">
              Schedule Appointment
            </h1>
          </div>
        </div>
        {step === "confirm" && selectedTime && (
          <>
            <div className="flex flex-row items-center gap-4 pb-4">
              <AppointmentProfile
                schedule={schedule}
                treatment="Phentermine"
                appointmentDate={selectedTime}
              />
            </div>
            <div className="border-t border-gray opacity-20 pb-8"></div>
            <div className="flex flex-row justify-center gap-4 pb-4">
              <div className="flex flex-col gap-4">
                <p className="flex flex-row items-center gap-2 text-dark-gray text-2xl font-bold pt-8">
                  <CheckCircle color="primary" fontSize="large"/>
                  Appointment Confirmed
                </p>
                <p className='text-center'>A confirmation email has been sent to you.</p>
              </div>
            </div>
          </>
        )}

        {step === "select-time" && (
          <>
            <div className="flex flex-row items-center gap-4 pb-4">
              <div className="flex flex-col">
                <p className="text-dark-gray font-bold">Next Available Time</p>
                <p className="text-gray">
                  Select a time to meet with a licensed provider about{" "}
                  <span className="text-green font-semibold">Phentermine</span>
                </p>
              </div>
            </div>
            <div className="border-t border-gray opacity-20 pb-8"></div>
            <div className={selectedTime ? 'flex flex-row justify-between px-16 gap-16' : 'flex flex-row px-16 gap-16'}>
              <DateCalendar
                value={selectedDate}
                onChange={handleCalendarChange}
                sx={{ marginLeft: 0, marginRight: 0 }}
                disablePast
                slots={{ day: HighlightedDay }}
                slotProps={{ day: { highlightedDays } as any }}
              />
              <div className="flex flex-col gap-2 pt-4 min-w-[220px]">
                <div className="flex flex-row justify-between pb-2">
                  {selectedDate && (
                    <h2 className="text-dark-gray text-md font-light">
                      {format(selectedDate, "EEEE, MMMM d")}
                    </h2>
                  )}
                  <h2 className="text-dark-gray">{tzAbbreviation}</h2>
                </div>
                {intervals.length === 0 && <p>No available times</p>}
                {intervals.map((date, index) => (
                  <div key={index} className="flex items-center mb-2 gap-2">
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{ height: 50, width: 220 }}
                      onClick={() => handleTimeChange(index)}
                    >
                      <p className="text-black">{format(date, "hh:mm a")}</p>
                    </Button>
                  </div>
                ))}
              </div>
              {selectedTime && (
                <div className="flex flex-col items-center gap-8 max-w-[300px]">
                  <img
                    src="/images/provider.png"
                    alt="Provider"
                    width={75}
                    height={75}
                  />
                  <p className="text-center text-gray text-lg">
                    Confirm appointment for{" "}
                    <span className="text-green font-semibold">
                      Phentermine
                    </span>{" "}
                    with{" "}
                    <span className="text-dark-gray font-semibold">
                      {schedule.providerName}, {schedule.providerTitle}
                    </span>
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-4 items-center text-dark-gray text-md font-light">
                      <DateRange />
                      {format(selectedTime, "EEEE, MMMM d")}
                    </div>
                    <div className="flex flex-row gap-4 items-center text-dark-gray">
                      <WatchLater />
                      {format(selectedTime, "hh:mm a")}
                    </div>
                  </div>
                  <button
                    onClick={handleConfirm}
                    className="bg-green text-white font-semibold px-4 py-2 rounded-md w-2/3"
                  >
                    Confirm
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Container>
  );
}

export default ScheduleAppointment;
