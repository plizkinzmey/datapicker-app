import React from 'react';
import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import locale from 'antd/es/date-picker/locale/ru_RU';
import './styles.css';

interface CustomDatePickerProps {
  onChange?: (date: Dayjs | null, dateString: string | string[]) => void;
}

const CustomDatePicker = ({ onChange }: CustomDatePickerProps) => {
  const [mode, setMode] = React.useState<'date' | 'month' | 'year'>('date');
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);

  const handleChange = (date: Dayjs | null, dateString: string | string[]) => {
    setSelectedDate(date);
    if (onChange) {
      onChange(date, dateString);
    }
  };

  const handlePanelChange = (_: Dayjs | null, newMode: string) => {
    if (newMode === 'decade') {
      // Оставляем режим year при попытке переключения на decade
      setMode('year');
    } else {
      setMode(newMode as 'date' | 'month' | 'year');
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setMode('date');
    }
  };

  const customLocale = {
    ...locale,
    lang: {
      ...locale.lang,
      monthFormat: 'MMMM',
    },
  };

  return (
    <div className="custom-datepicker-wrapper">
      <DatePicker 
        locale={customLocale}
        onChange={handleChange}
        onPanelChange={handlePanelChange}
        onOpenChange={handleOpenChange}
        mode={mode}
        showToday={false}
        value={selectedDate}
        allowClear
        format="D MMM YYYY"
        getPopupContainer={trigger =>
          trigger.parentElement ? trigger.parentElement : document.body
        }
        superPrevIcon={null}
        superNextIcon={null}
      />
    </div>
  );
};

export default CustomDatePicker;
