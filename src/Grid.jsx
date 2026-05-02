import { useSnapshot } from 'valtio';
import NumbersRow from './NumbersRow';
import BodyRow from './BodyRow';
import { state } from './store';

export default function Grid() {
  const { rowsOrder, employeesData, daysData } = useSnapshot(state);

  return (
    <>
      <NumbersRow />
      {rowsOrder.map((id) => (
        <BodyRow
          key={id}
          id={id}
          employee={employeesData[id]}
          days={daysData[id]}
        />
      ))}
    </>
  );
}
