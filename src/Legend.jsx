import { useSnapshot } from 'valtio';
import clsx from 'clsx';

import { state, actions } from './store';
import { dayValues } from './constants';

export default function Legend() {
  const { valueForFill, fillParams, showPreview } = useSnapshot(state);

  return (
    <div className="mb-4 flex gap-5 print:hidden">
      {Object.entries(dayValues).map(([value, { Icon, text }]) => (
        <div
          key={value}
          className={clsx(
            'flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1 text-sm',
            { 'bg-black/10': valueForFill === value },
          )}
          onClick={() => actions.setValueForFill(value)}
        >
          <Icon size="20" strokeWidth="1.5" />
          {text}
        </div>
      ))}
      <div className="ml-10 flex items-center gap-3">
        <label className="flex cursor-pointer items-center gap-1 text-sm">
          <input
            type="checkbox"
            className="size-4 cursor-pointer"
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
          className="h-8 border border-black px-3 text-xs"
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
          className="h-8 border border-black px-3 text-xs"
          value={fillParams.offDays}
          onChange={(e) =>
            actions.setFillParams({
              ...fillParams,
              offDays: e.target.valueAsNumber || 0,
            })
          }
          placeholder="Выходных дней"
          min="0"
          type="number"
        />
        <label className="ml-10 flex cursor-pointer items-center gap-1 text-sm">
          <input
            type="checkbox"
            className="size-4 cursor-pointer"
            checked={showPreview}
            onChange={actions.togglePreview}
          />
          <span>Показать лист</span>
        </label>
      </div>
    </div>
  );
}
