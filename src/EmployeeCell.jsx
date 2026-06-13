import { memo } from 'react';
import { ArrowDown, ArrowUp, SquarePen, Trash2 } from 'lucide-react';

import { actions } from './store';

const EmployeeCell = memo(function EmployeeCell({ id, employee }) {
  function editEmployee() {
    const fullName = prompt('Введите ФИО', employee.fullName);
    if (!fullName) return;
    const birthDate = prompt('Введите ДР в формате 31-12', employee.birthDate);
    if (!birthDate) return;
    actions.editEmployee({ id, fullName, birthDate });
  }
  function removeEmployee() {
    if (!confirm(`Удалить сотрудника ${employee.fullName}`)) return;
    actions.removeEmployee(id);
  }

  return (
    <div className="group relative flex items-center border-r-2 border-black px-2">
      <div className="flex flex-col text-sm leading-4">
        {employee.fullName
          .trim()
          .split(' ')
          .map((i) => (
            <span key={i}>{i}</span>
          ))}
      </div>
      <div className="absolute inset-0 hidden items-center justify-center gap-1 bg-white group-hover:flex">
        <button
          className="cursor-pointer rounded-md p-1 hover:bg-black/10"
          onClick={() => actions.moveEmployeeTop(id)}
        >
          <ArrowUp size="20" strokeWidth="1.5" />
        </button>
        <button
          className="cursor-pointer rounded-md p-1 hover:bg-black/10"
          onClick={() => actions.moveEmployeeBottom(id)}
        >
          <ArrowDown size="20" strokeWidth="1.5" />
        </button>
        <button
          className="cursor-pointer rounded-md p-1 hover:bg-black/10"
          onClick={editEmployee}
        >
          <SquarePen size="20" strokeWidth="1.5" />
        </button>
        <button
          className="cursor-pointer rounded-md p-1 hover:bg-black/10"
          onClick={removeEmployee}
        >
          <Trash2 size="20" strokeWidth="1.5" />
        </button>
      </div>
    </div>
  );
});

export default EmployeeCell;
