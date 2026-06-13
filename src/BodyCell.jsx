import { memo } from 'react';
import { Cake } from 'lucide-react';

import { actions } from './store';
import { dayValues } from './constants';

const BodyCell = memo(function BodyCell({ id, dayKey, value, isBirthday }) {
  const Icon = dayValues[value]?.Icon;

  return (
    <div
      className="flex cursor-pointer flex-col items-center justify-center border-r-2 border-black text-center"
      onClick={() => actions.setDay({ id, dayKey })}
    >
      {Icon && <Icon />}
      {isBirthday && <Cake size="16" />}
    </div>
  );
});

export default BodyCell;
