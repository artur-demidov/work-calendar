import { useSnapshot } from 'valtio';
import clsx from 'clsx';

import NumbersRow from './NumbersRow';
import BodyRow from './BodyRow';
import { state } from './store';

export default function Grid() {
  const { rowsOrder, employeesData, daysData, showPreview } =
    useSnapshot(state);

  return (
    <div
      className={clsx(
        showPreview && [
          'media_screen:min-h-[210mm]',
          'media_screen:w-[297mm]',
          'media_screen:p-[5mm]',
          'media_screen:shadow-lg',
          'media_screen:border',
          'media_screen:border-gray-300',
        ],
      )}
    >
      <NumbersRow />
      {rowsOrder.map((id) => (
        <BodyRow
          key={id}
          id={id}
          employee={employeesData[id]}
          days={daysData[id]}
        />
      ))}
    </div>
  );
}
