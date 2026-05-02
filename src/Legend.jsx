import { useSnapshot } from 'valtio';
import clsx from 'clsx';

import { state, actions } from './store';
import { dayValues } from './constants';

export default function Legend() {
  const { valueForFill, fillParams } = useSnapshot(state);

  return (
    <div className="flex gap-5 mb-4 print:hidden">
      {Object.entries(dayValues).map(([value, { Icon, text }]) => (
        <div
          key={value}
          className={clsx(
            'flex items-center gap-2 text-sm rounded-xl px-2 py-1 cursor-pointer',
            { 'bg-black/10': valueForFill === value },
          )}
          onClick={() => actions.setValueForFill(value)}
        >
          <Icon size="20" strokeWidth="1.5" />
          {text}
        </div>
      ))}
      <div className="flex items-center gap-3 ml-10">
        <label className="flex items-center gap-1 text-sm cursor-pointer">
          <input
            type="checkbox"
            className="cursor-pointer size-4"
            checked={fillParams.enabled}
            onChange={() =>
              actions.setFillParams({
                ...fillParams,
                enabled: !fillParams.enabled,
              })
            }
          />
          <span>Заполнить</span>
        </label>
        <input
          className="h-8 px-3 border text-xs border-black"
          value={fillParams.workDays}
          onChange={(e) =>
            actions.setFillParams({
              ...fillParams,
              workDays: e.target.valueAsNumber || 0,
            })
          }
          placeholder="Рабочих дней"
          min="0"
          type="number"
        />
        <input
          className="h-8 px-3 border text-xs border-black"
          value={fillParams.dayOffDays}
          onChange={(e) =>
            actions.setFillParams({
              ...fillParams,
              dayOffDays: e.target.valueAsNumber || 0,
            })
          }
          placeholder="Выходных дней"
          min="0"
          type="number"
        />
      </div>
    </div>
  );
}
