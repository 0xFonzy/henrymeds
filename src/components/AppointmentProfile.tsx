import { DateRange, WatchLater } from "@mui/icons-material";
import { Schedule } from "../models/Schedule";
import { format } from "date-fns";

export type AppointmentProfileProps = {
  schedule: Schedule;
  treatment: string;
  appointmentDate: Date;
};

function AppointmentProfile(props: AppointmentProfileProps) {
  const { schedule, treatment, appointmentDate } = props;
  return (
    <div className="flex flex-row items-center gap-4 pb-4">
      <img src="/images/provider.png" alt="Provider" width={75} height={75} />
      <div className="flex flex-col">
        <p className="text-dark-gray font-bold">
          {schedule.providerName}, {schedule.providerTitle}.
        </p>
        <p className="text-gray">
          Appointment confirmed for{" "}
          <span className="text-green font-semibold">{treatment}</span>
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-4 items-center text-dark-gray text-md font-light">
          <DateRange />
          {format(appointmentDate, "EEEE, MMMM d")}
        </div>
        <div className="flex flex-row gap-4 items-center text-dark-gray">
          <WatchLater />
          {format(appointmentDate, "hh:mm a")}
        </div>
      </div>
    </div>
  );
}

export default AppointmentProfile;
