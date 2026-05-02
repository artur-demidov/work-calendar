import { memo } from 'react';
import { useSnapshot } from 'valtio';
import dayjs from 'dayjs';

import BodyCell from './BodyCell';
import EmployeeCell from './EmployeeCell';
import { derived, state } from './store';

const BodyRow = memo(function BodyRow({ id, employee, days }) {
  const { currentDate } = useSnapshot(state);
  const { daysCount } = useSnapshot(derived);
  const countWorkingDays = Object.keys(days).filter((dateStr) => {
    const date = dayjs(dateStr, 'DD-MM-YYYY');
    return (
      date.month() === currentDate.month() && date.year() === currentDate.year()
    );
  }).length;

  return (
    <div
      className="grid border-b-2 border-black h-13"
      style={{
        gridTemplateColumns: `130px repeat(${daysCount}, minmax(0, 1fr)) 42px`,
      }}
    >
      <EmployeeCell id={id} employee={employee} />
      {Array.from({ length: daysCount }, (_, i) => i + 1).map((day) => {
        const dayKey = currentDate.date(day).format('DD-MM-YYYY');
        return (
          <BodyCell
            key={day}
            id={id}
            dayKey={dayKey}
            value={days[dayKey]}
            isBirthday={dayKey.startsWith(employee.birthDate)}
          />
        );
      })}
      <div className="flex items-center px-2 text-sm">{countWorkingDays}</div>
    </div>
  );
});

export default BodyRow;
