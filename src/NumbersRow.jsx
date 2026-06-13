import { useSnapshot } from 'valtio';
import { memo } from 'react';

import { derived, state } from './store';

const NumbersRow = memo(function NumbersRow() {
  const { currentDate } = useSnapshot(state);
  const { daysCount } = useSnapshot(derived);
  const dayCells = Array.from({ length: daysCount }, (_, i) => i + 1);

  return (
    <div
      className="grid border-b-2 border-black"
      style={{
        gridTemplateColumns: `130px repeat(${daysCount}, minmax(0, 1fr)) 42px`,
      }}
    >
      <div className="flex items-center border-r-2 border-black px-2 text-sm">
        Сотрудник
      </div>
      {dayCells.map((day) => (
        <div
          key={day}
          className="flex flex-col items-center justify-center border-r-2 border-black py-1.5 text-center"
        >
          <span className="text-sm font-semibold">{day}</span>
          <span className="text-sm uppercase">
            {currentDate.date(day).format('dd')}
          </span>
        </div>
      ))}
      <div className="flex items-center px-1 py-1.5 text-center text-[10px] leading-3 font-semibold uppercase">
        Дней
        <br />
        отраб.
      </div>
    </div>
  );
});

export default NumbersRow;
