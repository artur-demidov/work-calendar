import { memo, useMemo } from 'react';
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
  const dayCells = useMemo(
    () =>
      Array.from({ length: daysCount }, (_, i) =>
        currentDate.date(i + 1).format('DD-MM-YYYY'),
      ),
    [daysCount],
  );

  return (
    <div
      className="grid h-13 border-b-2 border-black"
      style={{
        gridTemplateColumns: `130px repeat(${daysCount}, minmax(0, 1fr)) 42px`,
      }}
    >
      <EmployeeCell id={id} employee={employee} />
      {dayCells.map((dayKey) => {
        return (
          <BodyCell
            key={dayKey}
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
