import { proxy } from 'valtio';
import { computed } from 'valtio-reactive';
import dayjs from 'dayjs';

const LOCAL_STORAGE_KEY = 'calendar_data';

export const state = proxy({
  currentDate: dayjs(),
  valueForFill: 'work',
  fillParams: {
    enabled: false,
    workDays: 0,
    dayOffDays: 0,
  },
  rowsOrder: [],
  employeesData: {},
  daysData: {},
});

export const derived = computed({
  daysCount: () => state.currentDate.daysInMonth(),
});

export const actions = {
  nextMonth() {
    state.currentDate = state.currentDate.add(1, 'month');
  },
  prevMonth() {
    state.currentDate = state.currentDate.subtract(1, 'month');
  },
  addEmployee({ fullName, birthDate, id }) {
    state.rowsOrder.push(id);
    state.employeesData[id] = { fullName, birthDate };
    state.daysData[id] = {};
  },
  removeEmployee(id) {
    const index = state.rowsOrder.indexOf(id);
    state.rowsOrder.splice(index, 1);
    delete state.employeesData[id];
    delete state.daysData[id];
  },
  editEmployee({ id, fullName, birthDate }) {
    state.employeesData[id] = { fullName, birthDate };
  },
  moveEmployeeTop(id) {
    const index = state.rowsOrder.indexOf(id);
    if (index <= 0) return;
    [state.rowsOrder[index - 1], state.rowsOrder[index]] = [
      state.rowsOrder[index],
      state.rowsOrder[index - 1],
    ];
  },
  moveEmployeeBottom(id) {
    const index = state.rowsOrder.indexOf(id);
    if (index === -1 || index === state.rowsOrder.length - 1) return;
    [state.rowsOrder[index + 1], state.rowsOrder[index]] = [
      state.rowsOrder[index],
      state.rowsOrder[index + 1],
    ];
  },
  saveToLocalStorage() {
    const now = dayjs();
    const minDate = now.subtract(2, 'month').startOf('month');
    const maxDate = now.add(1, 'month').endOf('month');
    const result = {};
    for (const id in state.daysData) {
      result[id] = {};
      for (const dateStr in state.daysData[id]) {
        const date = dayjs(dateStr, 'DD-MM-YYYY');
        if (
          date.isValid() &&
          !date.isBefore(minDate) &&
          !date.isAfter(maxDate)
        ) {
          result[id][dateStr] = state.daysData[id][dateStr];
        }
      }
    }
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        rowsOrder: state.rowsOrder,
        employeesData: state.employeesData,
        daysData: result,
      }),
    );
  },
  loadFromLocalStorage() {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return;
    Object.assign(state, JSON.parse(raw));
  },
  setValueForFill(value) {
    state.valueForFill = value;
  },
  setDay({ id, dayKey }) {
    if (state.fillParams.enabled) {
      if (!state.fillParams.workDays || !state.fillParams.dayOffDays) {
        return alert('Поля для заполнения пустые');
      }
      const daysCount = derived.daysCount;
      const startDay = dayjs(dayKey, 'DD-MM-YYYY').date();
      let pos = 0;
      for (let d = startDay; d <= daysCount; d++) {
        const key = state.currentDate.date(d).format('DD-MM-YYYY');
        if (pos < state.fillParams.workDays) {
          state.daysData[id][key] = state.valueForFill;
        } else {
          delete state.daysData[id][key];
        }
        pos =
          (pos + 1) % (state.fillParams.workDays + state.fillParams.dayOffDays);
      }
    } else if (state.daysData[id][dayKey] === state.valueForFill) {
      delete state.daysData[id][dayKey];
    } else {
      state.daysData[id][dayKey] = state.valueForFill;
    }
  },
  setFillParams(fillParams) {
    state.fillParams = fillParams;
  },
};
