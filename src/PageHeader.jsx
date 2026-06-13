import { useSnapshot } from 'valtio';
import { toast } from 'sonner';
import {
  ChevronLeft,
  ChevronRight,
  Save,
  Printer,
  UserPlus,
} from 'lucide-react';

import { state, actions } from './store';

export default function PageHeader() {
  const { currentDate } = useSnapshot(state);
  function addEmployee() {
    const fullName = prompt('Введите ФИО');
    if (!fullName) return;
    const birthDate = prompt('Введите ДР в формате 31-12');
    if (!birthDate) return;
    const id = crypto.randomUUID();
    actions.addEmployee({ fullName, birthDate, id });
  }

  return (
    <div className="mb-4 flex items-end justify-between gap-4 print:hidden">
      <h1 className="font-semibold">Расписание рабочих дней</h1>
      <div className="flex items-center gap-2">
        <button
          className="flex h-8 cursor-pointer items-center gap-2 border border-black px-3 text-xs"
          onClick={actions.prevMonth}
        >
          <ChevronLeft size={14} />
        </button>
        <span className="text-sm capitalize">
          {currentDate.format('MMMM YYYY')}
        </span>
        <button
          className="flex h-8 cursor-pointer items-center gap-2 border border-black px-3 text-xs"
          onClick={actions.nextMonth}
        >
          <ChevronRight size={14} />
        </button>
        <button
          className="flex h-8 cursor-pointer items-center gap-2 border border-black px-3 text-xs"
          onClick={addEmployee}
        >
          <UserPlus size={14} /> Сотрудник
        </button>
        <button
          className="flex h-8 cursor-pointer items-center gap-2 border border-black px-3 text-xs"
          onClick={() => {
            actions.saveToLocalStorage();
            toast('Данные сохранены');
          }}
        >
          <Save size={14} /> Сохранить
        </button>
        <button
          className="flex h-8 cursor-pointer items-center gap-2 border border-black px-3 text-xs"
          onClick={() => window.print()}
        >
          <Printer size={14} /> Печать
        </button>
      </div>
    </div>
  );
}
