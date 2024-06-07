import { useState, useEffect } from "react";
import { formatCountdownTime } from "../lib/timer";

export type CountdownTimerProps = {
  initialSeconds: number;
  start: boolean;
  onTimerEnd: Function;
}

function CountdownTimer(props: CountdownTimerProps) {
  const { initialSeconds, start, onTimerEnd } = props;
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    let timerId: NodeJS.Timer | undefined;

    if (start && seconds > 0) {
      timerId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    }

    if (seconds === 0 && start) {
      onTimerEnd(); 
      clearInterval(timerId); 
    }

    return () => clearInterval(timerId);
  }, [start, seconds, onTimerEnd]);

  return (
    <div className='flex items-center justify-center bg-light-green font-bold rounded-tl-xl rounded-tr-xl h-[45px] -mt-8 -mx-6'>
      <p>Appointment is reserved for {formatCountdownTime(seconds)}</p>
    </div>
  )
}

export default CountdownTimer;