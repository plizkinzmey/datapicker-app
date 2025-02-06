import React from "react";
import { DatePicker } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/ru_RU";
import "dayjs/locale/ru";
import "./styles.css";

// Устанавливаем русскую локаль по умолчанию для dayjs
dayjs.locale("ru");

interface CustomDatePickerProps {
  onChange?: (date: Dayjs | null, dateString: string | string[]) => void;
}

interface PrevArrowProps {
  onClick?: () => void;
  viewDate?: string | number | Date | Dayjs;
}

const CustomDatePicker = ({ onChange }: CustomDatePickerProps) => {
  const [mode, setMode] = React.useState<"date" | "month" | "year">("date");
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);
  const [viewDate, setViewDate] = React.useState<Dayjs>(dayjs());

  const handleChange = (date: Dayjs | null, dateString: string | string[]) => {
    setSelectedDate(date);
    if (onChange) {
      onChange(date, dateString);
    }
  };

  // Обработчик изменения отображаемой даты
  const handlePanelChange = (date: Dayjs | null, newMode: string) => {
    if (date) {
      setViewDate(date);
    }
    if (newMode === "decade") {
      // Оставляем режим year при попытке переключения на decade
      setMode("year");
    } else {
      setMode(newMode as "date" | "month" | "year");
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setMode("date");
    }
  };

  // Локаль для панели выбора дат
  const datePanelLocale = {
    ...locale,
    lang: {
      ...locale.lang,
      monthFormat: "MMMM",
      yearFormat: "YYYY",
    },
  };

  // Функция определения нужной локали
  const getLocale = () => {
    if (mode === "date") {
      return datePanelLocale;
    }
    return locale;
  };

  // Функция проверки заблокированных дат
  const disabledDate = (current: Dayjs) => {
    const currentDate = dayjs();

    if (mode === "date") {
      return current.isBefore(currentDate.startOf("month"));
    }

    if (mode === "month") {
      return current.isBefore(currentDate.startOf("month"));
    }

    if (mode === "year") {
      return current.isBefore(currentDate.startOf("year"));
    }

    return false;
  };

  // Компонент для кнопки "Предыдущий"
  const PrevArrow = ({ onClick }: PrevArrowProps) => {
    const currentMonth = viewDate.startOf("month");
    const currentSystemMonth = dayjs().startOf("month");
    const isDisabled =
      mode === "date" && currentMonth.isSame(currentSystemMonth);

    return (
      <button
        type="button"
        onClick={isDisabled ? undefined : onClick}
        className={`ant-picker-header-prev-btn ${isDisabled ? "disabled" : ""}`}
        disabled={isDisabled}
      >
        <span className="ant-picker-prev-icon" />
      </button>
    );
  };

  const monthCellRender = (currentDate: Dayjs) => {
    const isCurrentMonth = currentDate.month() === dayjs().month() && 
                          currentDate.year() === dayjs().year();
    const isSelectedMonth = selectedDate && 
                          currentDate.month() === selectedDate.month() &&
                          currentDate.year() === selectedDate.year();

    const className = [
      isSelectedMonth ? 'selected-cell' : '',
      isCurrentMonth ? 'current-month-cell' : ''
    ].filter(Boolean).join(' ');

    const monthName = locale.lang.shortMonths?.[currentDate.month()] ||
                     currentDate.format("MMM");

    return (
      <div className={className}>
        {monthName}
      </div>
    );
  };

  const yearCellRender = (currentDate: Dayjs) => {
    const isCurrentYear = currentDate.year() === dayjs().year();
    const isSelectedYear = selectedDate && 
                         currentDate.year() === selectedDate.year();

    const className = [
      isSelectedYear ? 'selected-cell' : '',
      isCurrentYear ? 'current-year-cell' : ''
    ].filter(Boolean).join(' ');

    return (
      <div className={className}>
        {currentDate.format('YYYY')}
      </div>
    );
  };

  return (
    <div className="custom-datepicker-wrapper">
      <DatePicker
        locale={getLocale()}
        onChange={handleChange}
        onPanelChange={handlePanelChange}
        onOpenChange={handleOpenChange}
        mode={mode}
        showToday={false}
        value={selectedDate}
        allowClear
        format="D MMMM YYYY"
        getPopupContainer={(trigger) =>
          trigger.parentElement ? trigger.parentElement : document.body
        }
        superPrevIcon={null}
        superNextIcon={null}
        prevIcon={<PrevArrow />}
        disabledDate={disabledDate}
        cellRender={(current, { type, originNode }) => {
          if (type === "month") {
            return monthCellRender(dayjs(current));
          }
          if (type === "year") {
            return yearCellRender(dayjs(current));
          }
          return originNode;
        }}
      />
    </div>
  );
};

export default CustomDatePicker;
