import { ArrowDown, ArrowUp, SquarePen, Trash2 } from 'lucide-react';

import { actions } from './store';

export default function EmployeeCell({ id, employee }) {
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
    <div className="relative group flex items-center px-2 border-r-2 border-black">
      <div className="flex flex-col text-sm leading-4">
        {employee.fullName
          .trim()
          .split(' ')
          .map((i) => (
            <span key={i}>{i}</span>
          ))}
      </div>
      <div className="hidden group-hover:flex items-center justify-center gap-1 absolute inset-0 bg-white">
        <button
          className="p-1 rounded-md hover:bg-black/10 cursor-pointer"
          onClick={() => actions.moveEmployeeTop(id)}
        >
          <ArrowUp size="20" strokeWidth="1.5" />
        </button>
        <button
          className="p-1 rounded-md hover:bg-black/10 cursor-pointer"
          onClick={() => actions.moveEmployeeBottom(id)}
        >
          <ArrowDown size="20" strokeWidth="1.5" />
        </button>
        <button
          className="p-1 rounded-md hover:bg-black/10 cursor-pointer"
          onClick={editEmployee}
        >
          <SquarePen size="20" strokeWidth="1.5" />
        </button>
        <button
          className="p-1 rounded-md hover:bg-black/10 cursor-pointer"
          onClick={removeEmployee}
        >
          <Trash2 size="20" strokeWidth="1.5" />
        </button>
      </div>
    </div>
  );
}
