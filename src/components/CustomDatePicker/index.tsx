import React from "react";
import { DatePicker } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/ru_RU";
import "dayjs/locale/ru";
import "./styles.css";

// Устанавливаем русскую локаль по умолчанию для всех операций с датами
dayjs.locale("ru");

// Обновленный интерфейс для пропсов компонента
interface CustomDatePickerProps {
  value?: string | null;
  onChange?: (value: string | null) => void;
}

// Интерфейс для пропсов кнопок навигации
interface NavigationArrowProps {
  onClick?: () => void;
  direction: 'prev' | 'next';
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ value, onChange }) => {
  // Состояние для отслеживания текущего режима отображения (дата/месяц/год)
  const [mode, setMode] = React.useState<"date" | "month" | "year">("date");
  // Состояние для отслеживания отображаемой даты в календаре
  const [viewDate, setViewDate] = React.useState<Dayjs>(dayjs());

  // Преобразование строкового значения в Dayjs
  const dayjsValue = value ? dayjs(value) : null;

  // Обработчик изменения выбранной даты
  const handleChange = (date: Dayjs | null) => {
    if (onChange) {
      onChange(date ? date.format("YYYY-MM-DD") : null);
    }
  };

  // Обработчик изменения режима отображения и предотвращение перехода в режим десятилетий
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

  // Сброс режима на выбор даты при закрытии календаря
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setMode("date");
    }
  };

  // Кастомизация локали для корректного отображения месяцев и годов
  const datePanelLocale = {
    ...locale,
    lang: {
      ...locale.lang,
      monthFormat: "MMMM",
      yearFormat: "YYYY",
    },
  };

  // Выбор подходящей локали в зависимости от режима отображения
  const getLocale = () => {
    if (mode === "date") {
      return datePanelLocale;
    }
    return locale;
  };

  // Функция определения заблокированных дат (все даты до текущего месяца)
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

  // Обновленный компонент для кнопок навигации
  const NavigationArrow = ({ onClick, direction }: NavigationArrowProps) => {
    const currentMonth = viewDate.startOf("month");
    const currentSystemMonth = dayjs().startOf("month");
    const isDisabled =
      mode === "date" && 
      direction === 'prev' && 
      currentMonth.isSame(currentSystemMonth);

    return (
      <div 
        role="button"
        onClick={isDisabled ? undefined : onClick}
        className={`ant-picker-${direction}-icon ${isDisabled ? "disabled" : ""}`}
        aria-disabled={isDisabled}
      />
    );
  };

  // Рендер ячейки месяца с поддержкой выделения текущего и выбранного месяца
  const monthCellRender = (currentDate: Dayjs) => {
    const isCurrentMonth =
      currentDate.month() === dayjs().month() &&
      currentDate.year() === dayjs().year();
    const isSelectedMonth =
      dayjsValue &&
      currentDate.month() === dayjsValue.month() &&
      currentDate.year() === dayjsValue.year();

    const className = [
      isSelectedMonth ? "selected-cell" : "",
      isCurrentMonth ? "current-month-cell" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const monthName =
      locale.lang.shortMonths?.[currentDate.month()] ||
      currentDate.format("MMM");

    return <div className={className}>{monthName}</div>;
  };

  // Рендер ячейки года с поддержкой выделения текущего и выбранного года
  const yearCellRender = (currentDate: Dayjs) => {
    const isCurrentYear = currentDate.year() === dayjs().year();
    const isSelectedYear =
      dayjsValue && currentDate.year() === dayjsValue.year();

    const className = [
      isSelectedYear ? "selected-cell" : "",
      isCurrentYear ? "current-year-cell" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return <div className={className}>{currentDate.format("YYYY")}</div>;
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
        value={dayjsValue}
        allowClear
        format="DD.MM.YYYY"
        getPopupContainer={(trigger) =>
          trigger.parentElement ? trigger.parentElement : document.body
        }
        superPrevIcon={null}
        superNextIcon={null}
        prevIcon={<NavigationArrow direction="prev" />}
        nextIcon={<NavigationArrow direction="next" />}
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
